import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { Button } from './Button';
export const Pagination = ({ currentPage, totalPages, onPageChange, totalItems, itemsPerPage, showInfo = true, className = '' }) => {
    const getVisiblePages = () => {
        const delta = 2;
        const range = [];
        const rangeWithDots = [];
        for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
            range.push(i);
        }
        if (currentPage - delta > 2) {
            rangeWithDots.push(1, '...');
        }
        else {
            rangeWithDots.push(1);
        }
        rangeWithDots.push(...range);
        if (currentPage + delta < totalPages - 1) {
            rangeWithDots.push('...', totalPages);
        }
        else {
            rangeWithDots.push(totalPages);
        }
        return rangeWithDots;
    };
    const startItem = totalItems && itemsPerPage ? (currentPage - 1) * itemsPerPage + 1 : 0;
    const endItem = totalItems && itemsPerPage ? Math.min(currentPage * itemsPerPage, totalItems) : 0;
    return (_jsxs("div", { className: `flex items-center justify-between ${className}`, children: [showInfo && totalItems && (_jsxs("div", { className: "text-sm text-gray-700", children: ["Showing ", startItem, " to ", endItem, " of ", totalItems, " results"] })), _jsxs("div", { className: "flex items-center space-x-1", children: [_jsx(Button, { variant: "outline", size: "sm", onClick: () => onPageChange(currentPage - 1), disabled: currentPage === 1, children: "Previous" }), getVisiblePages().map((page, index) => (_jsx(React.Fragment, { children: page === '...' ? (_jsx("span", { className: "px-3 py-2 text-gray-500", children: "..." })) : (_jsx(Button, { variant: currentPage === page ? 'primary' : 'outline', size: "sm", onClick: () => onPageChange(page), className: "min-w-[40px]", children: page })) }, index))), _jsx(Button, { variant: "outline", size: "sm", onClick: () => onPageChange(currentPage + 1), disabled: currentPage === totalPages, children: "Next" })] })] }));
};
