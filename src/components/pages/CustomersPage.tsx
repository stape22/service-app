import { useState } from 'react';
import { DashboardLayout } from '../templates/DashboardLayout';
import { Customers } from '../organisms/Customers';

export const CustomersPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('customers');

  // Handlers for navigation and chat
  const handlePageChange = (page: string) => setCurrentPage(page);

  // Placeholder handlers for add/edit customer (to be implemented in future tasks)
  const handleAddCustomer = () => {
    // TODO: Implement add customer flow
    alert('Add Customer clicked (to be implemented)');
  };
  const handleEditCustomer = () => {
    // TODO: Implement edit customer flow
    alert('Edit Customer clicked (to be implemented)');
  };

  return (
    <DashboardLayout
      currentPage={currentPage}
      onPageChange={handlePageChange}
      // Removed isChatOpen, onChatToggle, onChatClose props as they are not defined in DashboardLayoutProps
    >
      <Customers onAddCustomer={handleAddCustomer} onEditCustomer={handleEditCustomer} />
    </DashboardLayout>
  );
}; 