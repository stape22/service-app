import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from '../atoms/Table';
import { Badge } from '../atoms/Badge';
import { Button } from '../atoms/Button';
const jobsData = [
    { id: '#318', date: 'June 4, 2025', jobType: 'Install', status: 'scheduled', roofer: 'Mike Johnson', address: '1234 Oak Street', customer: 'John Smith' },
    { id: '#319', date: 'June 5, 2025', jobType: 'Repair', status: 'to-schedule', roofer: 'Sarah Williams', address: '567 Pine Avenue', customer: 'Emily Davis' },
    { id: '#320', date: 'June 5, 2025', jobType: 'Estimate', status: 'completed', roofer: 'David Chen', address: '890 Maple Drive', customer: 'Robert Johnson' },
    { id: '#321', date: 'June 6, 2025', jobType: 'Install', status: 'in-progress', roofer: 'James Wilson', address: '123 Elm Court', customer: 'Patricia Brown' },
    { id: '#322', date: 'June 7, 2025', jobType: 'Repair', status: 'scheduled', roofer: 'Lisa Martinez', address: '456 Cedar Lane', customer: 'Michael Wilson' },
    { id: '#323', date: 'June 8, 2025', jobType: 'Cleaning', status: 'to-schedule', roofer: 'Thomas Anderson', address: '789 Birch Street', customer: 'Jennifer Taylor' },
];
const statusColors = {
    'scheduled': 'bg-blue-100 text-blue-800 border-blue-200',
    'to-schedule': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'completed': 'bg-green-100 text-green-800 border-green-200',
    'in-progress': 'bg-orange-100 text-orange-800 border-orange-200',
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
        if (typeof aValue === 'string' && typeof bValue === 'string') {
            return sortDirection === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        }
        else {
            return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
        }
    });
    const SortIcon = ({ field }) => (_jsx("span", { className: "inline-flex items-center justify-center w-4 h-4 ml-2", children: sortField === field ? (sortDirection === 'asc' ? (_jsx("span", { "aria-label": "sorted ascending", children: "\u25B2" })) : (_jsx("span", { "aria-label": "sorted descending", children: "\u25BC" }))) : (_jsx("span", { className: "text-gray-400 text-sm", children: "\u2195" })) }));
    return (_jsx("div", { className: "overflow-x-auto", children: _jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { children: [_jsx(TableHead, { className: "cursor-pointer", onClick: () => handleSort('id'), children: _jsxs("div", { className: "flex items-center", children: ["Job #", _jsx(SortIcon, { field: "id" })] }) }), _jsx(TableHead, { className: "cursor-pointer", onClick: () => handleSort('date'), children: _jsxs("div", { className: "flex items-center", children: ["Date", _jsx(SortIcon, { field: "date" })] }) }), _jsx(TableHead, { className: "cursor-pointer", onClick: () => handleSort('jobType'), children: _jsxs("div", { className: "flex items-center", children: ["Job Type", _jsx(SortIcon, { field: "jobType" })] }) }), _jsx(TableHead, { className: "cursor-pointer", onClick: () => handleSort('status'), children: _jsxs("div", { className: "flex items-center", children: ["Status", _jsx(SortIcon, { field: "status" })] }) }), _jsx(TableHead, { className: "cursor-pointer", onClick: () => handleSort('roofer'), children: _jsxs("div", { className: "flex items-center", children: ["Roofer", _jsx(SortIcon, { field: "roofer" })] }) }), _jsx(TableHead, { className: "cursor-pointer", onClick: () => handleSort('address'), children: _jsxs("div", { className: "flex items-center", children: ["Address", _jsx(SortIcon, { field: "address" })] }) }), _jsx(TableHead, { className: "cursor-pointer", onClick: () => handleSort('customer'), children: _jsxs("div", { className: "flex items-center", children: ["Customer", _jsx(SortIcon, { field: "customer" })] }) }), _jsx(TableHead, { children: _jsx("span", { className: "sr-only", children: "Actions" }) })] }) }), _jsx(TableBody, { children: sortedJobs.map((job) => (_jsxs(TableRow, { className: "hover:bg-blue-50 group", children: [_jsx(TableCell, { className: "text-right font-mono cursor-pointer", onClick: () => onEditJob?.(job.id), children: job.id }), _jsx(TableCell, { className: "cursor-pointer", onClick: () => onEditJob?.(job.id), children: job.date }), _jsx(TableCell, { className: "cursor-pointer", onClick: () => onEditJob?.(job.id), children: job.jobType }), _jsx(TableCell, { className: "cursor-pointer", onClick: () => onEditJob?.(job.id), children: _jsx(Badge, { variant: "secondary", className: `text-xs px-2 py-1 border ${statusColors[job.status]}`, children: job.status.replace('-', ' ') }) }), _jsx(TableCell, { className: "cursor-pointer", onClick: () => onEditJob?.(job.id), children: job.roofer }), _jsx(TableCell, { className: "cursor-pointer", onClick: () => onEditJob?.(job.id), children: job.address }), _jsx(TableCell, { className: "cursor-pointer", onClick: () => onEditJob?.(job.id), children: job.customer }), _jsx(TableCell, { children: (onEditJob || onDeleteJob) && (_jsxs("div", { className: "flex gap-2", children: [onEditJob && (_jsx(Button, { variant: "secondary", size: "sm", "aria-label": `Edit job ${job.id}`, onClick: e => { e.stopPropagation(); onEditJob(job.id); }, className: "opacity-80 group-hover:opacity-100", children: "\u270F\uFE0F" })), onDeleteJob && (_jsx(Button, { variant: "danger", size: "sm", "aria-label": `Delete job ${job.id}`, onClick: e => { e.stopPropagation(); onDeleteJob(job.id); }, className: "opacity-80 group-hover:opacity-100", children: "\uD83D\uDDD1" }))] })) })] }, job.id))) })] }) }));
};
