import React, { useState } from 'react';
import { DashboardLayout } from '../templates/DashboardLayout';
import type { JobData } from '../molecules/JobsTable';
import AddJobForm from '../molecules/AddJobForm';
import { Button } from '../atoms/Button';
import { Modal } from '../atoms/Modal';
import { ConfirmDialog } from '../atoms/ConfirmDialog';

function jobDataToInitialJob(job: JobData) {
  return {
    formData: {
      jobNumber: job.id,
      customer: job.customer,
      jobType: job.jobType.toLowerCase(),
      status: job.status,
      priority: 'medium',
      estimatedCost: '',
      description: '',
      notes: '',
    },
    scheduledDate: job.date ? new Date(job.date) : null,
    roofingSpecs: {
      gutterTotalFootage: '',
      gutterType: '',
      gutterColor: '',
      gutterSpecialtyItems: '',
      downspoutSize: '',
      leafGuardSize: '',
      leafGuardTotalFootage: '',
      leafGuardType: '',
      storyOptions: [],
      crewCount: '',
      timeFrame: '',
    },
  };
}

export const JobsPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('jobs');
  const [showAddJob, setShowAddJob] = useState(false);
  const [showEditJob, setShowEditJob] = useState(false);
  const [editJob, setEditJob] = useState<JobData | null>(null);
  const [jobs, setJobs] = useState<JobData[]>([
    { id: '#318', date: 'June 4, 2025', jobType: 'Install', status: 'scheduled', roofer: 'Mike Johnson', address: '1234 Oak Street', customer: 'John Smith' },
    { id: '#319', date: 'June 5, 2025', jobType: 'Repair', status: 'to-schedule', roofer: 'Sarah Williams', address: '567 Pine Avenue', customer: 'Emily Davis' },
    { id: '#320', date: 'June 5, 2025', jobType: 'Estimate', status: 'completed', roofer: 'David Chen', address: '890 Maple Drive', customer: 'Robert Johnson' },
    { id: '#321', date: 'June 6, 2025', jobType: 'Install', status: 'in-progress', roofer: 'James Wilson', address: '123 Elm Court', customer: 'Patricia Brown' },
    { id: '#322', date: 'June 7, 2025', jobType: 'Repair', status: 'scheduled', roofer: 'Lisa Martinez', address: '456 Cedar Lane', customer: 'Michael Wilson' },
    { id: '#323', date: 'June 8, 2025', jobType: 'Cleaning', status: 'to-schedule', roofer: 'Thomas Anderson', address: '789 Birch Street', customer: 'Jennifer Taylor' },
  ]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [jobToDelete, setJobToDelete] = useState<JobData | null>(null);

  const handlePageChange = (page: string) => setCurrentPage(page);

  const handleEditJob = (jobId: string) => {
    const job = jobs.find(j => j.id === jobId);
    if (job) {
      setEditJob(job);
      setShowEditJob(true);
    }
  };

  const handleEditJobSubmit = (updated: any) => {
    if (!editJob) return;
    setJobs(jobs.map(j => j.id === editJob.id ? {
      ...j,
      ...updated.formData,
      date: updated.scheduledDate ? updated.scheduledDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : j.date,
    } : j));
    setShowEditJob(false);
    setEditJob(null);
  };

  const handleDeleteJob = (jobId: string) => {
    const job = jobs.find(j => j.id === jobId);
    if (job) {
      setJobToDelete(job);
      setShowDeleteDialog(true);
    }
  };

  const confirmDeleteJob = () => {
    if (jobToDelete) {
      setJobs(jobs.filter(j => j.id !== jobToDelete.id));
      setShowDeleteDialog(false);
      setJobToDelete(null);
    }
  };

  return (
    <DashboardLayout
      currentPage={currentPage}
      onPageChange={handlePageChange}
    >
      <div className="flex justify-between items-center mb-4">
        <Button variant="default" onClick={() => setShowAddJob(true)} aria-label="Add Job">
          + Add Job
        </Button>
      </div>
      {/* Management modals only, no job views */}
      <Modal isOpen={showAddJob} onClose={() => setShowAddJob(false)} title="Add Job">
        <AddJobForm onBack={() => setShowAddJob(false)} />
      </Modal>
      <Modal isOpen={showEditJob} onClose={() => { setShowEditJob(false); setEditJob(null); }} title="Edit Job">
        {editJob && (
          <AddJobForm
            onBack={() => { setShowEditJob(false); setEditJob(null); }}
            initialJob={jobDataToInitialJob(editJob)}
            onSubmit={handleEditJobSubmit}
          />
        )}
      </Modal>
      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={confirmDeleteJob}
        title="Delete Job"
        message={`Are you sure you want to delete job ${jobToDelete?.id}? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
      />
    </DashboardLayout>
  );
}; 