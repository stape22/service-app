import React, { useState } from 'react';
import { DashboardLayout } from '../templates/DashboardLayout';
import { Roofers } from '../organisms/Roofers';
import type { RooferData } from '../organisms/Roofers';

export const RoofersPage: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('roofers');

  // Handlers for navigation and chat
  const handlePageChange = (page: string) => setCurrentPage(page);

  // Placeholder handlers for add/edit roofer (to be implemented in future tasks)
  const handleAddRoofer = () => {
    // TODO: Implement add roofer flow
    alert('Add Roofer clicked (to be implemented)');
  };
  const handleEditRoofer = (roofer: RooferData) => {
    // TODO: Implement edit roofer flow
    alert('Edit Roofer clicked (to be implemented)');
  };

  return (
    <DashboardLayout
      currentPage={currentPage}
      onPageChange={handlePageChange}
      isChatOpen={isChatOpen}
      onChatToggle={() => setIsChatOpen((v) => !v)}
      onChatClose={() => setIsChatOpen(false)}
    >
      <Roofers onAddRoofer={handleAddRoofer} onEditRoofer={handleEditRoofer} />
    </DashboardLayout>
  );
}; 