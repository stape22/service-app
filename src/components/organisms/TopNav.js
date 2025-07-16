import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { Button } from '../atoms/Button';
import { Avatar, AvatarFallback } from '../atoms/Avatar';
import { Link, useLocation } from 'react-router-dom';
import { Home, Briefcase, HardHat, Users, MessageCircle, Settings } from 'lucide-react';
export const TopNav = ({ userName, onMenuToggle, currentPage, onPageChange }) => {
    const location = useLocation();
    const getNavButtonClass = (path) => {
        const isActive = location.pathname === path ||
            (path === '/dashboard/roofers' && location.pathname.includes('/roofers')) ||
            (path === '/dashboard/customers' && location.pathname.includes('/customers'));
        return isActive
            ? "flex items-center space-x-2 text-blue-600 bg-blue-50 rounded-md px-3 py-2"
            : "flex items-center space-x-2 text-gray-600 hover:text-gray-900 px-3 py-2";
    };
    return (_jsx("header", { className: "bg-white border-b border-gray-200 px-6 py-4 h-16 flex items-center", children: _jsxs("div", { className: "flex items-center justify-between w-full", children: [_jsxs("div", { className: "flex items-center space-x-8", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("div", { className: "w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center", children: _jsx("div", { className: "w-4 h-4 bg-white rounded-sm" }) }), _jsx(Link, { to: "/dashboard", className: "text-xl font-semibold text-gray-900", children: "ServiceMaster" })] }), _jsxs("nav", { className: "flex items-center space-x-6", children: [_jsx(Link, { to: "/dashboard", children: _jsxs(Button, { variant: "ghost", className: getNavButtonClass('/dashboard'), children: [_jsx(Home, { className: "w-4 h-4" }), _jsx("span", { children: "Dashboard" })] }) }), _jsx(Link, { to: "/dashboard/jobs", children: _jsxs(Button, { variant: "ghost", className: getNavButtonClass('/dashboard/jobs'), children: [_jsx(Briefcase, { className: "w-4 h-4" }), _jsx("span", { children: "Jobs" })] }) }), _jsx(Link, { to: "/dashboard/roofers", children: _jsxs(Button, { variant: "ghost", className: getNavButtonClass('/dashboard/roofers'), children: [_jsx(HardHat, { className: "w-4 h-4" }), _jsx("span", { children: "Roofers" })] }) }), _jsx(Link, { to: "/dashboard/customers", children: _jsxs(Button, { variant: "ghost", className: getNavButtonClass('/dashboard/customers'), children: [_jsx(Users, { className: "w-4 h-4" }), _jsx("span", { children: "Customers" })] }) })] })] }), _jsxs("div", { className: "flex items-center space-x-4", children: [_jsx(Button, { variant: "ghost", size: "icon", className: "text-gray-600 hover:text-gray-900", onClick: onMenuToggle, children: _jsx(MessageCircle, { className: "w-5 h-5" }) }), _jsx(Button, { variant: "ghost", size: "icon", className: "text-gray-600 hover:text-gray-900", children: _jsx(Settings, { className: "w-5 h-5" }) }), _jsx(Avatar, { className: "w-8 h-8", children: _jsx(AvatarFallback, { className: "bg-gray-100 text-gray-600", children: userName ? userName[0] : 'A' }) })] })] }) }));
};
