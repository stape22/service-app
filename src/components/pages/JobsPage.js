import { jsx as _jsx } from "react/jsx-runtime";
import React, { useState } from 'react';
import { DashboardLayout } from '../templates/DashboardLayout';
import { JobsTable } from '../molecules/JobsTable';
export const JobsPage = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState('jobs');
    // Handlers for navigation and chat
    const handlePageChange = (page) => setCurrentPage(page);
    // Handler for edit job (stub for now)
    const handleEditJob = (jobId) => {
        alert(`Edit Job clicked for ${jobId} (to be implemented)`);
    };
    return (_jsx(DashboardLayout, { currentPage: currentPage, onPageChange: handlePageChange, isChatOpen: isChatOpen, onChatToggle: () => setIsChatOpen((v) => !v), onChatClose: () => setIsChatOpen(false), children: _jsx(JobsTable, { onEditJob: handleEditJob }) }));
};
