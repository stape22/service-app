import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// [REFERENCE-ONLY] This file is for Figma design reference. It may not build or run. See README/rules.md.
// import { Calendar, User } from "lucide-react";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
const getStatusColor = (status) => {
    switch (status) {
        case 'estimate':
            return 'bg-indigo-100 text-indigo-800 border-indigo-200';
        case 'install':
            return 'bg-orange-100 text-orange-800 border-orange-200';
        case 'repair':
            return 'bg-blue-100 text-blue-800 border-blue-200';
        case 'cleaning':
            return 'bg-purple-100 text-purple-800 border-purple-200';
        case 'completed':
            return 'bg-gray-100 text-gray-800 border-gray-200';
        default:
            return 'bg-gray-100 text-gray-800 border-gray-200';
    }
};
const columns = [
    {
        id: 'to-schedule',
        title: 'To Schedule',
        count: 4,
        jobs: [
            {
                id: '#320',
                title: 'Roof Inspection',
                address: '123 Main St, Austin',
                assignee: { name: 'Unassigned', initials: 'U' },
                date: 'Oct 15, 2023',
                status: 'estimate',
                isUnassigned: true
            },
            {
                id: '#322',
                title: 'New Shingle Roof',
                address: '456 Oak Dr, Austin',
                assignee: { name: 'Unassigned', initials: 'U' },
                date: 'Oct 16, 2023',
                status: 'install',
                isUnassigned: true
            },
            {
                id: '#325',
                title: 'Gutter Replacement',
                address: '789 Pine Ln, Austin',
                assignee: { name: 'Unassigned', initials: 'U' },
                date: 'Oct 17, 2023',
                status: 'repair',
                isUnassigned: true
            },
            {
                id: '#327',
                title: 'Roof Cleaning',
                address: '101 Cedar St, Austin',
                assignee: { name: 'Unassigned', initials: 'U' },
                date: 'Oct 18, 2023',
                status: 'cleaning',
                isUnassigned: true
            }
        ]
    },
    {
        id: 'scheduled',
        title: 'Scheduled',
        count: 3,
        jobs: [
            {
                id: '#318',
                title: 'Metal Roof Installation',
                address: '202 Maple Ave, Austin',
                assignee: { name: 'Mike Johnson', initials: 'MJ' },
                date: 'Oct 15, 2023',
                status: 'install'
            },
            {
                id: '#319',
                title: 'Leak Repair',
                address: '303 Birch Rd, Austin',
                assignee: { name: 'Sarah Williams', initials: 'SW' },
                date: 'Oct 16, 2023',
                status: 'repair'
            },
            {
                id: '#321',
                title: 'Storm Damage Assessment',
                address: '404 Elm Ct, Austin',
                assignee: { name: 'David Chen', initials: 'DC' },
                date: 'Oct 14, 2023',
                status: 'estimate'
            }
        ]
    },
    {
        id: 'in-progress',
        title: 'In Progress',
        count: 3,
        jobs: [
            {
                id: '#315',
                title: 'Solar Roof Installation',
                address: '505 Willow Way, Austin',
                assignee: { name: 'Robert Taylor', initials: 'RT' },
                date: 'Oct 16, 2023',
                status: 'install'
            },
            {
                id: '#316',
                title: 'Annual Roof Inspection',
                address: '606 Aspen Dr, Austin',
                assignee: { name: 'Lisa Rodriguez', initials: 'LR' },
                date: 'Oct 13, 2023',
                status: 'cleaning'
            },
            {
                id: '#317',
                title: 'Chimney Flashing Repair',
                address: '707 Spruce Dr, Austin',
                assignee: { name: 'James Wilson', initials: 'JW' },
                date: 'Oct 14, 2023',
                status: 'repair'
            }
        ]
    },
    {
        id: 'completed',
        title: 'Completed',
        count: 4,
        jobs: [
            {
                id: '#311',
                title: 'Skylight Installation',
                address: '808 Redwood Ln, Austin',
                assignee: { name: 'Mike Johnson', initials: 'MJ' },
                date: 'Oct 10, 2023',
                status: 'completed'
            },
            {
                id: '#312',
                title: 'Roof Replacement',
                address: '909 Fir Blvd, Austin',
                assignee: { name: 'Robert Taylor', initials: 'RT' },
                date: 'Oct 9, 2023',
                status: 'completed'
            },
            {
                id: '#313',
                title: 'Gutter Cleaning',
                address: '1010 Hemlock St, Austin',
                assignee: { name: 'Lisa Rodriguez', initials: 'LR' },
                date: 'Oct 11, 2023',
                status: 'completed'
            },
            {
                id: '#314',
                title: 'Roof Inspection',
                address: '1111 Juniper Ct, Austin',
                assignee: { name: 'Sarah Williams', initials: 'SW' },
                date: 'Oct 12, 2023',
                status: 'completed'
            }
        ]
    }
];
function JobCard({ job }) {
    return (_jsxs("div", { className: "bg-white rounded-lg border border-gray-200 p-4 mb-3 shadow-sm hover:shadow-md transition-shadow", children: [_jsxs("div", { className: "flex items-start justify-between mb-3", children: [_jsxs("div", { children: [_jsx("h4", { className: "font-medium text-gray-900 mb-1", children: job.id }), _jsx("h5", { className: "text-gray-700 mb-2", children: job.title }), _jsx("p", { className: "text-sm text-gray-600 mb-3", children: job.address })] }), _jsx(Badge, { variant: "outline", className: `text-xs px-2 py-1 capitalize ${getStatusColor(job.status)}`, children: job.status })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [job.isUnassigned ? (_jsx("div", { className: "w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center" })) : (_jsxs(Avatar, { className: "w-6 h-6", children: [_jsx(AvatarImage, { src: job.assignee.avatar }), _jsx(AvatarFallback, { className: "text-xs", children: job.assignee.initials })] })), _jsx("span", { className: "text-sm text-gray-600", children: job.assignee.name })] }), _jsx("div", { className: "flex items-center space-x-1 text-xs text-gray-500", children: _jsx("span", { children: job.date }) })] })] }));
}
export function KanbanBoard() {
    return (_jsx("div", { className: "grid grid-cols-4 gap-6", children: columns.map((column) => (_jsxs("div", { className: "bg-gray-50 rounded-lg p-4", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("h3", { className: "font-medium text-gray-900", children: column.title }), _jsx("span", { className: "bg-gray-200 text-gray-700 text-sm px-2 py-1 rounded-full", children: column.count })] }), _jsx("div", { className: "space-y-0", children: column.jobs.map((job) => (_jsx(JobCard, { job: job }, job.id))) })] }, column.id))) }));
}
