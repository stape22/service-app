import React, { useState } from 'react';
import { DashboardLayout } from '../templates/DashboardLayout';
import { Jobs } from '../../../Figma Design/components/Jobs';

export const JobsPage: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('jobs');

  // Handlers for navigation and chat
  const handlePageChange = (page: string) => setCurrentPage(page);

  // Placeholder handlers for add/edit job (to be implemented in future tasks)
  const handleAddJob = () => {
    // TODO: Implement add job flow
    alert('Add Job clicked (to be implemented)');
  };
  const handleEditJob = (job: any) => {
    // TODO: Implement edit job flow
    alert('Edit Job clicked (to be implemented)');
  };

  return (
    <DashboardLayout
      currentPage={currentPage}
      onPageChange={handlePageChange}
      isChatOpen={isChatOpen}
      onChatToggle={() => setIsChatOpen((v) => !v)}
      onChatClose={() => setIsChatOpen(false)}
    >
      <Jobs onAddJob={handleAddJob} onEditJob={handleEditJob} />
    </DashboardLayout>
  );
}; 