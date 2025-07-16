import React, { useState } from 'react';
import { DashboardLayout } from '../templates/DashboardLayout';
import { Roofers } from '../organisms/Roofers';
import { LoadingSpinner } from '../atoms/LoadingSpinner';
import { useToast } from '../../context/ToastContext';
import type { RooferData } from '../organisms/Roofers';

export const RoofersPage: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('roofers');
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  // Handlers for navigation and chat
  const handlePageChange = (page: string) => setCurrentPage(page);

  // Placeholder handlers for add/edit roofer with loading states and error handling
  const handleAddRoofer = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      showToast('info', 'Add Roofer clicked (to be implemented)');
    } catch (error) {
      showToast('error', 'Failed to open add roofer form');
    } finally {
      setLoading(false);
    }
  };

  const handleEditRoofer = async (roofer: RooferData) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      showToast('info', `Edit Roofer clicked for ${roofer.fullName} (to be implemented)`);
    } catch (error) {
      showToast('error', 'Failed to load roofer details');
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
              <h1 className="text-2xl font-semibold text-gray-900">Roofers</h1>
              <p className="text-gray-600 mt-1">Manage all roofer profiles and their associated contacts</p>
            </div>
          </div>

          {/* Content Area */}
          {loading ? (
            <div className="bg-white rounded-lg border border-gray-200 p-12">
              <div className="text-center">
                <LoadingSpinner size="lg" className="mb-4" />
                <p className="text-gray-600">Loading roofer details...</p>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <Roofers onAddRoofer={handleAddRoofer} onEditRoofer={handleEditRoofer} />
            </div>
          )}
        </div>
      </main>
    </DashboardLayout>
  );
}; 