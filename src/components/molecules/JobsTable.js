import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from '../atoms/Table';
import { Badge } from '../atoms/Badge';
import { Button } from '../atoms/Button';
const jobsData = [
    { id: '#318', date: 'June 4, 2025', jobType: 'Install', status: 'scheduled', roofer: 'Mike Johnson', address: '1234 Oak Street', customer: 'John Smith', priority: 'high', estimatedCost: 15000 },
    { id: '#319', date: 'June 5, 2025', jobType: 'Repair', status: 'to-schedule', roofer: 'Sarah Williams', address: '567 Pine Avenue', customer: 'Emily Davis', priority: 'medium', estimatedCost: 2500 },
    { id: '#320', date: 'June 5, 2025', jobType: 'Estimate', status: 'completed', roofer: 'David Chen', address: '890 Maple Drive', customer: 'Robert Johnson', priority: 'low', estimatedCost: 300 },
    { id: '#321', date: 'June 6, 2025', jobType: 'Install', status: 'in-progress', roofer: 'James Wilson', address: '123 Elm Court', customer: 'Patricia Brown', priority: 'high', estimatedCost: 18000 },
    { id: '#322', date: 'June 7, 2025', jobType: 'Repair', status: 'scheduled', roofer: 'Lisa Martinez', address: '456 Cedar Lane', customer: 'Michael Wilson', priority: 'urgent', estimatedCost: 4200 },
    { id: '#323', date: 'June 8, 2025', jobType: 'Cleaning', status: 'to-schedule', roofer: 'Thomas Anderson', address: '789 Birch Street', customer: 'Jennifer Taylor', priority: 'medium', estimatedCost: 800 },
];
const getJobTypeColor = (type) => {
    const colors = {
        'repair': 'bg-blue-100 text-blue-800 border-blue-200',
        'install': 'bg-orange-100 text-orange-800 border-orange-200',
        'estimate': 'bg-indigo-100 text-indigo-800 border-indigo-200',
        'cleaning': 'bg-purple-100 text-purple-800 border-purple-200'
    };
    return colors[type.toLowerCase()] || 'bg-gray-100 text-gray-800 border-gray-200';
};
const getStatusColor = (status) => {
    const colors = {
        'scheduled': 'bg-blue-100 text-blue-800 border-blue-200',
        'to-schedule': 'bg-yellow-100 text-yellow-800 border-yellow-200',
        'completed': 'bg-green-100 text-green-800 border-green-200',
        'in-progress': 'bg-orange-100 text-orange-800 border-orange-200'
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
export const JobsTable = ({ onEditJob, onDeleteJob, jobs }) => {
    const [sortField, setSortField] = useState('id');
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
    const sortedJobs = [...(jobs || jobsData)].sort((a, b) => {
        let aValue = a[sortField];
        let bValue = b[sortField];
        if (sortField === 'id') {
            aValue = parseInt(a.id.replace('#', ''));
            bValue = parseInt(b.id.replace('#', ''));
        }
        if (sortField === 'date') {
            aValue = new Date(a.date).getTime();
            bValue = new Date(b.date).getTime();
        }
        if (sortField === 'priority') {
            const priorityOrder = { 'low': 1, 'medium': 2, 'high': 3, 'urgent': 4 };
            aValue = priorityOrder[a.priority || 'medium'];
            bValue = priorityOrder[b.priority || 'medium'];
        }
        if (sortField === 'estimatedCost') {
            aValue = a.estimatedCost || 0;
            bValue = b.estimatedCost || 0;
        }
        if (typeof aValue === 'string' && typeof bValue === 'string') {
            return sortDirection === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        }
        else {
            return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
        }
    });
    const SortIcon = ({ field }) => (_jsx("span", { className: "inline-flex items-center justify-center w-4 h-4 ml-2", children: sortField === field ? (sortDirection === 'asc' ? (_jsx("span", { "aria-label": "sorted ascending", children: "\u25B2" })) : (_jsx("span", { "aria-label": "sorted descending", children: "\u25BC" }))) : (_jsx("span", { className: "text-gray-400 text-sm", children: "\u2195" })) }));
    return (_jsx("div", { className: "overflow-x-auto", children: _jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { className: "bg-gray-50", children: [_jsx(TableHead, { className: "font-medium text-gray-700 cursor-pointer hover:bg-gray-100 select-none", onClick: () => handleSort('id'), children: _jsxs("div", { className: "flex items-center justify-start", children: ["Job Number", _jsx(SortIcon, { field: "id" })] }) }), _jsx(TableHead, { className: "font-medium text-gray-700 cursor-pointer hover:bg-gray-100 select-none", onClick: () => handleSort('customer'), children: _jsxs("div", { className: "flex items-center justify-start", children: ["Customer", _jsx(SortIcon, { field: "customer" })] }) }), _jsx(TableHead, { className: "font-medium text-gray-700", children: _jsxs("div", { className: "flex items-center justify-start", children: ["Assigned Roofer", _jsx("span", { className: "w-4 h-4 ml-2" })] }) }), _jsx(TableHead, { className: "font-medium text-gray-700 cursor-pointer hover:bg-gray-100 select-none", onClick: () => handleSort('jobType'), children: _jsxs("div", { className: "flex items-center justify-start", children: ["Job Type", _jsx(SortIcon, { field: "jobType" })] }) }), _jsx(TableHead, { className: "font-medium text-gray-700 cursor-pointer hover:bg-gray-100 select-none", onClick: () => handleSort('status'), children: _jsxs("div", { className: "flex items-center justify-start", children: ["Status", _jsx(SortIcon, { field: "status" })] }) }), _jsx(TableHead, { className: "font-medium text-gray-700 cursor-pointer hover:bg-gray-100 select-none", onClick: () => handleSort('priority'), children: _jsxs("div", { className: "flex items-center justify-start", children: ["Priority", _jsx(SortIcon, { field: "priority" })] }) }), _jsx(TableHead, { className: "font-medium text-gray-700 cursor-pointer hover:bg-gray-100 select-none", onClick: () => handleSort('date'), children: _jsxs("div", { className: "flex items-center justify-start", children: ["Scheduled Date", _jsx(SortIcon, { field: "date" })] }) }), _jsx(TableHead, { className: "font-medium text-gray-700", children: _jsxs("div", { className: "flex items-center justify-start", children: ["Job Location", _jsx("span", { className: "w-4 h-4 ml-2" })] }) }), _jsx(TableHead, { className: "font-medium text-gray-700 cursor-pointer hover:bg-gray-100 select-none", onClick: () => handleSort('estimatedCost'), children: _jsxs("div", { className: "flex items-center justify-end", children: ["Est. Cost", _jsx(SortIcon, { field: "estimatedCost" })] }) }), _jsx(TableHead, { children: _jsx("span", { className: "sr-only", children: "Actions" }) })] }) }), _jsx(TableBody, { children: sortedJobs.map((job) => (_jsxs(TableRow, { className: "hover:bg-gray-50 group", children: [_jsx(TableCell, { children: _jsx("button", { className: "text-blue-600 hover:text-blue-800 hover:underline text-left", onClick: () => onEditJob?.(job.id), children: job.id }) }), _jsx(TableCell, { className: "text-gray-900", children: job.customer }), _jsx(TableCell, { children: job.roofer ? (_jsx(Badge, { variant: "outline", className: "text-xs px-2 py-1 bg-orange-100 text-orange-800 border-orange-200", children: job.roofer })) : (_jsx("span", { className: "text-gray-400 text-sm", children: "No roofer assigned" })) }), _jsx(TableCell, { children: _jsx(Badge, { variant: "outline", className: `text-xs px-2 py-1 ${getJobTypeColor(job.jobType)}`, children: formatJobType(job.jobType) }) }), _jsx(TableCell, { children: _jsx(Badge, { variant: "outline", className: `text-xs px-2 py-1 ${getStatusColor(job.status)}`, children: formatStatus(job.status) }) }), _jsx(TableCell, { children: _jsx(Badge, { variant: "outline", className: `text-xs px-2 py-1 ${getPriorityColor(job.priority || 'medium')}`, children: formatPriority(job.priority || 'medium') }) }), _jsx(TableCell, { className: "text-gray-900", children: new Date(job.date).toLocaleDateString() }), _jsx(TableCell, { className: "text-gray-900 max-w-xs truncate", children: job.address }), _jsxs(TableCell, { className: "text-right text-gray-900", children: ["$", (job.estimatedCost || 0).toLocaleString()] }), _jsx(TableCell, { children: (onEditJob || onDeleteJob) && (_jsxs("div", { className: "flex gap-2", children: [onEditJob && (_jsx(Button, { variant: "secondary", size: "sm", "aria-label": `Edit job ${job.id}`, onClick: e => { e.stopPropagation(); onEditJob(job.id); }, className: "opacity-80 group-hover:opacity-100", children: "\u270F\uFE0F" })), onDeleteJob && (_jsx(Button, { variant: "danger", size: "sm", "aria-label": `Delete job ${job.id}`, onClick: e => { e.stopPropagation(); onDeleteJob(job.id); }, className: "opacity-80 group-hover:opacity-100", children: "\uD83D\uDDD1" }))] })) })] }, job.id))) })] }) }));
};
