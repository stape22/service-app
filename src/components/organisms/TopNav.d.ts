import React from 'react';
export interface TopNavProps {
    userName?: string;
    onMenuToggle?: () => void;
    currentPage?: string;
    onPageChange?: (page: string) => void;
}
export declare const TopNav: React.FC<TopNavProps>;
