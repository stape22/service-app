import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { DashboardLayout } from '../templates/DashboardLayout';
import { Button } from '../atoms/Button';
import { JobsTable } from '../molecules/JobsTable';
import { AddJobForm } from '../molecules/AddJobForm';
import { useToast } from '../../context/ToastContext';
export const DashboardPage = () => {
    const [activeView, setActiveView] = useState('table');
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState('dashboard');
    const [showAddJobForm, setShowAddJobForm] = useState(false);
    const { showToast } = useToast();
    // Navigation handler for DashboardLayout
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    // Handler for edit job
    const handleEditJob = (jobId) => {
        showToast('info', `Edit Job clicked for ${jobId} (to be implemented)`);
    };
    // Handler for add job
    const handleAddJob = () => {
        setShowAddJobForm(true);
    };
    // Handler for close add job form
    const handleCloseAddJobForm = () => {
        setShowAddJobForm(false);
    };
    // Handler for job form submission
    const handleJobSubmit = (jobData) => {
        console.log('Job submitted:', jobData);
        setShowAddJobForm(false);
        showToast('success', 'Job created successfully!');
        // TODO: Implement actual job creation with Supabase
    };
    const renderViewContent = () => {
        switch (activeView) {
            case 'calendar':
                return (_jsxs("div", { className: "bg-white rounded-lg border border-gray-200 p-6", children: [_jsx("h3", { className: "text-lg font-medium text-gray-900 mb-4", children: "Calendar View" }), _jsxs("div", { className: "text-center py-12", children: [_jsx("div", { className: "text-gray-500 mb-4", children: _jsx("svg", { className: "mx-auto h-12 w-12", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" }) }) }), _jsx("p", { className: "text-gray-600", children: "Calendar view coming soon..." }), _jsx("p", { className: "text-sm text-gray-500 mt-2", children: "This will show jobs organized by date" })] })] }));
            case 'kanban':
                return (_jsxs("div", { className: "bg-white rounded-lg border border-gray-200 p-6", children: [_jsx("h3", { className: "text-lg font-medium text-gray-900 mb-4", children: "Kanban View" }), _jsxs("div", { className: "text-center py-12", children: [_jsx("div", { className: "text-gray-500 mb-4", children: _jsx("svg", { className: "mx-auto h-12 w-12", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" }) }) }), _jsx("p", { className: "text-gray-600", children: "Kanban view coming soon..." }), _jsx("p", { className: "text-sm text-gray-500 mt-2", children: "This will show jobs organized by status" })] })] }));
            case 'table':
                return (_jsxs("div", { className: "bg-white rounded-lg border border-gray-200 overflow-hidden", children: [_jsx("div", { className: "p-6 border-b border-gray-200", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h3", { className: "text-lg font-medium text-gray-900", children: "Jobs Table" }), _jsx(Button, { onClick: handleAddJob, className: "bg-blue-600 hover:bg-blue-700 text-white", children: "Add Job" })] }) }), _jsx(JobsTable, { onEditJob: handleEditJob })] }));
            default:
                return null;
        }
    };
    return (_jsxs(DashboardLayout, { currentPage: currentPage, onPageChange: handlePageChange, isChatOpen: isChatOpen, onChatToggle: () => setIsChatOpen((v) => !v), onChatClose: () => setIsChatOpen(false), children: [_jsx("main", { className: "px-6 lg:px-8 py-8", children: _jsxs("div", { className: "max-w-full mx-auto", children: [_jsxs("div", { className: "flex items-center justify-between mb-8", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-semibold text-gray-900", children: "Dashboard" }), _jsx("p", { className: "text-gray-600 mt-1", children: "Overview of your roofing jobs and schedule" })] }), _jsx("div", { className: "flex items-center space-x-2", children: _jsx("div", { className: "bg-white border border-gray-200 rounded-lg p-1", children: _jsxs("div", { className: "grid grid-cols-3 gap-1", children: [_jsx("button", { onClick: () => setActiveView('calendar'), className: `px-3 py-2 text-sm font-medium rounded-md transition-colors ${activeView === 'calendar'
                                                        ? 'bg-blue-100 text-blue-700'
                                                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`, title: "Calendar View", children: "Calendar" }), _jsx("button", { onClick: () => setActiveView('kanban'), className: `px-3 py-2 text-sm font-medium rounded-md transition-colors ${activeView === 'kanban'
                                                        ? 'bg-blue-100 text-blue-700'
                                                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`, title: "Kanban View", children: "Kanban" }), _jsx("button", { onClick: () => setActiveView('table'), className: `px-3 py-2 text-sm font-medium rounded-md transition-colors ${activeView === 'table'
                                                        ? 'bg-blue-100 text-blue-700'
                                                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`, title: "Table View", children: "Table" })] }) }) })] }), renderViewContent()] }) }), showAddJobForm && (_jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4", children: _jsxs("div", { className: "bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto", children: [_jsx("div", { className: "p-6 border-b border-gray-200", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h2", { className: "text-xl font-semibold text-gray-900", children: "Add New Job" }), _jsx("button", { onClick: handleCloseAddJobForm, className: "text-gray-400 hover:text-gray-600", children: _jsx("svg", { className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) }) })] }) }), _jsx("div", { className: "p-6", children: _jsx(AddJobForm, { onBack: handleCloseAddJobForm }) })] }) }))] }));
};
