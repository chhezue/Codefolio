import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Main from './pages/Main';
import ProjectPost from './pages/ProjectPost';
import AlgorithmList from './pages/AlgorithmList';
import AlgorithmCreate from './pages/AlgorithmCreate';
import ProfileDetail from './pages/ProfileDetail';
import AlgorithmPost from 'pages/AlgorithmPost';

const App: React.FC = () => {
  return (
    <Router>
      <div className="font-['Noto_Sans_KR'] bg-gray-50">
        <Header />
        <main className="pt-16">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/projects/:id" element={<ProjectPost />} />
            <Route path="/algorithm" element={<AlgorithmList />} />
            <Route path="/algorithm/:id" element={<AlgorithmPost />} />
            <Route path="/algorithm/create" element={<AlgorithmCreate />} />
            <Route path="/profile" element={<ProfileDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App; 