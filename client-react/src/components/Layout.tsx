import React, { ReactNode } from 'react';
import Header from './Header';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="font-['Noto_Sans_KR'] bg-gray-50 min-h-screen">
      <Header />
      <main className="pt-16">
        {children}
      </main>
    </div>
  );
};

export default Layout; 