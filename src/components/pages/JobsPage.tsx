import React, { useState } from 'react';
import { DashboardLayout } from '../templates/DashboardLayout';
import { JobsTable } from '../molecules/JobsTable';

export const JobsPage: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('jobs');

  // Handlers for navigation and chat
  const handlePageChange = (page: string) => setCurrentPage(page);

  // Handler for edit job (stub for now)
  const handleEditJob = (jobId: string) => {
    alert(`Edit Job clicked for ${jobId} (to be implemented)`);
  };

  return (
    <DashboardLayout
      currentPage={currentPage}
      onPageChange={handlePageChange}
      isChatOpen={isChatOpen}
      onChatToggle={() => setIsChatOpen((v) => !v)}
      onChatClose={() => setIsChatOpen(false)}
    >
      <JobsTable onEditJob={handleEditJob} />
    </DashboardLayout>
  );
}; 