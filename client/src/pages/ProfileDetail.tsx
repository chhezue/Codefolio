import TechStack from '../components/TechStack';
import ProjectList from "./ProjectList";
import PageLayout from '../components/layout/PageLayout';
import ContactModal from "../components/ContactModal";
import React, { useState } from 'react';

const ProfileDetail: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <PageLayout>
      {/* 프로필 섹션 */}
      <section className="mb-16 bg-white rounded-lg shadow-sm p-8">
        <div className="flex flex-col md:flex-row items-start gap-8">
          <div className="w-full md:w-1/5">
            <img 
              src="/profileImage.jpeg"
              alt="프로필 사진" 
              className="w-full rounded-lg object-cover"
            />
          </div>
          <div className="w-full md:w-3/4">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">손채연</h1>
            <p className="text-base text-custom mb-4">NestJS 백엔드 개발자</p>
            <p className="text-gray-600 mb-6">
              새로운 기술을 배우고 적용하는 것을 좋아하는 개발자입니다.<br />
              사용자 경험을 최우선으로 생각하며, 클린 코드 작성을 지향합니다.<br />
              팀 협업을 통한 시너지 창출에 관심이 많습니다.<br />
            </p>
            <div className="flex items-center">
              <div className="flex items-center cursor-pointer" onClick={() => setIsModalOpen(true)}>
                <i className="fas fa-envelope text-pink-700 w-10 text-base hover:text-pink-800 transition-colors"></i>
              </div>
              <div className="flex items-center">
                <a
                    href="https://github.com/chhezue"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-700 hover:text-pink-800 transition-colors"
                >
                  <i className="fab fa-github w-10 text-base"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 경력 및 학력 섹션 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <section className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">경력사항</h2>
          <div className="space-y-6">
            <div className="border-l-4 border-custom pl-4">
              <h3 className="font-semibold text-sm">PMI</h3>
              <p className="text-gray-600">백엔드 개발자 인턴 | 2025.03 - 2025.08</p>
              <ul className="mt-2 text-gray-600 list-disc list-inside">
                <li>대규모 커머스 플랫폼 개발 및 유지보수</li>
                <li>신규 기능 설계 및 구현</li>
                <li>주니어 개발자 멘토링</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">학력 및 자격</h2>
          <div className="space-y-6">
            <div className="border-l-4 border-custom pl-4">
              <h3 className="font-semibold text-sm">동덕여자대학교</h3>
              <p className="text-gray-600">경영학과 | 2021 - 2022</p>
              <p className="text-gray-600">컴퓨터학과 | 2023 - 2024</p>
              <p className="text-gray-600">학점: 3.7/4.5</p>
            </div>
            <div className="border-l-4 border-custom pl-4">
              <h3 className="font-semibold text-sm">어학성적</h3>
              <ul className="mt-2 text-gray-600 list-disc list-inside">
                <li>TOEIC 0점 (2023.03)</li>
                <li>IELTS 0.0 (2022.11)</li>
              </ul>
            </div>
          </div>
        </section>
      </div>

      {/* 기술 스택 섹션 - TechStack 컴포넌트 사용 */}
      <TechStack />

      {/* 프로젝트 섹션 */}
      <ProjectList />
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </PageLayout>
  );
};

export default ProfileDetail;