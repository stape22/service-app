import React from 'react';
interface DashboardLayoutProps {
    children: React.ReactNode;
    currentPage: any;
    onPageChange: (page: any) => void;
    isChatOpen: boolean;
    onChatToggle: () => void;
    onChatClose: () => void;
}
export declare const DashboardLayout: React.FC<DashboardLayoutProps>;
export {};
