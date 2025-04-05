import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-12">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold text-black">손채연</Link>
          <div className="flex space-x-8">
            <Link to="/profile" className="text-gray-600 hover:text-black">프로필</Link>
            <Link to="/projects" className="text-gray-600 hover:text-black">프로젝트</Link>
            <Link to="/algorithm" className="text-gray-600 hover:text-black">알고리즘 문제 풀이</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header; 