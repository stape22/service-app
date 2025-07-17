import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { Button } from '../atoms/Button';
import { Badge } from '../atoms/Badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../atoms/Table';
import { ChevronUp, ChevronDown } from 'lucide-react';
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
export const Roofers = ({ roofers, onAddRoofer, onEditRoofer, onDeleteRoofer }) => {
    const [sortField, setSortField] = useState('fullName');
    const [sortDirection, setSortDirection] = useState('asc');
    const handleSort = (field) => {
        if (field === sortField) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        }
        else {
            setSortField(field);
            setSortDirection('asc');
        }
    };
    const sortedRoofers = [...roofers].sort((a, b) => {
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
    const SortIcon = ({ field }) => {
        return (_jsx("span", { className: "inline-flex items-center justify-center w-4 h-4 ml-2", children: sortField === field ? (sortDirection === 'asc' ? (_jsx(ChevronUp, { className: "h-4 w-4 text-gray-600" })) : (_jsx(ChevronDown, { className: "h-4 w-4 text-gray-600" }))) : (_jsx("span", { className: "text-gray-400 text-sm", children: "\u2195" })) }));
    };
    return (_jsx("div", { className: "bg-gray-50 min-h-screen", children: _jsx("main", { className: "px-6 lg:px-8 py-8", children: _jsxs("div", { className: "max-w-full mx-auto", children: [_jsxs("div", { className: "flex items-center justify-between mb-8", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-semibold text-gray-900", children: "Roofers" }), _jsx("p", { className: "text-gray-600 mt-1", children: "Manage all roofer profiles and their associated contacts" })] }), _jsx(Button, { className: "bg-blue-600 hover:bg-blue-700 text-white", onClick: onAddRoofer, children: "Add Roofer" })] }), _jsx("div", { className: "bg-white rounded-lg border border-gray-200 overflow-hidden", children: _jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { className: "bg-gray-50", children: [_jsx(TableHead, { className: "font-medium text-gray-700 cursor-pointer hover:bg-gray-100 select-none", onClick: () => handleSort('fullName'), children: _jsxs("div", { className: "flex items-center justify-start", children: ["Full Name", _jsx(SortIcon, { field: "fullName" })] }) }), _jsx(TableHead, { className: "font-medium text-gray-700 cursor-pointer hover:bg-gray-100 select-none", onClick: () => handleSort('email'), children: _jsxs("div", { className: "flex items-center justify-start", children: ["Email Address", _jsx(SortIcon, { field: "email" })] }) }), _jsx(TableHead, { className: "font-medium text-gray-700 cursor-pointer hover:bg-gray-100 select-none", onClick: () => handleSort('phone'), children: _jsxs("div", { className: "flex items-center justify-start", children: ["Phone Number", _jsx(SortIcon, { field: "phone" })] }) }), _jsx(TableHead, { className: "font-medium text-gray-700 cursor-pointer hover:bg-gray-100 select-none", onClick: () => handleSort('address'), children: _jsxs("div", { className: "flex items-center justify-start", children: ["Address", _jsx(SortIcon, { field: "address" })] }) }), _jsx(TableHead, { className: "font-medium text-gray-700 cursor-pointer hover:bg-gray-100 select-none", onClick: () => handleSort('availability'), children: _jsxs("div", { className: "flex items-center justify-start", children: ["Availability", _jsx(SortIcon, { field: "availability" })] }) }), _jsx(TableHead, { className: "font-medium text-gray-700", children: _jsxs("div", { className: "flex items-center justify-start", children: ["Certifications", _jsx("span", { className: "w-4 h-4 ml-2" })] }) }), _jsx(TableHead, { className: "font-medium text-gray-700 cursor-pointer hover:bg-gray-100 select-none", onClick: () => handleSort('contactCount'), children: _jsxs("div", { className: "flex items-center justify-end", children: ["# of Contacts", _jsx(SortIcon, { field: "contactCount" })] }) })] }) }), _jsx(TableBody, { children: sortedRoofers.map((roofer) => (_jsxs(TableRow, { className: "hover:bg-gray-50", children: [_jsx(TableCell, { children: _jsx("button", { className: "text-blue-600 hover:text-blue-800 hover:underline text-left", onClick: () => onEditRoofer(roofer), children: roofer.fullName }) }), _jsx(TableCell, { className: "text-gray-900", children: roofer.email }), _jsx(TableCell, { className: "text-gray-900", children: roofer.phone }), _jsx(TableCell, { className: "text-gray-900", children: roofer.address }), _jsx(TableCell, { children: _jsx(Badge, { variant: "outline", className: `text-xs px-2 py-1 ${getAvailabilityColor(roofer.availability)}`, children: roofer.availability === 'full-time' ? 'Full-time' : 'Part-time' }) }), _jsx(TableCell, { children: _jsx("div", { className: "flex gap-1 flex-wrap", children: roofer.certifications.map((cert, index) => (_jsx(Badge, { variant: "outline", className: `text-xs px-2 py-1 ${getCertificationColor(cert)}`, children: cert }, index))) }) }), _jsx(TableCell, { className: "text-right text-gray-900", children: roofer.contactCount })] }, roofer.id))) })] }) })] }) }) }));
};
