import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { LoadingSpinner } from './LoadingSpinner';
export const LoadingState = ({ isLoading, children, message = 'Loading...', skeleton, className = '' }) => {
    if (!isLoading) {
        return _jsx(_Fragment, { children: children });
    }
    return (_jsxs("div", { className: `flex flex-col items-center justify-center p-8 ${className}`, children: [_jsx(LoadingSpinner, { size: "lg", className: "mb-4" }), _jsx("p", { className: "text-gray-600 text-sm", children: message }), skeleton && (_jsx("div", { className: "w-full mt-4", children: skeleton }))] }));
};
// Skeleton components for common UI patterns
export const SkeletonText = ({ lines = 1, className = '' }) => (_jsx("div", { className: `space-y-2 ${className}`, children: Array.from({ length: lines }).map((_, i) => (_jsx("div", { className: "h-4 bg-gray-200 rounded animate-pulse" }, i))) }));
export const SkeletonCard = ({ className = '' }) => (_jsx("div", { className: `bg-white p-4 rounded-lg shadow border ${className}`, children: _jsxs("div", { className: "flex items-center space-x-4", children: [_jsx("div", { className: "w-12 h-12 bg-gray-200 rounded-full animate-pulse" }), _jsxs("div", { className: "flex-1 space-y-2", children: [_jsx("div", { className: "h-4 bg-gray-200 rounded animate-pulse" }), _jsx("div", { className: "h-3 bg-gray-200 rounded animate-pulse w-3/4" })] })] }) }));
export const SkeletonTable = ({ rows = 5, columns = 4, className = '' }) => (_jsxs("div", { className: `bg-white rounded-lg shadow border ${className}`, children: [_jsx("div", { className: "p-4 border-b", children: _jsx("div", { className: "grid grid-cols-4 gap-4", children: Array.from({ length: columns }).map((_, i) => (_jsx("div", { className: "h-4 bg-gray-200 rounded animate-pulse" }, i))) }) }), _jsx("div", { className: "divide-y", children: Array.from({ length: rows }).map((_, rowIndex) => (_jsx("div", { className: "p-4", children: _jsx("div", { className: "grid grid-cols-4 gap-4", children: Array.from({ length: columns }).map((_, colIndex) => (_jsx("div", { className: "h-4 bg-gray-200 rounded animate-pulse" }, colIndex))) }) }, rowIndex))) })] }));
