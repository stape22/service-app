import React from 'react';
import { TopNav } from '../organisms/TopNav';

interface DashboardLayoutProps {
  children: React.ReactNode;
  currentPage?: string;
  onPageChange?: (page: string) => void;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
}) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav 
        onMenuToggle={() => {}} // Placeholder for chat toggle
      />
      
      {/* Main content */}
      <main className="p-4 lg:p-6">
        {children}
      </main>
    </div>
  );
}; 