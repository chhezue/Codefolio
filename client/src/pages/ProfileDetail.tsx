import React from 'react';
import TechStack from '../components/TechStack';
import ProjectList from "./ProjectList";
import PageLayout from '../components/layout/PageLayout';

const ProfileDetail: React.FC = () => {
  return (
    <PageLayout>
      {/* 프로필 섹션 */}
      <section className="mb-16 bg-white rounded-lg shadow-sm p-8">
        <div className="flex flex-col md:flex-row items-start gap-8">
          <div className="w-full md:w-1/4">
            <img 
              src="https://creatie.ai/ai/api/search-image?query=A professional headshot of a young Asian software developer in business casual attire, looking confident and friendly against a clean studio background. The image should be well-lit with natural lighting and have a modern, professional feel&width=400&height=400&orientation=squarish&flag=2af9250f-942c-4f57-93dc-e3334fc8649b&flag=388fc051-7e95-4431-aafb-48c8c7d972df&flag=f344068b-5ac0-45e6-88e7-bf9e68da25f4" 
              alt="프로필 사진" 
              className="w-full rounded-lg object-cover"
            />
          </div>
          <div className="w-full md:w-3/4">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">김개발</h1>
            <p className="text-xl text-custom mb-4">풀스택 개발자</p>
            <p className="text-gray-600 mb-6">
              새로운 기술을 배우고 적용하는 것을 좋아하는 개발자입니다. 사용자 경험을 최우선으로 생각하며,
              클린 코드 작성을 지향합니다. 팀 협업을 통한 시너지 창출에 관심이 많습니다.
            </p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <a href="mailto:developer@email.com" className="text-custom hover:text-custom-dark">
                  <i className="fas fa-envelope text-custom w-6 text-xl"></i>
                </a>
              </div>
              <div className="flex items-center">
                <a href="tel:010-1234-5678" className="text-custom hover:text-custom-dark">
                  <i className="fas fa-phone text-custom w-6 text-xl"></i>
                </a>
              </div>
              <div className="flex items-center">
                <a href="https://github.com/developer" target="_blank" rel="noopener noreferrer" className="text-custom hover:text-custom-dark">
                  <i className="fab fa-github text-custom w-6 text-xl"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 경력 및 학력 섹션 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <section className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">경력사항</h2>
          <div className="space-y-6">
            <div className="border-l-4 border-custom pl-4">
              <h3 className="font-semibold text-lg">ABC 테크</h3>
              <p className="text-gray-600">시니어 개발자 | 2020 - 현재</p>
              <ul className="mt-2 text-gray-600 list-disc list-inside">
                <li>대규모 커머스 플랫폼 개발 및 유지보수</li>
                <li>신규 기능 설계 및 구현</li>
                <li>주니어 개발자 멘토링</li>
              </ul>
            </div>
            <div className="border-l-4 border-custom pl-4">
              <h3 className="font-semibold text-lg">XYZ 솔루션즈</h3>
              <p className="text-gray-600">웹 개발자 | 2018 - 2020</p>
              <ul className="mt-2 text-gray-600 list-disc list-inside">
                <li>기업용 웹 애플리케이션 개발</li>
                <li>레거시 시스템 현대화</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">학력 및 자격</h2>
          <div className="space-y-6">
            <div className="border-l-4 border-custom pl-4">
              <h3 className="font-semibold text-lg">동덕여자대학교</h3>
              <p className="text-gray-600">경영학과 | 2021 - 2022</p>
              <p className="text-gray-600">컴퓨터학과 | 2023 - 2024</p>
              <p className="text-gray-600">학점: 3.7/4.5</p>
            </div>
            <div className="border-l-4 border-custom pl-4">
              <h3 className="font-semibold text-lg">어학성적</h3>
              <ul className="mt-2 text-gray-600 list-disc list-inside">
                <li>TOEIC 950점 (2023.03)</li>
                <li>IELTS 7.5 (2022.11)</li>
              </ul>
            </div>
          </div>
        </section>
      </div>

      {/* 기술 스택 섹션 - TechStack 컴포넌트 사용 */}
      <TechStack />

      {/* 프로젝트 섹션 */}
      <ProjectList />
    </PageLayout>
  );
};

export default ProfileDetail;