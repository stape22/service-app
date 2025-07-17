import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { Button } from '../atoms/Button';
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from '../atoms/Table';
const getCustomerTypeColor = (type) => {
    return type === 'residential'
        ? 'bg-blue-100 text-blue-800 border-blue-200'
        : 'bg-purple-100 text-purple-800 border-purple-200';
};
const getStatusColor = (status) => {
    return status === 'active'
        ? 'bg-green-100 text-green-800 border-green-200'
        : 'bg-gray-100 text-gray-800 border-gray-200';
};
export const Customers = ({ customers, onAddCustomer, onEditCustomer }) => {
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
    const sortedCustomers = [...customers].sort((a, b) => {
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
            case 'customerType':
                aValue = a.customerType;
                bValue = b.customerType;
                break;
            case 'status':
                aValue = a.status;
                bValue = b.status;
                break;
            case 'jobCount':
                aValue = a.jobCount;
                bValue = b.jobCount;
                break;
            case 'lastContact':
                aValue = new Date(a.lastContact).getTime();
                bValue = new Date(b.lastContact).getTime();
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
    // Unicode arrows for sort icons (replace with icons if/when available)
    const SortIcon = ({ field }) => {
        return (_jsx("span", { className: "inline-flex items-center justify-center w-4 h-4 ml-2", children: sortField === field ? (sortDirection === 'asc' ? (_jsx("span", { className: "text-gray-600", children: "\u25B2" })) : (_jsx("span", { className: "text-gray-600", children: "\u25BC" }))) : (_jsx("span", { className: "text-gray-400 text-sm", children: "\u2195" })) }));
    };
    return (_jsx("div", { className: "bg-gray-50 min-h-screen", children: _jsx("main", { className: "px-6 lg:px-8 py-8", children: _jsxs("div", { className: "max-w-full mx-auto", children: [_jsxs("div", { className: "flex items-center justify-between mb-8", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-semibold text-gray-900", children: "Customers" }), _jsx("p", { className: "text-gray-600 mt-1", children: "Manage all customer profiles and their associated jobs" })] }), _jsx(Button, { className: "bg-blue-600 hover:bg-blue-700 text-white", onClick: onAddCustomer, children: "Add Customer" })] }), _jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { children: [_jsxs(TableHead, { onClick: () => handleSort('fullName'), children: ["Full Name", _jsx(SortIcon, { field: "fullName" })] }), _jsxs(TableHead, { onClick: () => handleSort('email'), children: ["Email", _jsx(SortIcon, { field: "email" })] }), _jsxs(TableHead, { onClick: () => handleSort('phone'), children: ["Phone", _jsx(SortIcon, { field: "phone" })] }), _jsxs(TableHead, { onClick: () => handleSort('address'), children: ["Address", _jsx(SortIcon, { field: "address" })] }), _jsxs(TableHead, { onClick: () => handleSort('customerType'), children: ["Type", _jsx(SortIcon, { field: "customerType" })] }), _jsxs(TableHead, { onClick: () => handleSort('status'), children: ["Status", _jsx(SortIcon, { field: "status" })] }), _jsxs(TableHead, { onClick: () => handleSort('jobCount'), children: ["Jobs", _jsx(SortIcon, { field: "jobCount" })] }), _jsxs(TableHead, { onClick: () => handleSort('lastContact'), children: ["Last Contact", _jsx(SortIcon, { field: "lastContact" })] }), _jsx(TableHead, { children: "Assigned Roofer" }), _jsx(TableHead, { children: "Edit" })] }) }), _jsx(TableBody, { children: sortedCustomers.map((customer) => (_jsxs(TableRow, { children: [_jsx(TableCell, { children: customer.fullName }), _jsx(TableCell, { children: customer.email }), _jsx(TableCell, { children: customer.phone }), _jsx(TableCell, { children: customer.address }), _jsx(TableCell, { children: _jsx("span", { className: `px-2 py-1 rounded ${getCustomerTypeColor(customer.customerType)}`, children: customer.customerType.charAt(0).toUpperCase() + customer.customerType.slice(1) }) }), _jsx(TableCell, { children: _jsx("span", { className: `px-2 py-1 rounded ${getStatusColor(customer.status)}`, children: customer.status.charAt(0).toUpperCase() + customer.status.slice(1) }) }), _jsx(TableCell, { children: customer.jobCount }), _jsx(TableCell, { children: customer.lastContact }), _jsx(TableCell, { children: customer.assignedRoofer || '-' }), _jsx(TableCell, { children: _jsx(Button, { variant: "outline", size: "sm", onClick: () => onEditCustomer(customer), children: "Edit" }) })] }, customer.id))) })] })] }) }) }));
};
