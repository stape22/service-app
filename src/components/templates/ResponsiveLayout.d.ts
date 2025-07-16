import React from 'react';
interface ResponsiveLayoutProps {
    children: React.ReactNode;
    className?: string;
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
    padding?: 'none' | 'sm' | 'md' | 'lg';
}
export declare const ResponsiveLayout: React.FC<ResponsiveLayoutProps>;
export {};
