import React from 'react';
interface DashboardLayoutProps {
    children: React.ReactNode;
    currentPage?: string;
    onPageChange?: (page: string) => void;
}
export declare const DashboardLayout: React.FC<DashboardLayoutProps>;
export {};
