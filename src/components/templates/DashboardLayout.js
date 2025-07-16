import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { TopNav } from '../organisms/TopNav';
import { Sidebar } from '../organisms/Sidebar';
export const DashboardLayout = ({ children, currentPage = 'dashboard', onPageChange, }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (_jsxs("div", { className: "min-h-screen bg-gray-50", children: [_jsx(TopNav, { onMenuToggle: () => setSidebarOpen(!sidebarOpen), currentPage: currentPage, onPageChange: onPageChange }), _jsxs("div", { className: "flex", children: [_jsx("div", { className: `fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`, children: _jsx(Sidebar, { currentPage: currentPage, onPageChange: onPageChange, onClose: () => setSidebarOpen(false) }) }), sidebarOpen && (_jsx("div", { className: "fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden", onClick: () => setSidebarOpen(false) })), _jsx("div", { className: "flex-1 lg:ml-0", children: _jsx("main", { className: "p-4 lg:p-6", children: children }) })] })] }));
};
