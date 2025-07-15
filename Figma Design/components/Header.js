import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// [REFERENCE-ONLY] This file is for Figma design reference. It may not build or run. See README/rules.md.
// import { MessageCircle, Settings, Home, Briefcase, Users, HardHat } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
export function Header({ onChatToggle, currentPage, onPageChange }) {
    const getNavButtonClass = (page) => {
        const isActive = currentPage === page ||
            (page === 'roofers' && (currentPage === 'add-roofer' || currentPage === 'edit-roofer')) ||
            (page === 'customers' && (currentPage === 'add-customer' || currentPage === 'edit-customer'));
        return isActive
            ? "flex items-center space-x-2 text-blue-600 bg-blue-50"
            : "flex items-center space-x-2 text-gray-600 hover:text-gray-900";
    };
    return (_jsx("header", { className: "bg-white border-b border-gray-200 px-6 py-4 h-16 flex items-center", children: _jsxs("div", { className: "flex items-center justify-between w-full", children: [_jsxs("div", { className: "flex items-center space-x-8", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("div", { className: "w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center", children: _jsx("div", { className: "w-4 h-4 bg-white rounded-sm" }) }), _jsx("span", { className: "text-xl font-semibold text-gray-900", children: "ServiceMaster" })] }), _jsxs("nav", { className: "flex items-center space-x-6", children: [_jsxs(Button, { variant: "ghost", className: getNavButtonClass('dashboard'), onClick: () => onPageChange('dashboard'), children: [_jsx(Home, { className: "w-4 h-4" }), _jsx("span", { children: "Dashboard" })] }), _jsxs(Button, { variant: "ghost", className: getNavButtonClass('jobs'), onClick: () => onPageChange('jobs'), children: [_jsx(Briefcase, { className: "w-4 h-4" }), _jsx("span", { children: "Jobs" })] }), _jsxs(Button, { variant: "ghost", className: getNavButtonClass('roofers'), onClick: () => onPageChange('roofers'), children: [_jsx(HardHat, { className: "w-4 h-4" }), _jsx("span", { children: "Roofers" })] }), _jsxs(Button, { variant: "ghost", className: getNavButtonClass('customers'), onClick: () => onPageChange('customers'), children: [_jsx(Users, { className: "w-4 h-4" }), _jsx("span", { children: "Customers" })] })] })] }), _jsxs("div", { className: "flex items-center space-x-4", children: [_jsx(Button, { variant: "ghost", size: "icon", className: "text-gray-600 hover:text-gray-900", onClick: onChatToggle, children: _jsx(MessageCircle, { className: "w-5 h-5" }) }), _jsx(Button, { variant: "ghost", size: "icon", className: "text-gray-600 hover:text-gray-900", children: _jsx(Settings, { className: "w-5 h-5" }) }), _jsxs(Avatar, { className: "w-8 h-8", children: [_jsx(AvatarImage, { src: "/api/placeholder/32/32", alt: "Alex" }), _jsx(AvatarFallback, { children: "A" })] })] })] }) }));
}
