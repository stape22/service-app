import React from 'react';
export interface SidebarProps {
    className?: string;
    currentPage?: string;
    onPageChange?: (page: string) => void;
    onClose?: () => void;
}
export declare const Sidebar: React.FC<SidebarProps>;
