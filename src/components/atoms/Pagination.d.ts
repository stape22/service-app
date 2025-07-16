import React from 'react';
interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    totalItems?: number;
    itemsPerPage?: number;
    showInfo?: boolean;
    className?: string;
}
export declare const Pagination: React.FC<PaginationProps>;
export {};
