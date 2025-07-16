import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from 'react';
import { DashboardLayout } from '../templates/DashboardLayout';
import { Customers } from '../organisms/Customers';
export const CustomersPage = () => {
    const [currentPage, setCurrentPage] = useState('customers');
    // Handlers for navigation and chat
    const handlePageChange = (page) => setCurrentPage(page);
    // Placeholder handlers for add/edit customer (to be implemented in future tasks)
    const handleAddCustomer = () => {
        // TODO: Implement add customer flow
        alert('Add Customer clicked (to be implemented)');
    };
    const handleEditCustomer = () => {
        // TODO: Implement edit customer flow
        alert('Edit Customer clicked (to be implemented)');
    };
    return (_jsx(DashboardLayout, { currentPage: currentPage, onPageChange: handlePageChange, children: _jsx(Customers, { onAddCustomer: handleAddCustomer, onEditCustomer: handleEditCustomer }) }));
};
