import React from 'react';
export interface TopNavProps {
    userName?: string;
    onMenuToggle?: () => void;
}
export declare const TopNav: React.FC<TopNavProps>;
