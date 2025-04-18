import TechStack from "../components/TechStack";
import PageLayout from "../components/layout/PageLayout";
import ContactModal from "../components/ContactModal";
import React, { useState } from "react";
import PinnedProjects from "components/project/PinnedProjects";

const Profile: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <PageLayout>
      {/* 프로필 섹션 */}
      <section className="mb-16 bg-white rounded-2xl shadow-sm p-8 hover:shadow-md transition-shadow duration-300">
        <div className="flex flex-col md:flex-row items-start gap-10">
          {/* 프로필 이미지 */}
          <div className="w-full md:w-1/4">
            <div className="relative group rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <img
                src="/profileImage.jpeg"
                alt="프로필 사진"
                className="w-full aspect-square object-cover"
              />
              <div className="absolute inset-0 bg-accent-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>

          {/* 텍스트 내용 */}
          <div className="w-full md:w-3/4 space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-primary-900 tracking-tight mb-1">
                손채연
              </h1>
              <p className="text-accent-600 font-medium text-base">
                NestJS 백엔드 개발자
              </p>
            </div>

            <div className="space-y-3 text-primary-700 leading-relaxed text-[15px]">
              <div className="flex items-start gap-3">
                <i className="fas fa-code text-accent-500 mt-1 w-4 text-sm"></i>
                <span>
                  새로운 기술을 배우고 적용하는 것을 좋아하는 개발자입니다.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <i className="fas fa-user-check text-accent-500 mt-1 w-4 text-sm"></i>
                <span>
                  사용자 경험을 최우선으로 생각하며, 클린 코드 작성을
                  지향합니다.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <i className="fas fa-users text-accent-500 mt-1 w-4 text-sm"></i>
                <span>팀 협업을 통한 시너지 창출에 관심이 많습니다.</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-accent-500 text-white text-sm font-medium rounded-lg hover:bg-accent-600 transition-colors duration-300"
              >
                <i className="fas fa-envelope text-sm"></i>
                <span>연락하기</span>
              </button>
              <a
                href="https://github.com/chhezue"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 border border-primary-200 text-primary-700 text-sm font-medium rounded-lg hover:bg-primary-50 hover:border-primary-300 transition-all duration-300"
              >
                <i className="fab fa-github text-sm"></i>
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 경력 및 학력 섹션 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <section className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-xl font-bold text-primary-900 mb-6">경력사항</h2>
          <div className="space-y-6">
            <div className="border-l-4 border-accent-500 pl-4">
              <h3 className="font-semibold text-sm">PMI</h3>
              <p className="text-primary-600">
                백엔드 개발자 인턴 | 2025.03 - 2025.08
              </p>
              <ul className="mt-2 text-primary-600 list-disc list-inside">
                <li>대규모 커머스 플랫폼 개발 및 유지보수</li>
                <li>신규 기능 설계 및 구현</li>
                <li>주니어 개발자 멘토링</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-xl font-bold text-primary-900 mb-6">
            학력 및 자격
          </h2>
          <div className="space-y-6">
            <div className="border-l-4 border-accent-500 pl-4">
              <h3 className="font-semibold text-sm">동덕여자대학교</h3>
              <p className="text-primary-600">경영학과 | 2021 - 2022</p>
              <p className="text-primary-600">컴퓨터학과 | 2023 - 2024</p>
              <p className="text-primary-600">학점: 3.7/4.5</p>
            </div>
            <div className="border-l-4 border-accent-500 pl-4">
              <h3 className="font-semibold text-sm">어학성적</h3>
              <ul className="mt-2 text-primary-600 list-disc list-inside">
                <li>TOEIC 0점 (2023.03)</li>
                <li>IELTS 0.0 (2022.11)</li>
              </ul>
            </div>
          </div>
        </section>
      </div>

      {/* 기술 스택 섹션 */}
      <TechStack />

      {/* 프로젝트 섹션 */}
      <PinnedProjects />

      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </PageLayout>
  );
};

export default Profile;
