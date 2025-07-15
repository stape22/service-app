import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { NavItem } from '../molecules/NavItem';
import { Link } from 'react-router-dom';
export const Sidebar = ({ className = '' }) => (_jsxs("aside", { className: ["sidebar bg-base-100 border-r border-base-300 min-h-screen w-64 p-4", className].filter(Boolean).join(' '), role: "complementary", "aria-label": "Sidebar navigation", children: [_jsx("div", { className: "mb-8", children: _jsx(Link, { to: "/dashboard", className: "text-2xl font-bold tracking-tight", children: "ServiceApp" }) }), _jsxs("nav", { className: "flex flex-col gap-2", children: [_jsx(NavItem, { to: "/dashboard/jobs", label: "Jobs" }), _jsx(NavItem, { to: "/dashboard/roofers", label: "Roofers" }), _jsx(NavItem, { to: "/dashboard/customers", label: "Customers" })] })] }));
