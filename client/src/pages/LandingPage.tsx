import React, { useState } from 'react';
import ContactModal from '../components/ContactModal';
import TechStack from '../components/TechStack';
import ProjectList from './ProjectList';

const LandingPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="max-w-7xl mx-auto px-12 py-20">
        <div className="grid grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl font-bold mb-6">
              안녕하세요,<br />NestJS 기반 백엔드 개발자 손채연입니다.
            </h1>
            <p className="text-gray-600 text-lg mb-8">
              새로운 기술을 배우고 적용하는 것을 좋아하며,<br />
              사용자 경험을 중요시하는 개발자입니다.
            </p>
            <div className="flex space-x-4">
              <button
                className="bg-custom text-white px-8 py-3 !rounded-button hover:bg-indigo-600 transition-colors"
                onClick={() => setIsModalOpen(true)}
              >
                <i className="fas fa-paper-plane mr-2"></i>연락하기
              </button>
              <button className="bg-white text-custom border-2 border-custom px-8 py-3 !rounded-button hover:bg-gray-50 transition-colors">
                <i className="fas fa-info-circle mr-2"></i>자세히 보기
              </button>
            </div>
          </div>
          <div className="relative">
            <img
              src="client/src/public/profileImage.jpeg"
              alt="Profile Image"
              className="w-full"
            />
          </div>
        </div>
      </section>

      <TechStack />
      <ProjectList />

      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default LandingPage;