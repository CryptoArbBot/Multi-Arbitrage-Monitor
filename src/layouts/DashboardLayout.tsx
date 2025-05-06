import React, { ReactNode } from 'react';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Navbar />
      <Sidebar />
      
      <div className="lg:ml-64 pt-16 px-4 py-6 lg:px-6">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;