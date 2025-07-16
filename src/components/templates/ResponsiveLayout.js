import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
export const ResponsiveLayout = ({ children, className = '', maxWidth = 'full', padding = 'md' }) => {
    const maxWidthClasses = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        '2xl': 'max-w-2xl',
        full: 'max-w-full'
    };
    const paddingClasses = {
        none: '',
        sm: 'px-2 py-2',
        md: 'px-4 py-4 sm:px-6',
        lg: 'px-6 py-6 sm:px-8'
    };
    return (_jsx("div", { className: `w-full mx-auto ${maxWidthClasses[maxWidth]} ${paddingClasses[padding]} ${className}`, children: children }));
};
