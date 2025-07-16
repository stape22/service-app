import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useEffect } from 'react';
import { Badge } from './Badge';
export const Toast = ({ type, message, onClose, duration = 5000, className = '' }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, duration);
        return () => clearTimeout(timer);
    }, [duration, onClose]);
    const typeStyles = {
        success: 'bg-green-50 border-green-200 text-green-800',
        error: 'bg-red-50 border-red-200 text-red-800',
        info: 'bg-blue-50 border-blue-200 text-blue-800',
        warning: 'bg-yellow-50 border-yellow-200 text-yellow-800'
    };
    const iconStyles = {
        success: 'text-green-500',
        error: 'text-red-500',
        info: 'text-blue-500',
        warning: 'text-yellow-500'
    };
    const icons = {
        success: '✓',
        error: '✕',
        info: 'ℹ',
        warning: '⚠'
    };
    return (_jsx("div", { className: `fixed top-4 right-4 z-50 max-w-sm w-full ${className}`, children: _jsxs("div", { className: `flex items-center p-4 border rounded-lg shadow-lg ${typeStyles[type]}`, children: [_jsx("div", { className: `flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full ${iconStyles[type]} font-bold`, children: icons[type] }), _jsx("div", { className: "ml-3 flex-1", children: _jsx("p", { className: "text-sm font-medium", children: message }) }), _jsxs("button", { onClick: onClose, className: "ml-4 flex-shrink-0 text-gray-400 hover:text-gray-600 focus:outline-none", children: [_jsx("span", { className: "sr-only", children: "Close" }), _jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) })] })] }) }));
};
