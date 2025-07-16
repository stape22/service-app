import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { DashboardLayout } from '../templates/DashboardLayout';
import { JobsTable } from '../molecules/JobsTable';
import AddJobForm from '../molecules/AddJobForm';
import { Button } from '../atoms/Button';
import { Modal } from '../atoms/Modal';
import { ConfirmDialog } from '../atoms/ConfirmDialog';
import { JobsCalendar } from '../organisms/JobsCalendar';
// Helper to convert JobData to AddJobForm initialJob shape
function jobDataToInitialJob(job) {
    return {
        formData: {
            jobNumber: job.id,
            customer: job.customer,
            jobType: job.jobType.toLowerCase(),
            status: job.status,
            priority: 'medium', // Default, as not in JobData
            estimatedCost: '', // Not in JobData
            description: '', // Not in JobData
            notes: '', // Not in JobData
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
export const JobsPage = () => {
    const [currentPage, setCurrentPage] = useState('jobs');
    const [showAddJob, setShowAddJob] = useState(false);
    const [showEditJob, setShowEditJob] = useState(false);
    const [editJob, setEditJob] = useState(null);
    const [jobs, setJobs] = useState([
        { id: '#318', date: 'June 4, 2025', jobType: 'Install', status: 'scheduled', roofer: 'Mike Johnson', address: '1234 Oak Street', customer: 'John Smith' },
        { id: '#319', date: 'June 5, 2025', jobType: 'Repair', status: 'to-schedule', roofer: 'Sarah Williams', address: '567 Pine Avenue', customer: 'Emily Davis' },
        { id: '#320', date: 'June 5, 2025', jobType: 'Estimate', status: 'completed', roofer: 'David Chen', address: '890 Maple Drive', customer: 'Robert Johnson' },
        { id: '#321', date: 'June 6, 2025', jobType: 'Install', status: 'in-progress', roofer: 'James Wilson', address: '123 Elm Court', customer: 'Patricia Brown' },
        { id: '#322', date: 'June 7, 2025', jobType: 'Repair', status: 'scheduled', roofer: 'Lisa Martinez', address: '456 Cedar Lane', customer: 'Michael Wilson' },
        { id: '#323', date: 'June 8, 2025', jobType: 'Cleaning', status: 'to-schedule', roofer: 'Thomas Anderson', address: '789 Birch Street', customer: 'Jennifer Taylor' },
    ]);
    const [view, setView] = useState('table');
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [jobToDelete, setJobToDelete] = useState(null);
    // Handlers for navigation
    const handlePageChange = (page) => setCurrentPage(page);
    // Handler for edit job
    const handleEditJob = (jobId) => {
        const job = jobs.find(j => j.id === jobId);
        if (job) {
            setEditJob(job);
            setShowEditJob(true);
        }
    };
    // Handler for saving edited job
    const handleEditJobSubmit = (updated) => {
        if (!editJob)
            return;
        setJobs(jobs.map(j => j.id === editJob.id ? {
            ...j,
            ...updated.formData,
            date: updated.scheduledDate ? updated.scheduledDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : j.date,
        } : j));
        setShowEditJob(false);
        setEditJob(null);
    };
    const handleDeleteJob = (jobId) => {
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
    // Helper to convert JobData[] to JobsCalendar.Job[]
    const jobsForCalendar = jobs.map(j => ({
        id: j.id,
        title: j.jobType,
        type: j.jobType.toLowerCase(),
        date: new Date(j.date),
    }));
    return (_jsxs(DashboardLayout, { currentPage: currentPage, onPageChange: handlePageChange, children: [_jsxs("div", { className: "flex justify-between items-center mb-4", children: [_jsx(Button, { variant: "default", onClick: () => setShowAddJob(true), "aria-label": "Add Job", children: "+ Add Job" }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Button, { variant: view === 'table' ? 'default' : 'outline', size: "sm", onClick: () => setView('table'), children: "Table View" }), _jsx(Button, { variant: view === 'calendar' ? 'default' : 'outline', size: "sm", onClick: () => setView('calendar'), children: "Calendar View" })] })] }), view === 'table' ? (_jsx(JobsTable, { onEditJob: handleEditJob, onDeleteJob: handleDeleteJob, jobs: jobs })) : (_jsx(JobsCalendar, { jobs: jobsForCalendar })), _jsx(Modal, { isOpen: showAddJob, onClose: () => setShowAddJob(false), title: "Add Job", children: _jsx(AddJobForm, { onBack: () => setShowAddJob(false) }) }), _jsx(Modal, { isOpen: showEditJob, onClose: () => { setShowEditJob(false); setEditJob(null); }, title: "Edit Job", children: editJob && (_jsx(AddJobForm, { onBack: () => { setShowEditJob(false); setEditJob(null); }, initialJob: jobDataToInitialJob(editJob), onSubmit: handleEditJobSubmit })) }), _jsx(ConfirmDialog, { isOpen: showDeleteDialog, onClose: () => setShowDeleteDialog(false), onConfirm: confirmDeleteJob, title: "Delete Job", message: `Are you sure you want to delete job ${jobToDelete?.id}? This action cannot be undone.`, confirmText: "Delete", cancelText: "Cancel", variant: "danger" })] }));
};
