import React, { useState } from 'react';
import { DashboardLayout } from '../templates/DashboardLayout';
import { Customers } from '../organisms/Customers';
import { LoadingSpinner } from '../atoms/LoadingSpinner';
import { useToast } from '../../context/ToastContext';
import type { CustomerData } from '../organisms/Customers';

export const CustomersPage: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('customers');
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  // Handlers for navigation and chat
  const handlePageChange = (page: string) => setCurrentPage(page);

  // Placeholder handlers for add/edit customer with loading states and error handling
  const handleAddCustomer = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      showToast('info', 'Add Customer clicked (to be implemented)');
    } catch (error) {
      showToast('error', 'Failed to open add customer form');
    } finally {
      setLoading(false);
    }
  };

  const handleEditCustomer = async (customer: CustomerData) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      showToast('info', `Edit Customer clicked for ${customer.fullName} (to be implemented)`);
    } catch (error) {
      showToast('error', 'Failed to load customer details');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout
      currentPage={currentPage}
      onPageChange={handlePageChange}
      isChatOpen={isChatOpen}
      onChatToggle={() => setIsChatOpen((v) => !v)}
      onChatClose={() => setIsChatOpen(false)}
    >
      <main className="px-6 lg:px-8 py-8">
        <div className="max-w-full mx-auto">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Customers</h1>
              <p className="text-gray-600 mt-1">Manage all customer profiles and their associated jobs</p>
            </div>
          </div>

          {/* Content Area */}
          {loading ? (
            <div className="bg-white rounded-lg border border-gray-200 p-12">
              <div className="text-center">
                <LoadingSpinner size="lg" className="mb-4" />
                <p className="text-gray-600">Loading customer details...</p>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <Customers onAddCustomer={handleAddCustomer} onEditCustomer={handleEditCustomer} />
            </div>
          )}
        </div>
      </main>
    </DashboardLayout>
  );
}; 