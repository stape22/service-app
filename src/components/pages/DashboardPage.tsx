import React, { useState } from 'react';
import { DashboardLayout } from '../templates/DashboardLayout';
import { Button } from '../atoms/Button';
import { JobsTable } from '../molecules/JobsTable';
import { AddJobForm } from '../molecules/AddJobForm';
import { useToast } from '../../context/ToastContext';

export const DashboardPage: React.FC = () => {
  const [activeView, setActiveView] = useState<'calendar' | 'kanban' | 'table'>('table');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [showAddJobForm, setShowAddJobForm] = useState(false);
  const { showToast } = useToast();

  // Navigation handler for DashboardLayout
  const handlePageChange = (page: string) => {
    setCurrentPage(page);
  };

  // Handler for edit job
  const handleEditJob = (jobId: string) => {
    showToast('info', `Edit Job clicked for ${jobId} (to be implemented)`);
  };

  // Handler for add job
  const handleAddJob = () => {
    setShowAddJobForm(true);
  };

  // Handler for close add job form
  const handleCloseAddJobForm = () => {
    setShowAddJobForm(false);
  };

  // Handler for job form submission
  const handleJobSubmit = (jobData: any) => {
    console.log('Job submitted:', jobData);
    setShowAddJobForm(false);
    showToast('success', 'Job created successfully!');
    // TODO: Implement actual job creation with Supabase
  };

  const renderViewContent = () => {
    switch (activeView) {
      case 'calendar':
        return (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Calendar View</h3>
            <div className="text-center py-12">
              <div className="text-gray-500 mb-4">
                <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-gray-600">Calendar view coming soon...</p>
              <p className="text-sm text-gray-500 mt-2">This will show jobs organized by date</p>
            </div>
          </div>
        );
      case 'kanban':
        return (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Kanban View</h3>
            <div className="text-center py-12">
              <div className="text-gray-500 mb-4">
                <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <p className="text-gray-600">Kanban view coming soon...</p>
              <p className="text-sm text-gray-500 mt-2">This will show jobs organized by status</p>
            </div>
          </div>
        );
      case 'table':
        return (
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Jobs Table</h3>
                <Button 
                  onClick={handleAddJob}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Add Job
                </Button>
              </div>
            </div>
            <JobsTable onEditJob={handleEditJob} />
          </div>
        );
      default:
        return null;
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
              <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-1">Overview of your roofing jobs and schedule</p>
            </div>
            {/* View Toggle */}
            <div className="flex items-center space-x-2">
              <div className="bg-white border border-gray-200 rounded-lg p-1">
                <div className="grid grid-cols-3 gap-1">
                  <button
                    onClick={() => setActiveView('calendar')}
                    className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      activeView === 'calendar'
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                    }`}
                    title="Calendar View"
                  >
                    Calendar
                  </button>
                  <button
                    onClick={() => setActiveView('kanban')}
                    className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      activeView === 'kanban'
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                    }`}
                    title="Kanban View"
                  >
                    Kanban
                  </button>
                  <button
                    onClick={() => setActiveView('table')}
                    className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      activeView === 'table'
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                    }`}
                    title="Table View"
                  >
                    Table
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Content Area */}
          {renderViewContent()}
        </div>
      </main>

      {/* Add Job Modal */}
      {showAddJobForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Add New Job</h2>
                <button
                  onClick={handleCloseAddJobForm}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-6">
              <AddJobForm onBack={handleCloseAddJobForm} />
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}; 