import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { TopNav } from '../organisms/TopNav';
import { Sidebar } from '../organisms/Sidebar';
export const DashboardLayout = ({ children, currentPage, onPageChange, isChatOpen, onChatToggle, onChatClose, }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };
    return (_jsxs("div", { className: "min-h-screen bg-gray-50", children: [_jsx(TopNav, { onChatToggle: onChatToggle, currentPage: currentPage, onPageChange: onPageChange, onMenuToggle: toggleSidebar }), _jsxs("div", { className: "flex", children: [sidebarOpen && (_jsx("div", { className: "fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden", onClick: () => setSidebarOpen(false) })), _jsx("div", { className: `
          fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `, children: _jsx(Sidebar, { currentPage: currentPage, onPageChange: (page) => {
                                onPageChange(page);
                                setSidebarOpen(false); // Close sidebar on mobile after navigation
                            } }) }), _jsx("div", { className: `flex-1 transition-all duration-300 ${isChatOpen ? 'mr-80' : ''}`, children: _jsx("div", { className: "lg:ml-0", children: children }) }), isChatOpen && (_jsx("div", { className: "fixed right-0 top-0 h-full w-80 bg-white border-l border-gray-200 shadow-lg z-30", children: _jsxs("div", { className: "p-4", children: [_jsx("button", { onClick: onChatClose, className: "text-gray-500 hover:text-gray-700", children: "Close Chat" }), _jsx("div", { className: "mt-4", children: _jsx("p", { className: "text-gray-600", children: "Chat functionality coming soon..." }) })] }) }))] })] }));
};
