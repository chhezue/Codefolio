import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PageLayout from '../components/layout/PageLayout';

// API URL
const API_URL = 'http://localhost:3000';

const ProjectCreate: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // 프로젝트 기본 정보
  const [basicInfo, setBasicInfo] = useState({
    title: '',
    summary: '',
    githubUrl: '',
    period: '',
    role: '',
  });

  // 기술 스택
  const [technology, setTechnology] = useState('');
  const [technologies, setTechnologies] = useState<string[]>([]);

  // 기능 목록
  const [features, setFeatures] = useState<{
    title: string;
    description: string;
    imageUrl: string;
    imageAlt: string;
  }[]>([
    { title: '', description: '', imageUrl: '', imageAlt: '' }
  ]);

  // 도전 과제 목록
  const [challenges, setChallenges] = useState<{
    number: number;
    title: string;
    description: string;
  }[]>([
    { number: 1, title: '', description: '' }
  ]);

  // 기본 정보 입력 핸들러
  const handleBasicInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBasicInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 기술 스택 추가
  const handleAddTechnology = () => {
    if (technology.trim() !== '' && !technologies.includes(technology.trim())) {
      setTechnologies(prev => [...prev, technology.trim()]);
      setTechnology('');
    }
  };

  // 기술 스택 제거
  const handleRemoveTechnology = (tech: string) => {
    setTechnologies(prev => prev.filter(item => item !== tech));
  };

  // 기능 추가
  const handleAddFeature = () => {
    setFeatures(prev => [...prev, { title: '', description: '', imageUrl: '', imageAlt: '' }]);
  };

  // 기능 입력 핸들러
  const handleFeatureChange = (index: number, field: string, value: string) => {
    setFeatures(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  // 기능 제거
  const handleRemoveFeature = (index: number) => {
    if (features.length > 1) {
      setFeatures(prev => prev.filter((_, i) => i !== index));
    }
  };

  // 도전 과제 추가
  const handleAddChallenge = () => {
    setChallenges(prev => [...prev, { 
      number: prev.length + 1, 
      title: '', 
      description: '' 
    }]);
  };

  // 도전 과제 입력 핸들러
  const handleChallengeChange = (index: number, field: string, value: string) => {
    setChallenges(prev => {
      const updated = [...prev];
      updated[index] = { 
        ...updated[index], 
        [field]: field === 'number' ? parseInt(value) : value 
      };
      return updated;
    });
  };

  // 도전 과제 제거
  const handleRemoveChallenge = (index: number) => {
    if (challenges.length > 1) {
      const newChallenges = challenges.filter((_, i) => i !== index);
      // 번호 재정렬
      const renumbered = newChallenges.map((challenge, i) => ({
        ...challenge,
        number: i + 1
      }));
      setChallenges(renumbered);
    }
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // 유효성 검사
      if (basicInfo.title.trim() === '') {
        throw new Error('프로젝트 제목은 필수 항목입니다.');
      }

      if (basicInfo.summary.trim() === '') {
        throw new Error('프로젝트 요약은 필수 항목입니다.');
      }

      if (basicInfo.githubUrl.trim() === '') {
        throw new Error('GitHub URL은 필수 항목입니다.');
      }

      if (technologies.length === 0) {
        throw new Error('최소한 하나 이상의 기술 스택을 입력해주세요.');
      }

      // 필터링: 빈 항목 제거
      const validFeatures = features.filter(
        item => item.imageUrl.trim() !== '' && item.imageAlt.trim() !== ''
      );

      const validChallenges = challenges.filter(
        item => item.title.trim() !== '' && item.description.trim() !== ''
      );

      if (validFeatures.length === 0) {
        throw new Error('최소한 하나 이상의 기능을 입력해주세요.');
      }

      if (validChallenges.length === 0) {
        throw new Error('최소한 하나 이상의 도전 과제를 입력해주세요.');
      }

      // API 요청 데이터 구성
      const requestData = {
        title: basicInfo.title,
        summary: basicInfo.summary,
        githubUrl: basicInfo.githubUrl,
        period: basicInfo.period,
        role: basicInfo.role,
        technologies,
        features: validFeatures,
        challenges: validChallenges,
      };

      // API 호출
      await axios.post(`${API_URL}/projects`, requestData);
      
      // 성공 시 목록 페이지로 이동
      navigate('/projects');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        console.error('프로젝트 등록 중 오류가 발생했습니다:', err);
        setError('프로젝트를 등록하는 중 오류가 발생했습니다. 다시 시도해주세요.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // 엔터 키로 기술 스택 추가
  const handleTechnologyKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTechnology();
    }
  };

  return (
    <PageLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">프로젝트 등록하기</h1>
        <p className="text-gray-600">진행했던 프로젝트에 대한 상세 정보를 입력해주세요.</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 rounded-lg text-red-500">
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6 mb-8">
        {/* 기본 정보 섹션 */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b">기본 정보</h2>
          
          <div className="mb-6">
            <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
              프로젝트 제목 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={basicInfo.title}
              onChange={handleBasicInfoChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-custom"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="summary" className="block text-gray-700 font-medium mb-2">
              프로젝트 요약 <span className="text-red-500">*</span>
            </label>
            <textarea
              id="summary"
              name="summary"
              value={basicInfo.summary}
              onChange={handleBasicInfoChange}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-custom"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="githubUrl" className="block text-gray-700 font-medium mb-2">
              GitHub URL <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              id="githubUrl"
              name="githubUrl"
              value={basicInfo.githubUrl}
              onChange={handleBasicInfoChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-custom"
              placeholder="https://github.com/username/repository"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="mb-6">
              <label htmlFor="period" className="block text-gray-700 font-medium mb-2">
                개발 기간 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="period"
                name="period"
                value={basicInfo.period}
                onChange={handleBasicInfoChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-custom"
                placeholder="2023.01 - 2023.05"
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="role" className="block text-gray-700 font-medium mb-2">
                역할 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="role"
                name="role"
                value={basicInfo.role}
                onChange={handleBasicInfoChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-custom"
                placeholder="풀스택 개발자, 프론트엔드 개발자 등"
                required
              />
            </div>
          </div>
        </section>

        {/* 기술 스택 섹션 */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b">기술 스택</h2>
          
          <div className="mb-4">
            <div className="flex">
              <input
                type="text"
                value={technology}
                onChange={(e) => setTechnology(e.target.value)}
                onKeyDown={handleTechnologyKeyDown}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-custom"
                placeholder="사용한 기술 입력 (예: React, TypeScript, Node.js)"
              />
              <button
                type="button"
                onClick={handleAddTechnology}
                className="px-4 py-2 bg-custom text-white rounded-r-md hover:bg-custom-dark transition-colors"
              >
                추가
              </button>
            </div>
            <p className="mt-1 text-sm text-gray-500">
              Enter 키를 눌러 기술을 추가할 수 있습니다.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mt-2">
            {technologies.map((tech, index) => (
              <div 
                key={index} 
                className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full"
              >
                <span className="text-sm text-gray-700">{tech}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveTechnology(tech)}
                  className="text-gray-500 hover:text-red-500"
                >
                  <i className="fas fa-times-circle"></i>
                </button>
              </div>
            ))}
            {technologies.length === 0 && (
              <p className="text-sm text-gray-500 italic">기술 스택을 추가해주세요.</p>
            )}
          </div>
        </section>

        {/* 주요 기능 섹션 */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4 pb-2 border-b">
            <h2 className="text-xl font-semibold text-gray-900">주요 기능</h2>
            <button
              type="button"
              onClick={handleAddFeature}
              className="text-sm font-medium text-custom hover:text-custom-dark"
            >
              + 기능 추가
            </button>
          </div>

          {features.map((feature, index) => (
            <div key={index} className="mb-6 p-4 bg-gray-50 rounded-lg relative">
              {features.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveFeature(index)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
                >
                  <i className="fas fa-trash-alt"></i>
                </button>
              )}

              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  기능 제목
                </label>
                <input
                  type="text"
                  value={feature.title}
                  onChange={(e) => handleFeatureChange(index, 'title', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-custom"
                  placeholder="기능 제목"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  기능 설명
                </label>
                <textarea
                  value={feature.description}
                  onChange={(e) => handleFeatureChange(index, 'description', e.target.value)}
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-custom"
                  placeholder="기능에 대한 자세한 설명"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    이미지 URL <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="url"
                    value={feature.imageUrl}
                    onChange={(e) => handleFeatureChange(index, 'imageUrl', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-custom"
                    placeholder="https://example.com/image.jpg"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    이미지 설명 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={feature.imageAlt}
                    onChange={(e) => handleFeatureChange(index, 'imageAlt', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-custom"
                    placeholder="이미지에 대한 간단한 설명"
                    required
                  />
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* 도전 과제 섹션 */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4 pb-2 border-b">
            <h2 className="text-xl font-semibold text-gray-900">기술적 도전과 해결과정</h2>
            <button
              type="button"
              onClick={handleAddChallenge}
              className="text-sm font-medium text-custom hover:text-custom-dark"
            >
              + 도전 과제 추가
            </button>
          </div>

          {challenges.map((challenge, index) => (
            <div key={index} className="mb-6 p-4 bg-gray-50 rounded-lg relative">
              {challenges.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveChallenge(index)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
                >
                  <i className="fas fa-trash-alt"></i>
                </button>
              )}

              <div className="mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-12">
                    <span className="flex items-center justify-center h-8 w-8 rounded-full bg-custom text-white font-medium">
                      {challenge.number}
                    </span>
                  </div>
                  <input
                    type="text"
                    value={challenge.title}
                    onChange={(e) => handleChallengeChange(index, 'title', e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-custom"
                    placeholder="도전 과제 제목"
                    required
                  />
                </div>
              </div>

              <div className="pl-12">
                <textarea
                  value={challenge.description}
                  onChange={(e) => handleChallengeChange(index, 'description', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-custom"
                  placeholder="도전 과제에 대한 자세한 설명 및 해결 방법"
                  required
                />
              </div>
            </div>
          ))}
        </section>

        {/* 제출 버튼 */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => navigate('/projects')}
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

export default ProjectCreate; 