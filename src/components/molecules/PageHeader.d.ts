import React from 'react';
interface PageHeaderProps {
    title: string;
    description?: string;
    actions?: {
        label: string;
        onClick: () => void;
        variant?: 'primary' | 'secondary' | 'danger' | 'outline';
        icon?: React.ReactNode;
        loading?: boolean;
    }[];
    breadcrumbs?: {
        label: string;
        href?: string;
    }[];
    className?: string;
}
export declare const PageHeader: React.FC<PageHeaderProps>;
export {};
