import React from 'react';
interface LoadingStateProps {
    isLoading: boolean;
    children: React.ReactNode;
    message?: string;
    skeleton?: React.ReactNode;
    className?: string;
}
export declare const LoadingState: React.FC<LoadingStateProps>;
export declare const SkeletonText: React.FC<{
    lines?: number;
    className?: string;
}>;
export declare const SkeletonCard: React.FC<{
    className?: string;
}>;
export declare const SkeletonTable: React.FC<{
    rows?: number;
    columns?: number;
    className?: string;
}>;
export {};
