import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { Button } from '../atoms/Button';
import { Badge } from '../atoms/Badge';
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
    const SortIcon = ({ field }) => {
        return (_jsx("span", { className: "inline-flex items-center justify-center w-4 h-4 ml-2", children: sortField === field ? (sortDirection === 'asc' ? (_jsx(ChevronUp, { className: "h-4 w-4 text-gray-600" })) : (_jsx(ChevronDown, { className: "h-4 w-4 text-gray-600" }))) : (_jsx("span", { className: "text-gray-400 text-sm", children: "\u2195" })) }));
    };
    return (_jsx("div", { className: "bg-gray-50 min-h-screen", children: _jsx("main", { className: "px-6 lg:px-8 py-8", children: _jsxs("div", { className: "max-w-full mx-auto", children: [_jsxs("div", { className: "flex items-center justify-between mb-8", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-semibold text-gray-900", children: "Customers" }), _jsx("p", { className: "text-gray-600 mt-1", children: "Manage all customer profiles and their associated jobs" })] }), _jsx(Button, { className: "bg-blue-600 hover:bg-blue-700 text-white", onClick: onAddCustomer, children: "Add Customer" })] }), _jsx("div", { className: "bg-white rounded-lg border border-gray-200 overflow-hidden", children: _jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { className: "bg-gray-50", children: [_jsx(TableHead, { className: "font-medium text-gray-700 cursor-pointer hover:bg-gray-100 select-none", onClick: () => handleSort('fullName'), children: _jsxs("div", { className: "flex items-center justify-start", children: ["Full Name", _jsx(SortIcon, { field: "fullName" })] }) }), _jsx(TableHead, { className: "font-medium text-gray-700 cursor-pointer hover:bg-gray-100 select-none", onClick: () => handleSort('email'), children: _jsxs("div", { className: "flex items-center justify-start", children: ["Email", _jsx(SortIcon, { field: "email" })] }) }), _jsx(TableHead, { className: "font-medium text-gray-700 cursor-pointer hover:bg-gray-100 select-none", onClick: () => handleSort('phone'), children: _jsxs("div", { className: "flex items-center justify-start", children: ["Phone", _jsx(SortIcon, { field: "phone" })] }) }), _jsx(TableHead, { className: "font-medium text-gray-700 cursor-pointer hover:bg-gray-100 select-none", onClick: () => handleSort('address'), children: _jsxs("div", { className: "flex items-center justify-start", children: ["Address", _jsx(SortIcon, { field: "address" })] }) }), _jsx(TableHead, { className: "font-medium text-gray-700 cursor-pointer hover:bg-gray-100 select-none", onClick: () => handleSort('customerType'), children: _jsxs("div", { className: "flex items-center justify-start", children: ["Type", _jsx(SortIcon, { field: "customerType" })] }) }), _jsx(TableHead, { className: "font-medium text-gray-700 cursor-pointer hover:bg-gray-100 select-none", onClick: () => handleSort('status'), children: _jsxs("div", { className: "flex items-center justify-start", children: ["Status", _jsx(SortIcon, { field: "status" })] }) }), _jsx(TableHead, { className: "font-medium text-gray-700 cursor-pointer hover:bg-gray-100 select-none", onClick: () => handleSort('jobCount'), children: _jsxs("div", { className: "flex items-center justify-start", children: ["Jobs", _jsx(SortIcon, { field: "jobCount" })] }) }), _jsx(TableHead, { className: "font-medium text-gray-700 cursor-pointer hover:bg-gray-100 select-none", onClick: () => handleSort('lastContact'), children: _jsxs("div", { className: "flex items-center justify-start", children: ["Last Contact", _jsx(SortIcon, { field: "lastContact" })] }) }), _jsx(TableHead, { className: "font-medium text-gray-700", children: _jsxs("div", { className: "flex items-center justify-start", children: ["Assigned Roofer", _jsx("span", { className: "w-4 h-4 ml-2" })] }) }), _jsx(TableHead, { className: "font-medium text-gray-700", children: _jsxs("div", { className: "flex items-center justify-center", children: ["Edit", _jsx("span", { className: "w-4 h-4 ml-2" })] }) })] }) }), _jsx(TableBody, { children: sortedCustomers.map((customer) => (_jsxs(TableRow, { className: "hover:bg-gray-50", children: [_jsx(TableCell, { children: _jsx("button", { className: "text-blue-600 hover:text-blue-800 hover:underline text-left", onClick: () => onEditCustomer(customer), children: customer.fullName }) }), _jsx(TableCell, { className: "text-gray-900", children: customer.email }), _jsx(TableCell, { className: "text-gray-900", children: customer.phone }), _jsx(TableCell, { className: "text-gray-900", children: customer.address }), _jsx(TableCell, { children: _jsx(Badge, { variant: "outline", className: `text-xs px-2 py-1 ${getCustomerTypeColor(customer.customerType)}`, children: customer.customerType === 'residential' ? 'Residential' : 'Commercial' }) }), _jsx(TableCell, { children: _jsx(Badge, { variant: "outline", className: `text-xs px-2 py-1 ${getStatusColor(customer.status)}`, children: customer.status === 'active' ? 'Active' : 'Inactive' }) }), _jsx(TableCell, { className: "text-gray-900", children: customer.jobCount }), _jsx(TableCell, { className: "text-gray-900", children: new Date(customer.lastContact).toLocaleDateString() }), _jsx(TableCell, { children: customer.assignedRoofer ? (_jsx(Badge, { variant: "outline", className: "text-xs px-2 py-1 bg-orange-100 text-orange-800 border-orange-200", children: customer.assignedRoofer })) : (_jsx("span", { className: "text-gray-400 text-sm", children: "No roofer assigned" })) }), _jsx(TableCell, { className: "text-center", children: _jsx(Button, { variant: "outline", size: "sm", className: "text-xs px-2 py-1", onClick: () => onEditCustomer(customer), children: "Edit" }) })] }, customer.id))) })] }) })] }) }) }));
};
