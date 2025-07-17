import React, { useState } from 'react';
import { DashboardLayout } from '../templates/DashboardLayout';
import { Button } from '../atoms/Button';
import { Badge } from '../atoms/Badge';
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from '../atoms/Table';
import { Modal } from '../atoms/Modal';
import { ConfirmDialog } from '../atoms/ConfirmDialog';
import AddJobForm from '../molecules/AddJobForm';

// Updated JobData interface to match Figma design
export interface JobData {
  id: number;
  jobNumber: string;
  customerName: string;
  jobType: 'estimate' | 'install' | 'repair' | 'cleaning';
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  scheduledDate: string;
  estimatedCost: number;
  description: string;
  assignedRoofer?: string;
  customerAddress: string;
}

type SortField = 'jobNumber' | 'customerName' | 'jobType' | 'status' | 'priority' | 'scheduledDate' | 'estimatedCost';
type SortDirection = 'asc' | 'desc';

// Customer data with assigned roofers and addresses (from Figma)
const customersData = [
  { name: 'John Smith', assignedRoofer: 'Michael Rodriguez', address: '123 Main Street, Springfield, IL 62701' },
  { name: 'ABC Corporation', assignedRoofer: 'Sarah Johnson', address: '456 Business Ave, Chicago, IL 60601' },
  { name: 'Maria Garcia', assignedRoofer: 'David Thompson', address: '789 Oak Drive, Peoria, IL 61602' },
  { name: 'Tech Solutions Inc.', assignedRoofer: null, address: '321 Corporate Blvd, Rockford, IL 61101' },
  { name: 'Robert Johnson', assignedRoofer: 'Jennifer Martinez', address: '654 Pine Street, Decatur, IL 62521' }
];

const getJobTypeColor = (type: string) => {
  const colors = {
    'repair': 'bg-blue-100 text-blue-800 border-blue-200',
    'install': 'bg-orange-100 text-orange-800 border-orange-200',
    'estimate': 'bg-indigo-100 text-indigo-800 border-indigo-200',
    'cleaning': 'bg-purple-100 text-purple-800 border-purple-200'
  };
  return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
};

const getStatusColor = (status: string) => {
  const colors = {
    'scheduled': 'bg-blue-100 text-blue-800 border-blue-200',
    'in-progress': 'bg-orange-100 text-orange-800 border-orange-200',
    'completed': 'bg-green-100 text-green-800 border-green-200',
    'cancelled': 'bg-gray-100 text-gray-800 border-gray-200'
  };
  return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
};

