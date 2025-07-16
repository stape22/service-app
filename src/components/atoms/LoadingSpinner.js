import { jsx as _jsx } from "react/jsx-runtime";
export const LoadingSpinner = ({ size = 'md', className = '' }) => {
    const sizeClasses = {
        sm: 'h-4 w-4',
        md: 'h-8 w-8',
        lg: 'h-12 w-12'
    };
    return (_jsx("div", { className: `flex items-center justify-center ${className}`, children: _jsx("div", { className: `animate-spin rounded-full border-2 border-gray-300 border-t-blue-600 ${sizeClasses[size]}` }) }));
};
