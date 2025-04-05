import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Index from './pages';
import ProjectPost from './pages/ProjectPost';
import AlgorithmList from './pages/AlgorithmList';
import ProfileDetail from './pages/ProfileDetail';

const App: React.FC = () => {
  return (
    <Router>
      <div className="font-['Noto_Sans_KR'] bg-gray-50">
        <Header />
        <main className="pt-16">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/projects/:id" element={<ProjectPost />} />
            <Route path="/algorithm" element={<AlgorithmList />} />
            <Route path="/profile" element={<ProfileDetail />} />
          </Routes>
        </main>
        <Footer year={2024} copyrightText="김개발" />
      </div>
    </Router>
  );
};

export default App; 