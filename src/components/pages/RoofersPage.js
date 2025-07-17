import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { DashboardLayout } from '../templates/DashboardLayout';
import { Roofers } from '../organisms/Roofers';
import { AddRooferForm } from '../molecules/AddRooferForm';
import { Modal } from '../atoms/Modal';
import { EditRooferForm } from '../molecules/EditRooferForm';
const initialRoofers = [
    {
        id: 1,
        fullName: 'Michael Rodriguez',
        email: 'michael.r@example.com',
        phone: '(555) 123-4567',
        address: '1234 Oak Street',
        availability: 'full-time',
        certifications: ['Licensed', 'Insured'],
        contactCount: 3
    },
    {
        id: 2,
        fullName: 'Sarah Johnson',
        email: 'sarah.j@example.com',
        phone: '(555) 987-6543',
        address: '1234 Oak Street',
        availability: 'part-time',
        certifications: ['Licensed', 'Insured', 'Bonded'],
        contactCount: 2
    },
    {
        id: 3,
        fullName: 'David Thompson',
        email: 'david.t@example.com',
        phone: '(555) 234-5678',
        address: '1234 Oak Street',
        availability: 'full-time',
        certifications: ['Licensed'],
        contactCount: 0
    },
    {
        id: 4,
        fullName: 'Jennifer Martinez',
        email: 'jennifer.m@example.com',
        phone: '(555) 345-6789',
        address: '1234 Oak Street',
        availability: 'full-time',
        certifications: ['Licensed', 'Insured'],
        contactCount: 1
    },
    {
        id: 5,
        fullName: 'Robert Wilson',
        email: 'robert.w@example.com',
        phone: '(555) 456-7890',
        address: '1234 Oak Street',
        availability: 'part-time',
        certifications: ['Licensed', 'Insured'],
        contactCount: 4
    }
];
export const RoofersPage = () => {
    const [currentPage, setCurrentPage] = useState('roofers');
    const [showAddRoofer, setShowAddRoofer] = useState(false);
    const [showEditRoofer, setShowEditRoofer] = useState(false);
    const [rooferToEdit, setRooferToEdit] = useState(null);
    const [roofers, setRoofers] = useState(initialRoofers);
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
    const handleDeleteRoofer = (id) => {
        setRoofers(prev => prev.filter(r => r.id !== id));
        setShowEditRoofer(false);
    };
    return (_jsxs(DashboardLayout, { currentPage: currentPage, onPageChange: handlePageChange, children: [_jsx(Roofers, { roofers: roofers, onAddRoofer: handleAddRoofer, onEditRoofer: handleEditRoofer, onDeleteRoofer: handleDeleteRoofer }), _jsx(Modal, { isOpen: showAddRoofer, onClose: () => setShowAddRoofer(false), title: "Add Roofer", children: _jsx(AddRooferForm, { onBack: () => setShowAddRoofer(false) }) }), _jsx(Modal, { isOpen: showEditRoofer, onClose: () => setShowEditRoofer(false), title: "Edit Roofer", children: rooferToEdit && (_jsx(EditRooferForm, { roofer: rooferToEdit, onBack: () => setShowEditRoofer(false), onSubmit: () => setShowEditRoofer(false), onDelete: handleDeleteRoofer })) })] }));
};
