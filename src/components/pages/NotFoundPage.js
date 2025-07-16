import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../atoms/Button';
export const NotFoundPage = () => {
    return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-gray-50", children: _jsxs("div", { className: "max-w-md w-full text-center", children: [_jsxs("div", { className: "mb-8", children: [_jsx("h1", { className: "text-9xl font-bold text-gray-300", children: "404" }), _jsx("h2", { className: "text-2xl font-semibold text-gray-700 mb-4", children: "Page Not Found" }), _jsx("p", { className: "text-gray-500 mb-8", children: "The page you're looking for doesn't exist or has been moved." })] }), _jsxs("div", { className: "space-y-4", children: [_jsx(Link, { to: "/dashboard", children: _jsx(Button, { variant: "primary", size: "lg", className: "w-full", children: "Go to Dashboard" }) }), _jsx(Link, { to: "/", children: _jsx(Button, { variant: "outline", size: "lg", className: "w-full", children: "Go Home" }) })] })] }) }));
};
