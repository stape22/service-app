import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
export const LoadingSpinner = ({ size = 'md', className = '' }) => {
    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-6 h-6',
        lg: 'w-8 h-8'
    };
    return (_jsx("div", { className: `inline-block ${sizeClasses[size]} ${className}`, children: _jsx("div", { className: "animate-spin rounded-full h-full w-full border-2 border-gray-300 border-t-blue-600" }) }));
};
