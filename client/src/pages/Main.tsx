import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ContactModal from '../components/ContactModal';
import TechStack from '../components/TechStack';
import ProjectList from './ProjectList';
import { motion } from 'framer-motion';

const LandingPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleGoToProfile = () => {
    navigate('/profile');
  };

  return (
      <>
        <section className="min-h-[calc(100vh-4rem)] flex items-center pt-20 pb-12 px-4 bg-gradient-to-br from-slate-100 to-slate-200 text-slate-800">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-8">
            {/* 텍스트 영역 */}
            <motion.div
                className="text-center md:text-left px-4"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
              <h1 className="text-xl md:text-4xl font-bold mb-4 leading-snug whitespace-nowrap">
                반갑습니다, <br />
                <span className="text-indigo-600">NestJS 백엔드 개발자</span> 손채연입니다.
              </h1>
              <p className="text-slate-600 text-base mb-6 leading-relaxed">
                기술을 배우는 데 열정적이며, <br />
                사용자 경험 중심의 서비스를 고민합니다.
              </p>
              <div className="flex justify-center md:justify-start gap-4">
                <button
                    className="bg-indigo-500 text-white px-5 py-2 rounded-md hover:bg-indigo-600 transition text-sm"
                    onClick={() => setIsModalOpen(true)}
                >
                  <i className="fas fa-paper-plane mr-2"></i>연락하기
                </button>
                <button
                    className="border border-slate-400 text-slate-700 px-5 py-2 rounded-md hover:bg-slate-300 transition text-sm"
                    onClick={handleGoToProfile}
                >
                  <i className="fas fa-info-circle mr-2"></i>자세히 보기
                </button>
              </div>
            </motion.div>

            {/* 이미지 영역 */}
            <motion.div
                className="flex justify-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
            >
              <img
                  src="/profileImage.jpeg"
                  alt="Profile"
                  className="w-48 md:w-56 rounded-lg shadow-xl object-cover"
              />
            </motion.div>
          </div>
        </section>

        <TechStack />
        <ProjectList />
        <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </>
  );
};

export default LandingPage;