import React, { useState } from 'react';
import { TopNav } from '../organisms/TopNav';
import { Sidebar } from '../organisms/Sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onPageChange: (page: string) => void;
  isChatOpen: boolean;
  onChatToggle: () => void;
  onChatClose: () => void;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  currentPage,
  onPageChange,
  isChatOpen,
  onChatToggle,
  onChatClose,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav 
        onChatToggle={onChatToggle}
        currentPage={currentPage}
        onPageChange={onPageChange}
        onMenuToggle={toggleSidebar}
      />
      <div className="flex">
        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        
        {/* Sidebar */}
        <div className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <Sidebar 
            currentPage={currentPage} 
            onPageChange={(page: string) => {
              onPageChange(page);
              setSidebarOpen(false); // Close sidebar on mobile after navigation
            }} 
          />
        </div>

        {/* Main content */}
        <div className={`flex-1 transition-all duration-300 ${isChatOpen ? 'mr-80' : ''}`}>
          <div className="lg:ml-0">
            {children}
          </div>
        </div>

        {/* ChatPanel will be implemented later */}
        {isChatOpen && (
          <div className="fixed right-0 top-0 h-full w-80 bg-white border-l border-gray-200 shadow-lg z-30">
            <div className="p-4">
              <button 
                onClick={onChatClose}
                className="text-gray-500 hover:text-gray-700"
              >
                Close Chat
              </button>
              <div className="mt-4">
                <p className="text-gray-600">Chat functionality coming soon...</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}; 