const getPriorityColor = (priority: string) => {
  const colors = {
    'low': 'bg-gray-100 text-gray-800 border-gray-200',
    'medium': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'high': 'bg-orange-100 text-orange-800 border-orange-200',
    'urgent': 'bg-red-100 text-red-800 border-red-200'
  };
  return colors[priority as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
};

const formatJobType = (type: string) => {
  return type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ');
};

const formatStatus = (status: string) => {
  return status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ');
};

const formatPriority = (priority: string) => {
  return priority.charAt(0).toUpperCase() + priority.slice(1);
};

// Helper function to get assigned roofer for a customer
const getAssignedRoofer = (customerName: string) => {
  const customer = customersData.find(c => c.name === customerName);
  return customer?.assignedRoofer || null;
};

// Helper function to get customer address
const getCustomerAddress = (customerName: string) => {
  const customer = customersData.find(c => c.name === customerName);
  return customer?.address || 'Address not found';
};

// Mock jobs data matching Figma design
const jobsData: JobData[] = [
  {
    id: 1,
    jobNumber: 'JOB-2024-001',
    customerName: 'John Smith',
    jobType: 'repair',
    status: 'scheduled',
    priority: 'high',
    scheduledDate: '2024-01-25',
    estimatedCost: 2500,
    description: 'Roof leak repair - missing shingles on south side',
    customerAddress: '123 Main Street, Springfield, IL 62701'
  },
  {
    id: 2,
    jobNumber: 'JOB-2024-002',
    customerName: 'ABC Corporation',
    jobType: 'install',
    status: 'in-progress',
    priority: 'medium',
    scheduledDate: '2024-01-22',
    estimatedCost: 15000,
    description: 'Complete roof installation for new warehouse building',
    customerAddress: '456 Business Ave, Chicago, IL 60601'
  },
  {
    id: 3,
    jobNumber: 'JOB-2024-003',
    customerName: 'Maria Garcia',
    jobType: 'estimate',
    status: 'completed',
    priority: 'low',
    scheduledDate: '2024-01-20',
    estimatedCost: 300,
    description: 'Annual roof inspection and maintenance check',
    customerAddress: '789 Oak Drive, Peoria, IL 61602'
  },
  {
    id: 4,
    jobNumber: 'JOB-2024-004',
    customerName: 'Tech Solutions Inc.',
    jobType: 'cleaning',
    status: 'scheduled',
    priority: 'medium',
    scheduledDate: '2024-01-28',
    estimatedCost: 800,
    description: 'Gutter cleaning and minor shingle replacement',
    customerAddress: '321 Corporate Blvd, Rockford, IL 61101'
  },
  {
    id: 5,
    jobNumber: 'JOB-2024-005',
    customerName: 'Robert Johnson',
    jobType: 'repair',
    status: 'in-progress',
    priority: 'urgent',
    scheduledDate: '2024-01-24',
    estimatedCost: 4200,
    description: 'Emergency storm damage repair - multiple areas affected',
    customerAddress: '654 Pine Street, Decatur, IL 62521'
  }
];

function jobDataToInitialJob(job: JobData) {
  return {
    formData: {
      jobNumber: job.jobNumber,
      customer: job.customerName,
      jobType: job.jobType,
      status: job.status,
      priority: job.priority,
      estimatedCost: job.estimatedCost.toString(),
      description: job.description,
      notes: '',
    },
    scheduledDate: job.scheduledDate ? new Date(job.scheduledDate) : null,
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
  const [jobs, setJobs] = useState<JobData[]>(jobsData);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [jobToDelete, setJobToDelete] = useState<JobData | null>(null);
  const [sortField, setSortField] = useState<SortField>('jobNumber');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const handlePageChange = (page: string) => setCurrentPage(page);

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedJobs = [...jobs].sort((a, b) => {
    let aValue: string | number;
    let bValue: string | number;

    switch (sortField) {
      case 'jobNumber':
        aValue = a.jobNumber;
        bValue = b.jobNumber;
        break;
      case 'customerName':
        aValue = a.customerName;
        bValue = b.customerName;
        break;
      case 'jobType':
        aValue = a.jobType;
        bValue = b.jobType;
        break;
      case 'status':
        aValue = a.status;
        bValue = b.status;
        break;
      case 'priority':
        // Custom priority order
        const priorityOrder = { 'low': 1, 'medium': 2, 'high': 3, 'urgent': 4 };
        aValue = priorityOrder[a.priority];
        bValue = priorityOrder[b.priority];
        break;
      case 'scheduledDate':
        aValue = new Date(a.scheduledDate).getTime();
        bValue = new Date(b.scheduledDate).getTime();
        break;
      case 'estimatedCost':
        aValue = a.estimatedCost;
        bValue = b.estimatedCost;
        break;
      default:
        aValue = a.jobNumber;
        bValue = b.jobNumber;
    }

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    } else {
      return sortDirection === 'asc'
        ? (aValue as number) - (bValue as number)
        : (bValue as number) - (aValue as number);
    }
  });

  const SortIcon = ({ field }: { field: SortField }) => {
    return (
      <span className="inline-flex items-center justify-center w-4 h-4 ml-2">
        {sortField === field ? (
          sortDirection === 'asc' ? (
            <span aria-label="sorted ascending">▲</span>
          ) : (
            <span aria-label="sorted descending">▼</span>
          )
        ) : (
          <span className="text-gray-400 text-sm">↕</span>
        )}
      </span>
    );
  };

  const handleEditJob = (job: JobData) => {
    setEditJob(job);
    setShowEditJob(true);
  };

  const handleEditJobSubmit = (updated: any) => {
    if (!editJob) return;
    setJobs(jobs.map(j => j.id === editJob.id ? {
      ...j,
      jobNumber: updated.formData.jobNumber,
      customerName: updated.formData.customer,
      jobType: updated.formData.jobType,
      status: updated.formData.status,
      priority: updated.formData.priority,
      estimatedCost: parseFloat(updated.formData.estimatedCost) || 0,
      description: updated.formData.description,
      scheduledDate: updated.scheduledDate ? updated.scheduledDate.toISOString().split('T')[0] : j.scheduledDate,
    } : j));
    setShowEditJob(false);
    setEditJob(null);
  };

  const handleDeleteJob = (job: JobData) => {
    setJobToDelete(job);
    setShowDeleteDialog(true);
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
      <div className="bg-gray-50 min-h-screen">
        <main className="px-6 lg:px-8 py-8">
          <div className="max-w-full mx-auto">
            {/* Page Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">Jobs</h1>
                <p className="text-gray-600 mt-1">Manage all roofing jobs and their progress</p>
              </div>
              <Button 
                variant="default"
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => setShowAddJob(true)}
              >
                Add Job
              </Button>
            </div>

            {/* Jobs Table */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead 
                      className="font-medium text-gray-700 cursor-pointer hover:bg-gray-100 select-none"
                      onClick={() => handleSort('jobNumber')}
                    >
                      <div className="flex items-center justify-start">
                        Job Number
                        <SortIcon field="jobNumber" />
                      </div>
                    </TableHead>
                    <TableHead 
                      className="font-medium text-gray-700 cursor-pointer hover:bg-gray-100 select-none"
                      onClick={() => handleSort('customerName')}
                    >
                      <div className="flex items-center justify-start">
                        Customer
                        <SortIcon field="customerName" />
                      </div>
                    </TableHead>
                    <TableHead className="font-medium text-gray-700">
                      <div className="flex items-center justify-start">
                        Assigned Roofer
                        <span className="w-4 h-4 ml-2"></span>
                      </div>
                    </TableHead>
                    <TableHead 
                      className="font-medium text-gray-700 cursor-pointer hover:bg-gray-100 select-none"
                      onClick={() => handleSort('jobType')}
                    >
                      <div className="flex items-center justify-start">
                        Job Type
                        <SortIcon field="jobType" />
                      </div>
                    </TableHead>
                    <TableHead 
                      className="font-medium text-gray-700 cursor-pointer hover:bg-gray-100 select-none"
                      onClick={() => handleSort('status')}
                    >
                      <div className="flex items-center justify-start">
                        Status
                        <SortIcon field="status" />
                      </div>
                    </TableHead>
                    <TableHead 
                      className="font-medium text-gray-700 cursor-pointer hover:bg-gray-100 select-none"
                      onClick={() => handleSort('priority')}
                    >
                      <div className="flex items-center justify-start">
                        Priority
                        <SortIcon field="priority" />
                      </div>
                    </TableHead>
                    <TableHead 
                      className="font-medium text-gray-700 cursor-pointer hover:bg-gray-100 select-none"
                      onClick={() => handleSort('scheduledDate')}
                    >
                      <div className="flex items-center justify-start">
                        Scheduled Date
                        <SortIcon field="scheduledDate" />
                      </div>
                    </TableHead>
                    <TableHead className="font-medium text-gray-700">
                      <div className="flex items-center justify-start">
                        Job Location
                        <span className="w-4 h-4 ml-2"></span>
                      </div>
                    </TableHead>
                    <TableHead 
                      className="font-medium text-gray-700 cursor-pointer hover:bg-gray-100 select-none"
                      onClick={() => handleSort('estimatedCost')}
                    >
                      <div className="flex items-center justify-end">
                        Est. Cost
                        <SortIcon field="estimatedCost" />
                      </div>
                    </TableHead>
                    <TableHead className="font-medium text-gray-700">
                      <div className="flex items-center justify-center">
                        Actions
                        <span className="w-4 h-4 ml-2"></span>
                      </div>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedJobs.map((job) => {
                    const assignedRoofer = getAssignedRoofer(job.customerName);
                    
                    return (
                      <TableRow key={job.id} className="hover:bg-gray-50">
                        <TableCell>
                          <button 
                            className="text-blue-600 hover:text-blue-800 hover:underline text-left"
                            onClick={() => handleEditJob(job)}
                          >
                            {job.jobNumber}
                          </button>
                        </TableCell>
                        <TableCell className="text-gray-900">{job.customerName}</TableCell>
                        <TableCell>
                          {assignedRoofer ? (
                            <Badge
                              variant="outline"
                              className="text-xs px-2 py-1 bg-orange-100 text-orange-800 border-orange-200"
                            >
                              {assignedRoofer}
                            </Badge>
                          ) : (
                            <span className="text-gray-400 text-sm">No roofer assigned</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={`text-xs px-2 py-1 ${getJobTypeColor(job.jobType)}`}
                          >
                            {formatJobType(job.jobType)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={`text-xs px-2 py-1 ${getStatusColor(job.status)}`}
                          >
                            {formatStatus(job.status)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={`text-xs px-2 py-1 ${getPriorityColor(job.priority)}`}
                          >
                            {formatPriority(job.priority)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-gray-900">
                          {new Date(job.scheduledDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-gray-900 max-w-xs truncate">
                          {job.customerAddress}
                        </TableCell>
                        <TableCell className="text-right text-gray-900">
                          ${job.estimatedCost.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2 justify-center">
                            <Button
                              variant="secondary"
                              size="sm"
                              aria-label={`Edit job ${job.jobNumber}`}
                              onClick={() => handleEditJob(job)}
                              className="text-xs px-2 py-1"
                            >
                              ✏️
                            </Button>
                            <Button
                              variant="danger"
                              size="sm"
                              aria-label={`Delete job ${job.jobNumber}`}
                              onClick={() => handleDeleteJob(job)}
                              className="text-xs px-2 py-1"
                            >
                              🗑
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </div>
        </main>
      </div>

      {/* Management modals */}
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
        message={`Are you sure you want to delete job ${jobToDelete?.jobNumber}? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
      />
    </DashboardLayout>
  );
}; 