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
const customersData = [
    {
        id: 1,
        fullName: 'John Smith',
        email: 'john.smith@email.com',
        phone: '(555) 123-4567',
        address: '123 Main Street, Springfield, IL 62701',
        customerType: 'residential',
        status: 'active',
        jobCount: 3,
        lastContact: '2024-01-15',
        assignedRoofer: 'Michael Rodriguez'
    },
    {
        id: 2,
        fullName: 'ABC Corporation',
        email: 'contact@abccorp.com',
        phone: '(555) 987-6543',
        address: '456 Business Ave, Chicago, IL 60601',
        customerType: 'commercial',
        status: 'active',
        jobCount: 8,
        lastContact: '2024-01-20',
        assignedRoofer: 'Sarah Johnson'
    },
    {
        id: 3,
        fullName: 'Maria Garcia',
        email: 'maria.garcia@email.com',
        phone: '(555) 234-5678',
        address: '789 Oak Drive, Peoria, IL 61602',
        customerType: 'residential',
        status: 'active',
        jobCount: 1,
        lastContact: '2024-01-10',
        assignedRoofer: 'David Thompson'
    },
    {
        id: 4,
        fullName: 'Tech Solutions Inc.',
        email: 'info@techsolutions.com',
        phone: '(555) 345-6789',
        address: '321 Corporate Blvd, Rockford, IL 61101',
        customerType: 'commercial',
        status: 'inactive',
        jobCount: 0,
        lastContact: '2023-12-05',
        assignedRoofer: null
    },
    {
        id: 5,
        fullName: 'Robert Johnson',
        email: 'rob.johnson@email.com',
        phone: '(555) 456-7890',
        address: '654 Pine Street, Decatur, IL 62521',
        customerType: 'residential',
        status: 'active',
        jobCount: 5,
        lastContact: '2024-01-18',
        assignedRoofer: 'Jennifer Martinez'
    }
];
export const Customers = ({ onAddCustomer, onEditCustomer }) => {
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
    const sortedCustomers = [...customersData].sort((a, b) => {
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
    return (_jsx("div", { className: "bg-gray-50 min-h-screen", children: _jsx("main", { className: "px-6 lg:px-8 py-8", children: _jsxs("div", { className: "max-w-full mx-auto", children: [_jsxs("div", { className: "flex items-center justify-between mb-8", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-semibold text-gray-900", children: "Customers" }), _jsx("p", { className: "text-gray-600 mt-1", children: "Manage all customer profiles and their associated jobs" })] }), _jsx(Button, { className: "bg-blue-600 hover:bg-blue-700 text-white", onClick: onAddCustomer, children: "Add Customer" })] }), _jsx("div", { className: "bg-white rounded-lg border border-gray-200 overflow-x-auto", children: _jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { children: [_jsxs(TableHead, { onClick: () => handleSort('fullName'), className: "cursor-pointer", children: ["Name", _jsx(SortIcon, { field: "fullName" })] }), _jsxs(TableHead, { onClick: () => handleSort('email'), className: "cursor-pointer", children: ["Email", _jsx(SortIcon, { field: "email" })] }), _jsxs(TableHead, { onClick: () => handleSort('phone'), className: "cursor-pointer", children: ["Phone", _jsx(SortIcon, { field: "phone" })] }), _jsxs(TableHead, { onClick: () => handleSort('address'), className: "cursor-pointer", children: ["Address", _jsx(SortIcon, { field: "address" })] }), _jsxs(TableHead, { onClick: () => handleSort('customerType'), className: "cursor-pointer", children: ["Type", _jsx(SortIcon, { field: "customerType" })] }), _jsxs(TableHead, { onClick: () => handleSort('status'), className: "cursor-pointer", children: ["Status", _jsx(SortIcon, { field: "status" })] }), _jsxs(TableHead, { onClick: () => handleSort('jobCount'), className: "cursor-pointer", children: ["Jobs", _jsx(SortIcon, { field: "jobCount" })] }), _jsxs(TableHead, { onClick: () => handleSort('lastContact'), className: "cursor-pointer", children: ["Last Contact", _jsx(SortIcon, { field: "lastContact" })] }), _jsx(TableHead, { children: "Assigned Roofer" }), _jsx(TableHead, { children: "Actions" })] }) }), _jsx(TableBody, { children: sortedCustomers.map((customer) => (_jsxs(TableRow, { children: [_jsx(TableCell, { children: customer.fullName }), _jsx(TableCell, { children: customer.email }), _jsx(TableCell, { children: customer.phone }), _jsx(TableCell, { children: customer.address }), _jsx(TableCell, { children: _jsx("span", { className: `inline-block px-2 py-1 rounded border text-xs font-medium ${getCustomerTypeColor(customer.customerType)}`, children: customer.customerType.charAt(0).toUpperCase() + customer.customerType.slice(1) }) }), _jsx(TableCell, { children: _jsx("span", { className: `inline-block px-2 py-1 rounded border text-xs font-medium ${getStatusColor(customer.status)}`, children: customer.status.charAt(0).toUpperCase() + customer.status.slice(1) }) }), _jsx(TableCell, { children: customer.jobCount }), _jsx(TableCell, { children: customer.lastContact }), _jsx(TableCell, { children: customer.assignedRoofer || '-' }), _jsx(TableCell, { children: _jsx(Button, { variant: "outline", size: "sm", onClick: () => onEditCustomer(customer), children: "Edit" }) })] }, customer.id))) })] }) })] }) }) }));
};
