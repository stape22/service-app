import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
export const NavItem = ({ to, label, icon, exact = false, className = '', ...props }) => {
    const location = useLocation();
    const isActive = exact ? location.pathname === to : location.pathname.startsWith(to);
    return (_jsxs(Link, { to: to, className: [
            'flex items-center gap-2 px-4 py-2 rounded transition-colors',
            isActive ? 'bg-base-200 text-primary font-semibold' : 'hover:bg-base-100',
            className,
        ].filter(Boolean).join(' '), "aria-current": isActive ? 'page' : undefined, ...props, children: [icon && _jsx("span", { className: "text-lg", children: icon }), _jsx("span", { children: label })] }));
};
