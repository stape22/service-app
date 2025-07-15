import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// [REFERENCE-ONLY] This file is for Figma design reference. It may not build or run. See README/rules.md.
// import { ChevronUp, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "./ui/table";
import { Badge } from "./ui/badge";
const getStatusColor = (status) => {
    switch (status) {
        case 'scheduled':
            return 'bg-blue-100 text-blue-800 border-blue-200';
        case 'to-schedule':
            return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        case 'completed':
            return 'bg-green-100 text-green-800 border-green-200';
        case 'in-progress':
            return 'bg-purple-100 text-purple-800 border-purple-200';
        default:
            return 'bg-gray-100 text-gray-800 border-gray-200';
    }
};
const getStatusText = (status) => {
    switch (status) {
        case 'to-schedule':
            return 'To Schedule';
        case 'in-progress':
            return 'In Progress';
        default:
            return status.charAt(0).toUpperCase() + status.slice(1);
    }
};
const jobsData = [
    {
        id: '#318',
        date: 'June 4, 2025',
        jobType: 'Install',
        status: 'scheduled',
        roofer: 'Mike Johnson',
        address: '1234 Oak Street',
        customer: 'John Smith'
    },
    {
        id: '#319',
        date: 'June 5, 2025',
        jobType: 'Repair',
        status: 'to-schedule',
        roofer: 'Sarah Williams',
        address: '567 Pine Avenue',
        customer: 'Emily Davis'
    },
    {
        id: '#320',
        date: 'June 5, 2025',
        jobType: 'Estimate',
        status: 'completed',
        roofer: 'David Chen',
        address: '890 Maple Drive',
        customer: 'Robert Johnson'
    },
    {
        id: '#321',
        date: 'June 6, 2025',
        jobType: 'Install',
        status: 'in-progress',
        roofer: 'James Wilson',
        address: '123 Elm Court',
        customer: 'Patricia Brown'
    },
    {
        id: '#322',
        date: 'June 7, 2025',
        jobType: 'Repair',
        status: 'scheduled',
        roofer: 'Lisa Martinez',
        address: '456 Cedar Lane',
        customer: 'Michael Wilson'
    },
    {
        id: '#323',
        date: 'June 8, 2025',
        jobType: 'Cleaning',
        status: 'to-schedule',
        roofer: 'Thomas Anderson',
        address: '789 Birch Street',
        customer: 'Jennifer Taylor'
    }
];
export function JobsTable({ onJobEdit }) {
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
    const sortedJobs = [...jobsData].sort((a, b) => {
        let aValue;
        let bValue;
        switch (sortField) {
            case 'id':
                // Extract number from ID for proper sorting
                aValue = parseInt(a.id.replace('#', ''));
                bValue = parseInt(b.id.replace('#', ''));
                break;
            case 'date':
                aValue = new Date(a.date).getTime();
                bValue = new Date(b.date).getTime();
                break;
            case 'jobType':
                aValue = a.jobType;
                bValue = b.jobType;
                break;
            case 'status':
                aValue = a.status;
                bValue = b.status;
                break;
            case 'roofer':
                aValue = a.roofer;
                bValue = b.roofer;
                break;
            case 'address':
                aValue = a.address;
                bValue = b.address;
                break;
            case 'customer':
                aValue = a.customer;
                bValue = b.customer;
                break;
            default:
                aValue = parseInt(a.id.replace('#', ''));
                bValue = parseInt(b.id.replace('#', ''));
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
    const handleJobClick = (jobId) => {
        if (onJobEdit) {
            // Extract number from job ID and pass to parent
            const numericId = parseInt(jobId.replace('#', ''));
            onJobEdit(numericId);
        }
    };
    return (_jsx("div", { className: "rounded-lg border border-gray-200 overflow-hidden", children: _jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { className: "bg-gray-50", children: [_jsx(TableHead, { className: "font-medium text-gray-700 cursor-pointer hover:bg-gray-100 select-none", onClick: () => handleSort('id'), children: _jsxs("div", { className: "flex items-center justify-end", children: ["Job #", _jsx(SortIcon, { field: "id" })] }) }), _jsx(TableHead, { className: "font-medium text-gray-700 cursor-pointer hover:bg-gray-100 select-none", onClick: () => handleSort('date'), children: _jsxs("div", { className: "flex items-center justify-start", children: ["Date", _jsx(SortIcon, { field: "date" })] }) }), _jsx(TableHead, { className: "font-medium text-gray-700 cursor-pointer hover:bg-gray-100 select-none", onClick: () => handleSort('jobType'), children: _jsxs("div", { className: "flex items-center justify-start", children: ["Job Type", _jsx(SortIcon, { field: "jobType" })] }) }), _jsx(TableHead, { className: "font-medium text-gray-700 cursor-pointer hover:bg-gray-100 select-none", onClick: () => handleSort('status'), children: _jsxs("div", { className: "flex items-center justify-start", children: ["Status", _jsx(SortIcon, { field: "status" })] }) }), _jsx(TableHead, { className: "font-medium text-gray-700 cursor-pointer hover:bg-gray-100 select-none", onClick: () => handleSort('roofer'), children: _jsxs("div", { className: "flex items-center justify-start", children: ["Roofer", _jsx(SortIcon, { field: "roofer" })] }) }), _jsx(TableHead, { className: "font-medium text-gray-700 cursor-pointer hover:bg-gray-100 select-none", onClick: () => handleSort('address'), children: _jsxs("div", { className: "flex items-center justify-start", children: ["Address", _jsx(SortIcon, { field: "address" })] }) }), _jsx(TableHead, { className: "font-medium text-gray-700 cursor-pointer hover:bg-gray-100 select-none", onClick: () => handleSort('customer'), children: _jsxs("div", { className: "flex items-center justify-start", children: ["Customer", _jsx(SortIcon, { field: "customer" })] }) })] }) }), _jsx(TableBody, { children: sortedJobs.map((job) => (_jsxs(TableRow, { className: "hover:bg-gray-50", children: [_jsx(TableCell, { className: "text-right", children: _jsx("button", { className: "text-blue-600 hover:text-blue-800 hover:underline", onClick: () => handleJobClick(job.id), children: job.id }) }), _jsx(TableCell, { className: "text-gray-900", children: job.date }), _jsx(TableCell, { className: "text-gray-900", children: job.jobType }), _jsx(TableCell, { children: _jsx(Badge, { variant: "outline", className: `text-xs px-2 py-1 ${getStatusColor(job.status)}`, children: getStatusText(job.status) }) }), _jsx(TableCell, { className: "text-gray-900", children: job.roofer }), _jsx(TableCell, { className: "text-gray-600", children: job.address }), _jsx(TableCell, { className: "text-gray-900", children: job.customer })] }, job.id))) })] }) }));
}
