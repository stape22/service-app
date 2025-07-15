import React from 'react';
// TODO: Replace with atomic/molecule/organism equivalents. See dev-log.md for rationale.
// import { Header } from '../../../Figma Design/components/Header';
// import { ChatPanel } from '../../../Figma Design/components/ChatPanel';

// TODO: Unify CurrentPage type after atomic migration
// For now, use 'any' to avoid type conflicts from Figma import
interface DashboardLayoutProps {
  children: React.ReactNode;
  currentPage: any;
  onPageChange: (page: any) => void;
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
  return (
    <div className="min-h-screen bg-gray-50">
      {/* <Header 
        onChatToggle={onChatToggle}
        currentPage={currentPage}
        onPageChange={onPageChange}
      /> */}
      <div className="flex">
        <div className={`flex-1 transition-all duration-300 ${isChatOpen ? 'mr-80' : ''}`}>
          {children}
        </div>
        {/* <ChatPanel isOpen={isChatOpen} onClose={onChatClose} /> */}
      </div>
    </div>
  );
}; 