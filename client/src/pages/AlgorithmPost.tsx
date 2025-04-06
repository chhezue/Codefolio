import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import PageLayout from '../components/layout/PageLayout';

// API URL
const API_URL = 'http://localhost:3000'; // 실제 서버 URL로 변경

// 난이도 매핑
enum DifficultyLevel {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
}

const difficultyClasses = {
  [DifficultyLevel.EASY]: 'bg-green-100 text-green-800',
  [DifficultyLevel.MEDIUM]: 'bg-yellow-100 text-yellow-800',
  [DifficultyLevel.HARD]: 'bg-red-100 text-red-800',
};

const difficultyLabels = {
  [DifficultyLevel.EASY]: '쉬움',
  [DifficultyLevel.MEDIUM]: '중간',
  [DifficultyLevel.HARD]: '어려움',
};

// 알고리즘 포스트 인터페이스
interface AlgorithmPost {
  id: number;
  title: string;
  content: string;
  difficulty: DifficultyLevel;
  language: string;
  tags: string[];
  created_at: string;
  updated_at: string;
}

const AlgorithmPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<AlgorithmPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${API_URL}/algorithms/${id}`);
        setPost(response.data);
      } catch (err) {
        console.error('알고리즘 불러오기 실패:', err);
        setError('알고리즘 게시글을 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  if (loading) {
    return (
      <PageLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-custom"></div>
        </div>
      </PageLayout>
    );
  }

  if (error || !post) {
    return (
      <PageLayout>
        <div className="bg-red-50 rounded-lg p-6 text-center">
          <h2 className="text-xl text-red-700 mb-4">
            {error || '게시글을 찾을 수 없습니다.'}
          </h2>
          <button
            onClick={() => navigate('/algorithm')}
            className="px-4 py-2 bg-custom text-white rounded-md hover:bg-custom-dark transition-colors"
          >
            목록으로 돌아가기
          </button>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      {/* 헤더 섹션 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{post.title}</h1>
        <div className="flex flex-wrap items-center text-sm text-gray-600 mb-4">
          <span className="mr-4">
            <i className="far fa-calendar-alt mr-1"></i> 
            {formatDate(post.created_at)}
          </span>
          {post.updated_at !== post.created_at && (
            <span>
              <i className="far fa-edit mr-1"></i> 
              {formatDate(post.updated_at)} 수정됨
            </span>
          )}
        </div>
        <div className="flex flex-wrap gap-2 mb-6">
          <span 
            className={`px-3 py-1 text-sm font-medium rounded-full ${difficultyClasses[post.difficulty]}`}
          >
            {difficultyLabels[post.difficulty]}
          </span>
          <span className="px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full">
            {post.language}
          </span>
        </div>
      </div>

      {/* 본문 섹션 */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="prose max-w-none">
          {post.content.split('\n').map((paragraph, idx) => (
            <p key={idx} className="mb-4">{paragraph}</p>
          ))}
        </div>
      </div>

      {/* 태그 섹션 */}
      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold mb-4">관련 태그</h3>
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag, idx) => (
            <span 
              key={idx} 
              className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* 작업 버튼 섹션 */}
      <div className="flex justify-between">
        <button
          onClick={() => navigate('/algorithm')}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
        >
          <i className="fas fa-arrow-left mr-2"></i>
          목록으로
        </button>
        <div className="space-x-2">
          <button
            onClick={() => navigate(`/algorithm/edit/${id}`)}
            className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors"
          >
            <i className="fas fa-edit mr-2"></i>
            수정하기
          </button>
          <button
            onClick={() => {
              if (window.confirm('정말로 이 게시글을 삭제하시겠습니까?')) {
                // 삭제 로직 구현
                axios.delete(`${API_URL}/algorithms/${id}`)
                  .then(() => {
                    navigate('/algorithm');
                  })
                  .catch(err => {
                    console.error('삭제 실패:', err);
                    alert('게시글 삭제 중 오류가 발생했습니다.');
                  });
              }
            }}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
          >
            <i className="fas fa-trash-alt mr-2"></i>
            삭제하기
          </button>
        </div>
      </div>
    </PageLayout>
  );
};

export default AlgorithmPost;
