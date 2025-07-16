import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { DashboardLayout } from '../templates/DashboardLayout';
import { Roofers } from '../organisms/Roofers';
import { LoadingSpinner } from '../atoms/LoadingSpinner';
import { useToast } from '../../context/ToastContext';
export const RoofersPage = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState('roofers');
    const [loading, setLoading] = useState(false);
    const { showToast } = useToast();
    // Handlers for navigation and chat
    const handlePageChange = (page) => setCurrentPage(page);
    // Placeholder handlers for add/edit roofer with loading states and error handling
    const handleAddRoofer = async () => {
        setLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            showToast('info', 'Add Roofer clicked (to be implemented)');
        }
        catch (error) {
            showToast('error', 'Failed to open add roofer form');
        }
        finally {
            setLoading(false);
        }
    };
    const handleEditRoofer = async (roofer) => {
        setLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            showToast('info', `Edit Roofer clicked for ${roofer.fullName} (to be implemented)`);
        }
        catch (error) {
            showToast('error', 'Failed to load roofer details');
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsx(DashboardLayout, { currentPage: currentPage, onPageChange: handlePageChange, isChatOpen: isChatOpen, onChatToggle: () => setIsChatOpen((v) => !v), onChatClose: () => setIsChatOpen(false), children: _jsx("main", { className: "px-6 lg:px-8 py-8", children: _jsxs("div", { className: "max-w-full mx-auto", children: [_jsx("div", { className: "flex items-center justify-between mb-8", children: _jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-semibold text-gray-900", children: "Roofers" }), _jsx("p", { className: "text-gray-600 mt-1", children: "Manage all roofer profiles and their associated contacts" })] }) }), loading ? (_jsx("div", { className: "bg-white rounded-lg border border-gray-200 p-12", children: _jsxs("div", { className: "text-center", children: [_jsx(LoadingSpinner, { size: "lg", className: "mb-4" }), _jsx("p", { className: "text-gray-600", children: "Loading roofer details..." })] }) })) : (_jsx("div", { className: "bg-white rounded-lg border border-gray-200 overflow-hidden", children: _jsx(Roofers, { onAddRoofer: handleAddRoofer, onEditRoofer: handleEditRoofer }) }))] }) }) }));
};
