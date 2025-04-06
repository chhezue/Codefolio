import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PageLayout from '../components/layout/PageLayout';

// API URL
const API_URL = 'http://localhost:3000'; // 실제 서버 URL로 변경

// 난이도 옵션
enum DifficultyLevel {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
}

const AlgorithmCreate: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    difficulty: DifficultyLevel.MEDIUM,
    language: '',
    tags: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // 태그를 쉼표로 분리하여 배열로 변환
      const tagsArray = formData.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag !== '');

      // API 요청 데이터 구성
      const requestData = {
        title: formData.title,
        content: formData.content,
        difficulty: formData.difficulty,
        language: formData.language,
        tags: tagsArray,
      };

      // API 호출
      await axios.post(`${API_URL}/algorithms`, requestData);
      
      // 성공 시 목록 페이지로 이동
      navigate('/algorithm');
    } catch (err) {
      console.error('알고리즘 등록 중 오류가 발생했습니다:', err);
      setError('알고리즘을 등록하는 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">알고리즘 문제 해결 기록하기</h1>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 rounded-lg text-red-500">
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="mb-6">
          <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
            제목 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-custom"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="content" className="block text-gray-700 font-medium mb-2">
            내용 <span className="text-red-500">*</span>
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows={10}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-custom"
            required
          />
          <p className="mt-1 text-sm text-gray-500">
            문제 해결 접근 방식, 알고리즘, 시간 복잡도 분석 등을 상세히 작성해주세요.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="difficulty" className="block text-gray-700 font-medium mb-2">
              난이도 <span className="text-red-500">*</span>
            </label>
            <select
              id="difficulty"
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-custom"
              required
            >
              <option value={DifficultyLevel.EASY}>쉬움</option>
              <option value={DifficultyLevel.MEDIUM}>중간</option>
              <option value={DifficultyLevel.HARD}>어려움</option>
            </select>
          </div>

          <div>
            <label htmlFor="language" className="block text-gray-700 font-medium mb-2">
              사용 언어 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="language"
              name="language"
              value={formData.language}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-custom"
              required
              placeholder="예: JavaScript, Python, Java"
            />
          </div>
        </div>

        <div className="mb-8">
          <label htmlFor="tags" className="block text-gray-700 font-medium mb-2">
            태그 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-custom"
            required
            placeholder="예: 배열, 해시테이블, 정렬 (쉼표로 구분)"
          />
          <p className="mt-1 text-sm text-gray-500">
            관련 알고리즘이나 자료구조를 쉼표(,)로 구분하여 입력하세요.
          </p>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => navigate('/algorithm')}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-md mr-4 hover:bg-gray-200 transition-colors"
          >
            취소
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-custom text-white rounded-md hover:bg-custom-dark transition-colors"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <i className="fas fa-spinner fa-spin mr-2"></i>등록 중...
              </>
            ) : (
              '등록하기'
            )}
          </button>
        </div>
      </form>
    </PageLayout>
  );
};

export default AlgorithmCreate; 