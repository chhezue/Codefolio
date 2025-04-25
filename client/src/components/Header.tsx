import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Login from "./Login";

const Header: React.FC = () => {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    // 로컬 스토리지에서 토큰 확인하여 로그인 상태 결정
    const token = localStorage.getItem("admin_token");
    setIsLoggedIn(!!token);
  }, []);

  const menuItems = [
    { to: "/profile", label: "Profile" },
    { to: "/projects", label: "Projects" },
  ];

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setShowLoginModal(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    setIsLoggedIn(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src="/favicon.png" alt="logo" className="w-8 h-8" />
            <span className="text-lg md:text-xl font-semibold text-slate-800 tracking-tight">
              Codefolio
            </span>
          </Link>

          {/* Menu and Login Button */}
          <div className="flex items-center space-x-6 text-sm md:text-base">
            {menuItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`relative text-slate-600 hover:text-indigo-600 transition-colors duration-200 ${
                  location.pathname === item.to
                    ? "font-semibold text-indigo-600"
                    : ""
                }`}
              >
                {item.label}
                {location.pathname === item.to && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-indigo-500 rounded-full"></span>
                )}
              </Link>
            ))}

            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="px-4 py-1.5 border border-red-300 text-red-600 rounded-md hover:bg-red-50 transition-colors text-sm font-medium"
              >
                로그아웃
              </button>
            ) : (
              <button
                onClick={() => setShowLoginModal(true)}
                className="px-4 py-1.5 border border-indigo-300 text-indigo-600 rounded-md hover:bg-indigo-50 transition-colors text-sm font-medium"
              >
                관리자 로그인
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">
                관리자 로그인
              </h3>
              <button
                onClick={() => setShowLoginModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <Login onSuccess={handleLoginSuccess} />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
