import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
export const DashboardLayout = ({ children, currentPage, onPageChange, isChatOpen, onChatToggle, onChatClose, }) => {
    return (_jsx("div", { className: "min-h-screen bg-gray-50", children: _jsx("div", { className: "flex", children: _jsx("div", { className: `flex-1 transition-all duration-300 ${isChatOpen ? 'mr-80' : ''}`, children: children }) }) }));
};
