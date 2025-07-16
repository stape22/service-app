import React from 'react';
export interface TopNavProps {
    userName?: string;
    currentPage?: string;
    onPageChange?: (page: string) => void;
    onChatToggle?: () => void;
    onMenuToggle?: () => void;
}
export declare const TopNav: React.FC<TopNavProps>;
