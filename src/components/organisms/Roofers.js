import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { Button } from '../atoms/Button';
import { Badge } from '../atoms/Badge';
const getAvailabilityColor = (availability) => {
    return availability === 'full-time'
        ? 'bg-green-100 text-green-800 border-green-200'
        : 'bg-yellow-100 text-yellow-800 border-yellow-200';
};
const getCertificationColor = (certification) => {
    switch (certification.toLowerCase()) {
        case 'licensed':
            return 'bg-blue-100 text-blue-800 border-blue-200';
        case 'insured':
            return 'bg-purple-100 text-purple-800 border-purple-200';
        case 'bonded':
            return 'bg-green-100 text-green-800 border-green-200';
        default:
            return 'bg-gray-100 text-gray-800 border-gray-200';
    }
};
const roofersData = [
    {
        id: 1,
        fullName: 'Michael Rodriguez',
        email: 'michael.r@example.com',
        phone: '(555) 123-4567',
        address: '1234 Oak Street',
        availability: 'full-time',
        certifications: ['Licensed', 'Insured'],
        contactCount: 3
    },
    {
        id: 2,
        fullName: 'Sarah Johnson',
        email: 'sarah.j@example.com',
        phone: '(555) 987-6543',
        address: '1234 Oak Street',
        availability: 'part-time',
        certifications: ['Licensed', 'Insured', 'Bonded'],
        contactCount: 2
    },
    {
        id: 3,
        fullName: 'David Thompson',
        email: 'david.t@example.com',
        phone: '(555) 234-5678',
        address: '1234 Oak Street',
        availability: 'full-time',
        certifications: ['Licensed'],
        contactCount: 0
    },
    {
        id: 4,
        fullName: 'Jennifer Martinez',
        email: 'jennifer.m@example.com',
        phone: '(555) 345-6789',
        address: '1234 Oak Street',
        availability: 'full-time',
        certifications: ['Licensed', 'Insured'],
        contactCount: 1
    },
    {
        id: 5,
        fullName: 'Robert Wilson',
        email: 'robert.w@example.com',
        phone: '(555) 456-7890',
        address: '1234 Oak Street',
        availability: 'part-time',
        certifications: ['Licensed', 'Insured'],
        contactCount: 4
    }
];
export const Roofers = ({ onAddRoofer, onEditRoofer }) => {
    const [sortField] = useState('fullName');
    const [sortDirection] = useState('asc');
    const sortedRoofers = [...roofersData].sort((a, b) => {
        let aValue;
        let bValue;
        switch (sortField) {
            case 'fullName':
                aValue = a.fullName;
                bValue = b.fullName;
                break;
            case 'email':
                aValue = a.email;
                bValue = b.email;
                break;
            case 'phone':
                aValue = a.phone;
                bValue = b.phone;
                break;
            case 'address':
                aValue = a.address;
                bValue = b.address;
                break;
            case 'availability':
                aValue = a.availability;
                bValue = b.availability;
                break;
            case 'contactCount':
                aValue = a.contactCount;
                bValue = b.contactCount;
                break;
            default:
                aValue = a.fullName;
                bValue = b.fullName;
        }
        if (typeof aValue === 'string' && typeof bValue === 'string') {
            return sortDirection === 'asc'
                ? aValue.localeCompare(bValue)
                : bValue.localeCompare(aValue);
        }
        else {
            return sortDirection === 'asc'
                ? aValue - bValue
                : bValue - aValue;
        }
    });
    // lucide-react not available; using Unicode arrows for sort icons. Replace with icons if/when available.
    const SortIcon = ({ field }) => {
        return (_jsx("span", { className: "inline-flex items-center justify-center w-4 h-4 ml-2", children: sortField === field ? (sortDirection === 'asc' ? (_jsx("span", { className: "text-gray-600", children: "\u25B2" })) : (_jsx("span", { className: "text-gray-600", children: "\u25BC" }))) : (_jsx("span", { className: "text-gray-400 text-sm", children: "\u2195" })) }));
    };
    return (_jsx("div", { className: "bg-gray-50 min-h-screen", children: _jsx("main", { className: "px-6 lg:px-8 py-8", children: _jsxs("div", { className: "max-w-full mx-auto", children: [_jsxs("div", { className: "flex items-center justify-between mb-8", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-semibold text-gray-900", children: "Roofers" }), _jsx("p", { className: "text-gray-600 mt-1", children: "Manage all roofer profiles and their associated contacts" })] }), _jsx(Button, { className: "bg-blue-600 hover:bg-blue-700 text-white", onClick: onAddRoofer, children: "Add Roofer" })] }), _jsxs("div", { className: "bg-white rounded-lg border border-gray-200 overflow-hidden", children: [_jsx("div", { className: "bg-gray-50", children: _jsxs("div", { className: "flex items-center justify-start", children: ["Full Name", _jsx(SortIcon, { field: "fullName" })] }) }), _jsxs("div", { className: "flex items-center justify-start", children: ["Email Address", _jsx(SortIcon, { field: "email" })] }), _jsxs("div", { className: "flex items-center justify-start", children: ["Phone Number", _jsx(SortIcon, { field: "phone" })] }), _jsxs("div", { className: "flex items-center justify-start", children: ["Address", _jsx(SortIcon, { field: "address" })] }), _jsxs("div", { className: "flex items-center justify-start", children: ["Availability", _jsx(SortIcon, { field: "availability" })] }), _jsxs("div", { className: "flex items-center justify-start", children: ["Certifications", _jsx("span", { className: "w-4 h-4 ml-2" })] }), _jsxs("div", { className: "flex items-center justify-end", children: ["# of Contacts", _jsx(SortIcon, { field: "contactCount" })] }), _jsx("div", { children: sortedRoofers.map((roofer) => (_jsxs("div", { className: "hover:bg-gray-50 p-2 border-b last:border-b-0", children: [_jsx("div", { children: _jsx("button", { className: "text-blue-600 hover:text-blue-800 hover:underline text-left", onClick: () => onEditRoofer(roofer), children: roofer.fullName }) }), _jsx("div", { className: "text-gray-900", children: roofer.email }), _jsx("div", { className: "text-gray-900", children: roofer.phone }), _jsx("div", { className: "text-gray-900", children: roofer.address }), _jsx("div", { children: _jsx(Badge, { variant: "primary", className: `text-xs px-2 py-1 ${getAvailabilityColor(roofer.availability)}`, children: roofer.availability === 'full-time' ? 'Full-time' : 'Part-time' }) }), _jsx("div", { className: "flex gap-1 flex-wrap", children: roofer.certifications.map((cert, index) => (_jsx(Badge, { variant: "primary", className: `text-xs px-2 py-1 ${getCertificationColor(cert)}`, children: cert }, index))) }), _jsx("div", { className: "text-right text-gray-900", children: roofer.contactCount })] }, roofer.id))) })] })] }) }) }));
};
