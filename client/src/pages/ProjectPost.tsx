import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import ProjectFeatures from '../components/project/ProjectFeatures';

// API URL
const API_URL = 'http://localhost:3001'; // 실제 서버 URL로 변경

// 프로젝트 상세 타입 정의
interface ProjectDetails {
  id?: string;
  projectTitle: string;
  projectDescription: string;
  projectPeriod: string;
  role: string;
  technologies: string[];
  features?: Feature[];
  challenges?: Challenge[];
  screenshots?: Screenshot[];
  docLinks?: DocLink[];
  projectStats?: ProjectStats;
}

// 도전과제 타입
interface Challenge {
  number: number;
  title: string;
  description: string;
}

// 스크린샷 타입
interface Screenshot {
  imageUrl: string;
  imageAlt: string;
}

// 문서 링크 타입
interface DocLink {
  linkUrl: string;
  iconClass: string;
  title: string;
  description: string;
}

// 프로젝트 통계 타입
interface ProjectStats {
  stars: number;
  forks: number;
  lastUpdated: string;
}

// 기능 타입 (ProjectFeatures 컴포넌트에서 사용)
interface Feature {
  imageUrl: string;
  imageAlt: string;
  title: string;
  description: string;
}

const ProjectPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [projectData, setProjectData] = useState<ProjectDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 기본 기능 데이터 (API에서 데이터를 가져오지 못할 경우 대비)
  const defaultFeatures: Feature[] = [
    {
      imageUrl: 'https://creatie.ai/ai/api/search-image?query=AI generating image from text prompt, modern interface&width=800&height=600',
      imageAlt: 'AI 이미지 생성',
      title: 'AI 이미지 생성',
      description: '텍스트 프롬프트를 입력하면 AI가 고품질 이미지를 생성합니다.'
    },
    {
      imageUrl: 'https://creatie.ai/ai/api/search-image?query=Image customization settings with sliders and options, clean UI&width=800&height=600',
      imageAlt: '고급 커스터마이징',
      title: '고급 커스터마이징',
      description: '다양한 스타일, 해상도, 비율 등을 조절하여 원하는 이미지를 생성할 수 있습니다.'
    }
  ];

  // 프로젝트 데이터 가져오기
  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/projects/${id}`);
        setProjectData(response.data);
        setError(null);
      } catch (err) {
        console.error('프로젝트 데이터를 가져오는 중 오류가 발생했습니다:', err);
        setError('프로젝트 데이터를 불러오는 중 오류가 발생했습니다.');
        
        // 오류 발생 시 기본 데이터 설정
        setProjectData({
          projectTitle: 'AI 기반 이미지 생성 플랫폼',
          projectDescription: '사용자의 텍스트 입력을 기반으로 고품질 이미지를 생성하는 웹 서비스',
          projectPeriod: '2023.09 - 2024.01',
          role: '풀스택 개발 (개인 프로젝트)',
          technologies: ['React', 'Node.js', 'MongoDB', 'AWS'],
          features: defaultFeatures,
          challenges: [
            {
              number: 1,
              title: 'AI 모델 통합',
              description: '다양한 AI 모델을 통합하여 안정적인 이미지 생성 파이프라인 구축'
            },
            {
              number: 2,
              title: '실시간 처리 최적화',
              description: '대용량 이미지 생성 요청을 효율적으로 처리하기 위한 큐 시스템 구현'
            },
            {
              number: 3,
              title: '비용 효율화',
              description: '클라우드 자원 사용 최적화를 통한 운영 비용 절감'
            }
          ],
          screenshots: [
            {
              imageUrl: 'https://creatie.ai/ai/api/search-image?query=AI image generation dashboard with text input and preview areas. Modern UI with light theme.&width=800&height=600',
              imageAlt: '메인 대시보드'
            },
            {
              imageUrl: 'https://creatie.ai/ai/api/search-image?query=Image generation settings panel with various sliders and options. Clean UI design.&width=800&height=600',
              imageAlt: '이미지 설정 패널'
            },
            {
              imageUrl: 'https://creatie.ai/ai/api/search-image?query=Gallery view of generated images with sorting and filtering options. Minimalist design.&width=800&height=600',
              imageAlt: '갤러리 뷰'
            }
          ],
          docLinks: [
            {
              linkUrl: '#',
              iconClass: 'fas fa-book',
              title: 'API 문서',
              description: 'REST API 엔드포인트 및 사용 방법'
            },
            {
              linkUrl: '#',
              iconClass: 'fas fa-download',
              title: '설치 가이드',
              description: '로컬 환경 설정 및 실행 방법'
            }
          ],
          projectStats: {
            stars: 142,
            forks: 37,
            lastUpdated: '2024.03.15'
          }
        });
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProjectData();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <i className="fas fa-spinner fa-spin text-custom text-4xl mb-4"></i>
          <p className="text-gray-600">프로젝트 데이터를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error || !projectData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center bg-red-50 p-8 rounded-lg max-w-2xl">
          <i className="fas fa-exclamation-circle text-red-500 text-4xl mb-4"></i>
          <p className="text-red-500 mb-4">{error || '프로젝트를 찾을 수 없습니다.'}</p>
          <Link 
            to="/" 
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-600 transition-colors"
          >
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-custom to-blue-600 bg-clip-text text-transparent">
          {projectData.projectTitle}
        </h1>
        <p className="text-xl text-gray-600 border-l-4 border-custom pl-4 mt-6">
          {projectData.projectDescription}
        </p>
      </div>

      {/* 프로젝트 개요 섹션 */}
      <section className="bg-white rounded-lg shadow-sm p-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">프로젝트 개요</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="border-l-4 border-custom pl-4">
            <h3 className="text-lg font-medium text-gray-900 mb-2">개발 기간</h3>
            <p className="text-gray-600">{projectData.projectPeriod}</p>
          </div>
          <div className="border-l-4 border-custom pl-4">
            <h3 className="text-lg font-medium text-gray-900 mb-2">역할</h3>
            <p className="text-gray-600">{projectData.role}</p>
          </div>
          <div className="border-l-4 border-custom pl-4">
            <h3 className="text-lg font-medium text-gray-900 mb-2">주요 기술</h3>
            <div className="flex flex-wrap gap-2">
              {projectData.technologies.map((tech, index) => (
                <span key={index} className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 주요 기능 섹션 - ProjectFeatures 컴포넌트 사용 */}
      {projectData.features && <ProjectFeatures features={projectData.features} />}

      {/* 기술적 도전과 해결과정 섹션 */}
      {projectData.challenges && projectData.challenges.length > 0 && (
        <section className="bg-white rounded-lg shadow-sm p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">기술적 도전과 해결과정</h2>
          <div className="space-y-6">
            {projectData.challenges.map((challenge, index) => (
              <div key={index}>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  <span className="bg-custom text-white rounded-full w-6 h-6 inline-flex items-center justify-center mr-2">
                    {challenge.number}
                  </span>
                  {challenge.title}
                </h3>
                <p className="text-gray-600 ml-8">{challenge.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 실제 구현 화면 섹션 */}
      {projectData.screenshots && projectData.screenshots.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">실제 구현 화면</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {projectData.screenshots.map((screenshot, index) => (
              <img 
                key={index}
                src={screenshot.imageUrl} 
                alt={screenshot.imageAlt} 
                className="rounded-lg shadow-sm" 
              />
            ))}
          </div>
        </section>
      )}

      {/* 프로젝트 문서 섹션 */}
      {projectData.docLinks && projectData.docLinks.length > 0 && projectData.projectStats && (
        <section className="bg-white rounded-lg shadow-sm p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">프로젝트 문서</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projectData.docLinks.map((doc, index) => (
              <a 
                key={index}
                href={doc.linkUrl} 
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-custom transition-colors"
              >
                <i className={`${doc.iconClass} text-2xl text-gray-700 mr-4`}></i>
                <div>
                  <h3 className="font-medium text-gray-900">{doc.title}</h3>
                  <p className="text-sm text-gray-600">{doc.description}</p>
                </div>
              </a>
            ))}
            <div className="flex items-center p-4 border border-gray-200 rounded-lg">
              <i className="fas fa-info-circle text-2xl text-gray-700 mr-4"></i>
              <div>
                <h3 className="font-medium text-gray-900">프로젝트 통계</h3>
                <div className="space-y-1 mt-1">
                  <div className="flex justify-between mb-2">
                    <p className="text-sm text-gray-600"><i className="fas fa-star mr-1"></i>Stars: {projectData.projectStats.stars}</p>
                    <p className="text-sm text-gray-600"><i className="fas fa-code-branch mr-1"></i>Forks: {projectData.projectStats.forks}</p>
                  </div>
                  <p className="text-sm text-gray-600"><i className="fas fa-history mr-1"></i>Last updated: {projectData.projectStats.lastUpdated}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 네비게이션 버튼 */}
      <div className="flex justify-between items-center">
        <Link 
          to="/" 
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 !rounded-button"
        >
          <i className="fas fa-arrow-left mr-2"></i>
          이전 페이지
        </Link>
        <div className="flex gap-4">
          <Link 
            to={`/projects/${Number(id || 0) + 1}`} 
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-custom hover:bg-custom/90 !rounded-button"
          >
            다음 프로젝트
            <i className="fas fa-arrow-right ml-2"></i>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default ProjectPost;