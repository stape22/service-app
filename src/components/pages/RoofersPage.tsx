import React, { useState } from 'react';
import { DashboardLayout } from '../templates/DashboardLayout';
import { Roofers } from '../organisms/Roofers';
import type { RooferData } from '../organisms/Roofers';
import { AddRooferForm } from '../molecules/AddRooferForm';
import { Modal } from '../atoms/Modal';
import { EditRooferForm } from '../molecules/EditRooferForm';

export const RoofersPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('roofers');
  const [showAddRoofer, setShowAddRoofer] = useState(false);
  const [showEditRoofer, setShowEditRoofer] = useState(false);
  const [rooferToEdit, setRooferToEdit] = useState<RooferData | null>(null);

  // Handlers for navigation and chat
  const handlePageChange = (page: string) => setCurrentPage(page);

  // Placeholder handlers for add/edit roofer (to be implemented in future tasks)
  const handleAddRoofer = () => {
    setShowAddRoofer(true);
  };
  const handleEditRoofer = (roofer: RooferData) => {
    setRooferToEdit(roofer);
    setShowEditRoofer(true);
  };

  return (
    <DashboardLayout
      currentPage={currentPage}
      onPageChange={handlePageChange}
    >
      <Roofers onAddRoofer={handleAddRoofer} onEditRoofer={handleEditRoofer} />
      <Modal isOpen={showAddRoofer} onClose={() => setShowAddRoofer(false)} title="Add Roofer">
        <AddRooferForm onBack={() => setShowAddRoofer(false)} />
      </Modal>
      <Modal isOpen={showEditRoofer} onClose={() => setShowEditRoofer(false)} title="Edit Roofer">
        {rooferToEdit && (
          <EditRooferForm
            roofer={rooferToEdit}
            onBack={() => setShowEditRoofer(false)}
            onSubmit={() => setShowEditRoofer(false)}
            onDelete={() => setShowEditRoofer(false)}
          />
        )}
      </Modal>
    </DashboardLayout>
  );
}; 