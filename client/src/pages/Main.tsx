import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ContactModal from '../components/ContactModal';
import TechStack from '../components/TechStack';
import ProjectList from './ProjectList';

const LandingPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate(); // 라우터 훅 사용

  const handleGoToProfile = () => {
    navigate('/profile'); // 프로필 페이지로 이동
  };

  return (
    <>
      <section className="min-h-[calc(100vh-4rem)] flex items-center pt-16 pb-8 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="order-2 md:order-1 text-center md:text-right px-4">
              <h1 className="text-xl font-bold mb-3">
                안녕하세요,<br />NestJS 기반 백엔드 개발자 손채연입니다.
              </h1>
              <p className="text-gray-600 text-sm mb-4">
                새로운 기술을 배우고 적용하는 것을 좋아하며,<br />
                사용자 경험을 중요시하는 개발자입니다.
              </p>
              <div className="flex justify-center md:justify-end space-x-3">
                <button
                  className="bg-pink-400 text-white px-4 py-1.5 !rounded-button hover:bg-gray-500 transition-colors text-xs"
                  onClick={() => setIsModalOpen(true)}
                >
                  <i className="fas fa-paper-plane mr-1.5"></i>연락하기
                </button>
                <button 
                  className="bg-white text-pink-500 border border-pink-300 px-4 py-1.5 !rounded-button hover:bg-gray-50 transition-colors text-xs" 
                  onClick={handleGoToProfile}
                >
                  <i className="fas fa-info-circle mr-1.5"></i>자세히 보기
                </button>
              </div>
            </div>
            <div className="relative order-1 md:order-2 mt-4 md:mt-0 flex justify-center">
              <img
                src="/profileImage.jpeg"
                alt="Profile Image"
                className="w-1/2 md:w-3/5"
              />
            </div>
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