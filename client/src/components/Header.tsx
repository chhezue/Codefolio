import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const location = useLocation();

  const menuItems = [
    { to: '/profile', label: 'Profile' },
    { to: '/projects', label: 'Projects' },
    { to: '/algorithm', label: 'Algorithms' },
  ];

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

            {/* Menu */}
            <div className="flex space-x-6 text-sm md:text-base">
              {menuItems.map((item) => (
                  <Link
                      key={item.to}
                      to={item.to}
                      className={`relative text-slate-600 hover:text-indigo-600 transition-colors duration-200 ${
                          location.pathname === item.to ? 'font-semibold text-indigo-600' : ''
                      }`}
                  >
                    {item.label}
                    {location.pathname === item.to && (
                        <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-indigo-500 rounded-full"></span>
                    )}
                  </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
  );
};

export default Header;