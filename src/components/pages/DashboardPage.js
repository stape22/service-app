import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { DashboardLayout } from '../templates/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../atoms/Tabs';
import { Calendar, Layout, Table } from 'lucide-react';
import { JobsCalendar } from '../organisms/JobsCalendar';
import { JobsTable } from '../molecules/JobsTable';
// Local jobs data for demonstration (should be replaced with real data source)
const jobsData = [
    { id: '#318', date: 'July 11, 2025', jobType: 'Roof Repair', status: 'scheduled', roofer: 'Mike Johnson', address: '1234 Oak Street', customer: 'John Smith' },
    { id: '#319', date: 'July 15, 2025', jobType: 'Inspection', status: 'to-schedule', roofer: 'Sarah Williams', address: '567 Pine Avenue', customer: 'Emily Davis' },
    { id: '#320', date: 'July 22, 2025', jobType: 'Installation', status: 'scheduled', roofer: 'David Chen', address: '890 Maple Drive', customer: 'Robert Johnson' },
    { id: '#321', date: 'July 8, 2025', jobType: 'Cleaning', status: 'completed', roofer: 'James Wilson', address: '123 Elm Court', customer: 'Patricia Brown' },
    { id: '#322', date: 'July 25, 2025', jobType: 'Repair', status: 'scheduled', roofer: 'Lisa Martinez', address: '456 Cedar Lane', customer: 'Michael Wilson' },
    { id: '#323', date: 'August 5, 2025', jobType: 'Inspection', status: 'to-schedule', roofer: 'Thomas Anderson', address: '789 Birch Street', customer: 'Jennifer Taylor' },
    { id: '#324', date: 'August 12, 2025', jobType: 'Installation', status: 'scheduled', roofer: 'Mike Johnson', address: '321 Pine Street', customer: 'William Davis' },
    { id: '#325', date: 'August 18, 2025', jobType: 'Cleaning', status: 'to-schedule', roofer: 'Sarah Williams', address: '654 Oak Avenue', customer: 'Lisa Wilson' },
];
const jobsForCalendar = jobsData.map(j => ({
    id: j.id,
    title: j.jobType,
    type: (() => {
        switch (j.jobType.toLowerCase()) {
            case 'roof repair':
            case 'repair':
                return 'repair';
            case 'inspection':
                return 'estimate';
            case 'installation':
                return 'install';
            case 'cleaning':
                return 'cleaning';
            default:
                return 'repair';
        }
    })(),
    date: new Date(j.date),
}));
export const DashboardPage = () => {
    const [activeView, setActiveView] = useState('calendar');
    const [currentPage, setCurrentPage] = useState('dashboard');
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    return (_jsx(DashboardLayout, { currentPage: currentPage, onPageChange: handlePageChange, children: _jsx("main", { className: "px-6 lg:px-8 py-8", children: _jsxs("div", { className: "max-w-full mx-auto", children: [_jsxs("div", { className: "flex items-center justify-between mb-8", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-semibold text-gray-900", children: "Dashboard" }), _jsx("p", { className: "text-gray-600 mt-1", children: "Overview of your roofing jobs and schedule" })] }), _jsx(Tabs, { value: activeView, onValueChange: (value) => setActiveView(value), className: "w-auto", children: _jsxs(TabsList, { className: "grid w-full grid-cols-3", children: [_jsx(TabsTrigger, { value: "calendar", className: "p-2", title: "Calendar View", children: _jsx(Calendar, { className: "h-4 w-4" }) }), _jsx(TabsTrigger, { value: "kanban", className: "p-2", title: "Kanban View", children: _jsx(Layout, { className: "h-4 w-4" }) }), _jsx(TabsTrigger, { value: "table", className: "p-2", title: "Table View", children: _jsx(Table, { className: "h-4 w-4" }) })] }) })] }), _jsx("div", { className: "bg-white rounded-lg border border-gray-200 overflow-hidden", children: _jsxs(Tabs, { value: activeView, className: "w-full", children: [_jsx(TabsContent, { value: "calendar", className: "m-0", children: _jsx(JobsCalendar, { jobs: jobsForCalendar }) }), _jsx(TabsContent, { value: "kanban", className: "m-0", children: _jsx("div", { className: "p-8 text-center text-gray-500", children: "Kanban view coming soon." }) }), _jsx(TabsContent, { value: "table", className: "m-0", children: _jsx(JobsTable, { jobs: jobsData }) })] }) })] }) }) }));
};
