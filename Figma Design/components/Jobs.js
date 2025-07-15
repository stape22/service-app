import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// [REFERENCE-ONLY] This file is for Figma design reference. It may not build or run. See README/rules.md.
// import { ChevronUp, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "./ui/table";
// Customer data with assigned roofers and addresses
const customersData = [
    { name: 'John Smith', assignedRoofer: 'Michael Rodriguez', address: '123 Main Street, Springfield, IL 62701' },
    { name: 'ABC Corporation', assignedRoofer: 'Sarah Johnson', address: '456 Business Ave, Chicago, IL 60601' },
    { name: 'Maria Garcia', assignedRoofer: 'David Thompson', address: '789 Oak Drive, Peoria, IL 61602' },
    { name: 'Tech Solutions Inc.', assignedRoofer: null, address: '321 Corporate Blvd, Rockford, IL 61101' },
    { name: 'Robert Johnson', assignedRoofer: 'Jennifer Martinez', address: '654 Pine Street, Decatur, IL 62521' }
];
const getJobTypeColor = (type) => {
    const colors = {
        'repair': 'bg-blue-100 text-blue-800 border-blue-200',
        'install': 'bg-orange-100 text-orange-800 border-orange-200',
        'estimate': 'bg-indigo-100 text-indigo-800 border-indigo-200',
        'cleaning': 'bg-purple-100 text-purple-800 border-purple-200'
    };
    return colors[type] || 'bg-gray-100 text-gray-800 border-gray-200';
};
const getStatusColor = (status) => {
    const colors = {
        'scheduled': 'bg-blue-100 text-blue-800 border-blue-200',
        'in-progress': 'bg-orange-100 text-orange-800 border-orange-200',
        'completed': 'bg-green-100 text-green-800 border-green-200',
        'cancelled': 'bg-gray-100 text-gray-800 border-gray-200'
    };
    return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
};
const getPriorityColor = (priority) => {
    const colors = {
        'low': 'bg-gray-100 text-gray-800 border-gray-200',
        'medium': 'bg-yellow-100 text-yellow-800 border-yellow-200',
        'high': 'bg-orange-100 text-orange-800 border-orange-200',
        'urgent': 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[priority] || 'bg-gray-100 text-gray-800 border-gray-200';
};
const formatJobType = (type) => {
    return type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ');
};
const formatStatus = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ');
};
const formatPriority = (priority) => {
    return priority.charAt(0).toUpperCase() + priority.slice(1);
};
// Helper function to get assigned roofer for a customer
const getAssignedRoofer = (customerName) => {
    const customer = customersData.find(c => c.name === customerName);
    return customer?.assignedRoofer || null;
};
// Helper function to get customer address
const getCustomerAddress = (customerName) => {
    const customer = customersData.find(c => c.name === customerName);
    return customer?.address || 'Address not found';
};
const jobsData = [
    {
        id: 1,
        jobNumber: 'JOB-2024-001',
        customerName: 'John Smith',
        jobType: 'repair',
        status: 'scheduled',
        priority: 'high',
        scheduledDate: '2024-01-25',
        estimatedCost: 2500,
        description: 'Roof leak repair - missing shingles on south side'
    },
    {
        id: 2,
        jobNumber: 'JOB-2024-002',
        customerName: 'ABC Corporation',
        jobType: 'install',
        status: 'in-progress',
        priority: 'medium',
        scheduledDate: '2024-01-22',
        estimatedCost: 15000,
        description: 'Complete roof installation for new warehouse building'
    },
    {
        id: 3,
        jobNumber: 'JOB-2024-003',
        customerName: 'Maria Garcia',
        jobType: 'estimate',
        status: 'completed',
        priority: 'low',
        scheduledDate: '2024-01-20',
        estimatedCost: 300,
        description: 'Annual roof inspection and maintenance check'
    },
    {
        id: 4,
        jobNumber: 'JOB-2024-004',
        customerName: 'Tech Solutions Inc.',
        jobType: 'cleaning',
        status: 'scheduled',
        priority: 'medium',
        scheduledDate: '2024-01-28',
        estimatedCost: 800,
        description: 'Gutter cleaning and minor shingle replacement'
    },
    {
        id: 5,
        jobNumber: 'JOB-2024-005',
        customerName: 'Robert Johnson',
        jobType: 'repair',
        status: 'in-progress',
        priority: 'urgent',
        scheduledDate: '2024-01-24',
        estimatedCost: 4200,
        description: 'Emergency storm damage repair - multiple areas affected'
    }
];
export function Jobs({ onAddJob, onEditJob }) {
    const [sortField, setSortField] = useState('jobNumber');
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
    const sortedJobs = [...jobsData].sort((a, b) => {
        let aValue;
        let bValue;
        switch (sortField) {
            case 'jobNumber':
                aValue = a.jobNumber;
                bValue = b.jobNumber;
                break;
            case 'customerName':
                aValue = a.customerName;
                bValue = b.customerName;
                break;
            case 'jobType':
                aValue = a.jobType;
                bValue = b.jobType;
                break;
            case 'status':
                aValue = a.status;
                bValue = b.status;
                break;
            case 'priority':
                // Custom priority order
                const priorityOrder = { 'low': 1, 'medium': 2, 'high': 3, 'urgent': 4 };
                aValue = priorityOrder[a.priority];
                bValue = priorityOrder[b.priority];
                break;
            case 'scheduledDate':
                aValue = new Date(a.scheduledDate).getTime();
                bValue = new Date(b.scheduledDate).getTime();
                break;
            case 'estimatedCost':
                aValue = a.estimatedCost;
                bValue = b.estimatedCost;
                break;
            default:
                aValue = a.jobNumber;
                bValue = b.jobNumber;
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
    return (_jsx("div", { className: "bg-gray-50 min-h-screen", children: _jsx("main", { className: "px-6 lg:px-8 py-8", children: _jsxs("div", { className: "max-w-full mx-auto", children: [_jsxs("div", { className: "flex items-center justify-between mb-8", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-semibold text-gray-900", children: "Jobs" }), _jsx("p", { className: "text-gray-600 mt-1", children: "Manage all roofing jobs and their progress" })] }), _jsx(Button, { className: "bg-blue-600 hover:bg-blue-700 text-white", onClick: onAddJob, children: "Add Job" })] }), _jsx("div", { className: "bg-white rounded-lg border border-gray-200 overflow-hidden", children: _jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { className: "bg-gray-50", children: [_jsx(TableHead, { className: "font-medium text-gray-700 cursor-pointer hover:bg-gray-100 select-none", onClick: () => handleSort('jobNumber'), children: _jsxs("div", { className: "flex items-center justify-start", children: ["Job Number", _jsx(SortIcon, { field: "jobNumber" })] }) }), _jsx(TableHead, { className: "font-medium text-gray-700 cursor-pointer hover:bg-gray-100 select-none", onClick: () => handleSort('customerName'), children: _jsxs("div", { className: "flex items-center justify-start", children: ["Customer", _jsx(SortIcon, { field: "customerName" })] }) }), _jsx(TableHead, { className: "font-medium text-gray-700", children: _jsxs("div", { className: "flex items-center justify-start", children: ["Assigned Roofer", _jsx("span", { className: "w-4 h-4 ml-2" })] }) }), _jsx(TableHead, { className: "font-medium text-gray-700 cursor-pointer hover:bg-gray-100 select-none", onClick: () => handleSort('jobType'), children: _jsxs("div", { className: "flex items-center justify-start", children: ["Job Type", _jsx(SortIcon, { field: "jobType" })] }) }), _jsx(TableHead, { className: "font-medium text-gray-700 cursor-pointer hover:bg-gray-100 select-none", onClick: () => handleSort('status'), children: _jsxs("div", { className: "flex items-center justify-start", children: ["Status", _jsx(SortIcon, { field: "status" })] }) }), _jsx(TableHead, { className: "font-medium text-gray-700 cursor-pointer hover:bg-gray-100 select-none", onClick: () => handleSort('priority'), children: _jsxs("div", { className: "flex items-center justify-start", children: ["Priority", _jsx(SortIcon, { field: "priority" })] }) }), _jsx(TableHead, { className: "font-medium text-gray-700 cursor-pointer hover:bg-gray-100 select-none", onClick: () => handleSort('scheduledDate'), children: _jsxs("div", { className: "flex items-center justify-start", children: ["Scheduled Date", _jsx(SortIcon, { field: "scheduledDate" })] }) }), _jsx(TableHead, { className: "font-medium text-gray-700", children: _jsxs("div", { className: "flex items-center justify-start", children: ["Job Location", _jsx("span", { className: "w-4 h-4 ml-2" })] }) }), _jsx(TableHead, { className: "font-medium text-gray-700 cursor-pointer hover:bg-gray-100 select-none", onClick: () => handleSort('estimatedCost'), children: _jsxs("div", { className: "flex items-center justify-end", children: ["Est. Cost", _jsx(SortIcon, { field: "estimatedCost" })] }) })] }) }), _jsx(TableBody, { children: sortedJobs.map((job) => {
                                        const assignedRoofer = getAssignedRoofer(job.customerName);
                                        const customerAddress = getCustomerAddress(job.customerName);
                                        return (_jsxs(TableRow, { className: "hover:bg-gray-50", children: [_jsx(TableCell, { children: _jsx("button", { className: "text-blue-600 hover:text-blue-800 hover:underline text-left", onClick: () => onEditJob(job), children: job.jobNumber }) }), _jsx(TableCell, { className: "text-gray-900", children: job.customerName }), _jsx(TableCell, { children: assignedRoofer ? (_jsx(Badge, { variant: "outline", className: "text-xs px-2 py-1 bg-orange-100 text-orange-800 border-orange-200", children: assignedRoofer })) : (_jsx("span", { className: "text-gray-400 text-sm", children: "No roofer assigned" })) }), _jsx(TableCell, { children: _jsx(Badge, { variant: "outline", className: `text-xs px-2 py-1 ${getJobTypeColor(job.jobType)}`, children: formatJobType(job.jobType) }) }), _jsx(TableCell, { children: _jsx(Badge, { variant: "outline", className: `text-xs px-2 py-1 ${getStatusColor(job.status)}`, children: formatStatus(job.status) }) }), _jsx(TableCell, { children: _jsx(Badge, { variant: "outline", className: `text-xs px-2 py-1 ${getPriorityColor(job.priority)}`, children: formatPriority(job.priority) }) }), _jsx(TableCell, { className: "text-gray-900", children: new Date(job.scheduledDate).toLocaleDateString() }), _jsx(TableCell, { className: "text-gray-900 max-w-xs truncate", children: customerAddress }), _jsxs(TableCell, { className: "text-right text-gray-900", children: ["$", job.estimatedCost.toLocaleString()] })] }, job.id));
                                    }) })] }) })] }) }) }));
}
