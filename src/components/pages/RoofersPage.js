import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { DashboardLayout } from '../templates/DashboardLayout';
import { Roofers } from '../organisms/Roofers';
import { AddRooferForm } from '../molecules/AddRooferForm';
import { Modal } from '../atoms/Modal';
import { EditRooferForm } from '../molecules/EditRooferForm';
export const RoofersPage = () => {
    const [currentPage, setCurrentPage] = useState('roofers');
    const [showAddRoofer, setShowAddRoofer] = useState(false);
    const [showEditRoofer, setShowEditRoofer] = useState(false);
    const [rooferToEdit, setRooferToEdit] = useState(null);
    // Handlers for navigation and chat
    const handlePageChange = (page) => setCurrentPage(page);
    // Placeholder handlers for add/edit roofer (to be implemented in future tasks)
    const handleAddRoofer = () => {
        setShowAddRoofer(true);
    };
    const handleEditRoofer = (roofer) => {
        setRooferToEdit(roofer);
        setShowEditRoofer(true);
    };
    return (_jsxs(DashboardLayout, { currentPage: currentPage, onPageChange: handlePageChange, children: [_jsx(Roofers, { onAddRoofer: handleAddRoofer, onEditRoofer: handleEditRoofer }), _jsx(Modal, { isOpen: showAddRoofer, onClose: () => setShowAddRoofer(false), title: "Add Roofer", children: _jsx(AddRooferForm, { onBack: () => setShowAddRoofer(false) }) }), _jsx(Modal, { isOpen: showEditRoofer, onClose: () => setShowEditRoofer(false), title: "Edit Roofer", children: rooferToEdit && (_jsx(EditRooferForm, { roofer: rooferToEdit, onBack: () => setShowEditRoofer(false), onSubmit: () => setShowEditRoofer(false), onDelete: () => setShowEditRoofer(false) })) })] }));
};
