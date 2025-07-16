import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { DashboardLayout } from '../templates/DashboardLayout';
import { JobsTable } from '../molecules/JobsTable';
import { LoadingSpinner } from '../atoms/LoadingSpinner';
import { useToast } from '../../context/ToastContext';
export const JobsPage = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState('jobs');
    const [loading, setLoading] = useState(false);
    const { showToast } = useToast();
    // Handlers for navigation and chat
    const handlePageChange = (page) => setCurrentPage(page);
    // Handler for edit job with loading state and error handling
    const handleEditJob = async (jobId) => {
        setLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            showToast('info', `Edit Job clicked for ${jobId} (to be implemented)`);
        }
        catch (error) {
            showToast('error', 'Failed to load job details');
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsx(DashboardLayout, { currentPage: currentPage, onPageChange: handlePageChange, isChatOpen: isChatOpen, onChatToggle: () => setIsChatOpen((v) => !v), onChatClose: () => setIsChatOpen(false), children: _jsx("main", { className: "px-6 lg:px-8 py-8", children: _jsxs("div", { className: "max-w-full mx-auto", children: [_jsx("div", { className: "flex items-center justify-between mb-8", children: _jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-semibold text-gray-900", children: "Jobs" }), _jsx("p", { className: "text-gray-600 mt-1", children: "Manage all roofing jobs and their status" })] }) }), loading ? (_jsx("div", { className: "bg-white rounded-lg border border-gray-200 p-12", children: _jsxs("div", { className: "text-center", children: [_jsx(LoadingSpinner, { size: "lg", className: "mb-4" }), _jsx("p", { className: "text-gray-600", children: "Loading job details..." })] }) })) : (_jsx("div", { className: "bg-white rounded-lg border border-gray-200 overflow-hidden", children: _jsx(JobsTable, { onEditJob: handleEditJob }) }))] }) }) }));
};
