import React, { useState } from 'react';
import { DashboardLayout } from '../templates/DashboardLayout';
import { JobsTable } from '../molecules/JobsTable';
import { LoadingSpinner } from '../atoms/LoadingSpinner';
import { useToast } from '../../context/ToastContext';

export const JobsPage: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('jobs');
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  // Handlers for navigation and chat
  const handlePageChange = (page: string) => setCurrentPage(page);

  // Handler for edit job with loading state and error handling
  const handleEditJob = async (jobId: string) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      showToast('info', `Edit Job clicked for ${jobId} (to be implemented)`);
    } catch (error) {
      showToast('error', 'Failed to load job details');
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
              <h1 className="text-2xl font-semibold text-gray-900">Jobs</h1>
              <p className="text-gray-600 mt-1">Manage all roofing jobs and their status</p>
            </div>
          </div>

          {/* Content Area */}
          {loading ? (
            <div className="bg-white rounded-lg border border-gray-200 p-12">
              <div className="text-center">
                <LoadingSpinner size="lg" className="mb-4" />
                <p className="text-gray-600">Loading job details...</p>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <JobsTable onEditJob={handleEditJob} />
            </div>
          )}
        </div>
      </main>
    </DashboardLayout>
  );
}; 