import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { DashboardLayout } from '../templates/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../atoms/Tabs';
import { Calendar, Layout, Table } from 'lucide-react';
// TODO: Replace with atomic/organism KanbanBoard, JobsCalendar, JobsTable implementations. See dev-log.md for rationale.
// import { JobsCalendar } from '../../../Figma Design/components/JobsCalendar';
// import { KanbanBoard } from '../../../Figma Design/components/KanbanBoard';
// import { JobsTable } from '../../../Figma Design/components/JobsTable';
export const DashboardPage = () => {
    const [activeView, setActiveView] = useState('calendar');
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState('dashboard');
    // Navigation handler for DashboardLayout
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    return (_jsx(DashboardLayout, { currentPage: currentPage, onPageChange: handlePageChange, isChatOpen: isChatOpen, onChatToggle: () => setIsChatOpen((v) => !v), onChatClose: () => setIsChatOpen(false), children: _jsx("main", { className: "px-6 lg:px-8 py-8", children: _jsxs("div", { className: "max-w-full mx-auto", children: [_jsxs("div", { className: "flex items-center justify-between mb-8", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-semibold text-gray-900", children: "Dashboard" }), _jsx("p", { className: "text-gray-600 mt-1", children: "Overview of your roofing jobs and schedule" })] }), _jsx(Tabs, { value: activeView, onValueChange: (value) => setActiveView(value), className: "w-auto", children: _jsxs(TabsList, { className: "grid w-full grid-cols-3", children: [_jsx(TabsTrigger, { value: "calendar", className: "p-2", title: "Calendar View", children: _jsx(Calendar, { className: "h-4 w-4" }) }), _jsx(TabsTrigger, { value: "kanban", className: "p-2", title: "Kanban View", children: _jsx(Layout, { className: "h-4 w-4" }) }), _jsx(TabsTrigger, { value: "table", className: "p-2", title: "Table View", children: _jsx(Table, { className: "h-4 w-4" }) })] }) })] }), _jsx("div", { className: "bg-white rounded-lg border border-gray-200 overflow-hidden", children: _jsxs(Tabs, { value: activeView, className: "w-full", children: [_jsx(TabsContent, { value: "calendar", className: "m-0", children: _jsx("div", { children: "Calendar View Placeholder" }) }), _jsx(TabsContent, { value: "kanban", className: "m-0", children: _jsx("div", { children: "Kanban View Placeholder" }) }), _jsx(TabsContent, { value: "table", className: "m-0", children: _jsx("div", { children: "Table View Placeholder" }) })] }) })] }) }) }));
};
