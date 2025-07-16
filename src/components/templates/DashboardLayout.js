import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { TopNav } from '../organisms/TopNav';
export const DashboardLayout = ({ children, currentPage = 'dashboard', onPageChange, }) => {
    return (_jsxs("div", { className: "min-h-screen bg-gray-50", children: [_jsx(TopNav, { onMenuToggle: () => { }, currentPage: currentPage, onPageChange: onPageChange }), _jsx("main", { className: "p-4 lg:p-6", children: children })] }));
};
