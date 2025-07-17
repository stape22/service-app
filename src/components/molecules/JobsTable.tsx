import React, { useState } from 'react';
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from '../atoms/Table';
import { Badge } from '../atoms/Badge';
import { Button } from '../atoms/Button';

export interface JobData {
  id: string;
  date: string;
  jobType: string;
  status: 'scheduled' | 'to-schedule' | 'completed' | 'in-progress';
  roofer: string;
  address: string;
  customer: string;
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  estimatedCost?: number;
}

interface JobsTableProps {
  onEditJob?: (jobId: string) => void;
  onDeleteJob?: (jobId: string) => void;
  jobs?: JobData[];
}

const jobsData: JobData[] = [
  { id: '#318', date: 'June 4, 2025', jobType: 'Install', status: 'scheduled', roofer: 'Mike Johnson', address: '1234 Oak Street', customer: 'John Smith', priority: 'high', estimatedCost: 15000 },
  { id: '#319', date: 'June 5, 2025', jobType: 'Repair', status: 'to-schedule', roofer: 'Sarah Williams', address: '567 Pine Avenue', customer: 'Emily Davis', priority: 'medium', estimatedCost: 2500 },
  { id: '#320', date: 'June 5, 2025', jobType: 'Estimate', status: 'completed', roofer: 'David Chen', address: '890 Maple Drive', customer: 'Robert Johnson', priority: 'low', estimatedCost: 300 },
  { id: '#321', date: 'June 6, 2025', jobType: 'Install', status: 'in-progress', roofer: 'James Wilson', address: '123 Elm Court', customer: 'Patricia Brown', priority: 'high', estimatedCost: 18000 },
  { id: '#322', date: 'June 7, 2025', jobType: 'Repair', status: 'scheduled', roofer: 'Lisa Martinez', address: '456 Cedar Lane', customer: 'Michael Wilson', priority: 'urgent', estimatedCost: 4200 },
  { id: '#323', date: 'June 8, 2025', jobType: 'Cleaning', status: 'to-schedule', roofer: 'Thomas Anderson', address: '789 Birch Street', customer: 'Jennifer Taylor', priority: 'medium', estimatedCost: 800 },
];

type SortField = keyof JobData;
type SortDirection = 'asc' | 'desc';

const getJobTypeColor = (type: string) => {
  const colors = {
    'repair': 'bg-blue-100 text-blue-800 border-blue-200',
    'install': 'bg-orange-100 text-orange-800 border-orange-200',
    'estimate': 'bg-indigo-100 text-indigo-800 border-indigo-200',
    'cleaning': 'bg-purple-100 text-purple-800 border-purple-200'
  };
  return colors[type.toLowerCase() as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
};

const getStatusColor = (status: string) => {
  const colors = {
    'scheduled': 'bg-blue-100 text-blue-800 border-blue-200',
    'to-schedule': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'completed': 'bg-green-100 text-green-800 border-green-200',
    'in-progress': 'bg-orange-100 text-orange-800 border-orange-200'
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

export const JobsTable: React.FC<JobsTableProps> = ({ onEditJob, onDeleteJob, jobs }) => {
  const [sortField, setSortField] = useState<SortField>('id');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedJobs = [...(jobs || jobsData)].sort((a, b) => {
    let aValue: string | number = a[sortField];
    let bValue: string | number = b[sortField];
    
    if (sortField === 'id') {
      aValue = parseInt(a.id.replace('#', ''));
      bValue = parseInt(b.id.replace('#', ''));
    }
    if (sortField === 'date') {
      aValue = new Date(a.date).getTime();
      bValue = new Date(b.date).getTime();
    }
    if (sortField === 'priority') {
      const priorityOrder = { 'low': 1, 'medium': 2, 'high': 3, 'urgent': 4 };
      aValue = priorityOrder[a.priority || 'medium'];
      bValue = priorityOrder[b.priority || 'medium'];
    }
    if (sortField === 'estimatedCost') {
      aValue = a.estimatedCost || 0;
      bValue = b.estimatedCost || 0;
    }
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    } else {
      return sortDirection === 'asc' ? (aValue as number) - (bValue as number) : (bValue as number) - (aValue as number);
    }
  });

  const SortIcon = ({ field }: { field: SortField }) => (
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

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead 
              className="font-medium text-gray-700 cursor-pointer hover:bg-gray-100 select-none"
              onClick={() => handleSort('id')}
            >
              <div className="flex items-center justify-start">
                Job Number
                <SortIcon field="id" />
              </div>
            </TableHead>
            <TableHead 
              className="font-medium text-gray-700 cursor-pointer hover:bg-gray-100 select-none"
              onClick={() => handleSort('customer')}
            >
              <div className="flex items-center justify-start">
                Customer
                <SortIcon field="customer" />
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
              onClick={() => handleSort('date')}
            >
              <div className="flex items-center justify-start">
                Scheduled Date
                <SortIcon field="date" />
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
            <TableHead>
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedJobs.map((job) => (
            <TableRow key={job.id} className="hover:bg-gray-50 group">
              <TableCell>
                <button 
                  className="text-blue-600 hover:text-blue-800 hover:underline text-left"
                  onClick={() => onEditJob?.(job.id)}
                >
                  {job.id}
                </button>
              </TableCell>
              <TableCell className="text-gray-900">{job.customer}</TableCell>
              <TableCell>
                {job.roofer ? (
                  <Badge
                    variant="outline"
                    className="text-xs px-2 py-1 bg-orange-100 text-orange-800 border-orange-200"
                  >
                    {job.roofer}
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
                  className={`text-xs px-2 py-1 ${getPriorityColor(job.priority || 'medium')}`}
                >
                  {formatPriority(job.priority || 'medium')}
                </Badge>
              </TableCell>
              <TableCell className="text-gray-900">
                {new Date(job.date).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-gray-900 max-w-xs truncate">
                {job.address}
              </TableCell>
              <TableCell className="text-right text-gray-900">
                ${(job.estimatedCost || 0).toLocaleString()}
              </TableCell>
              <TableCell>
                {(onEditJob || onDeleteJob) && (
                  <div className="flex gap-2">
                    {onEditJob && (
                      <Button
                        variant="secondary"
                        size="sm"
                        aria-label={`Edit job ${job.id}`}
                        onClick={e => { e.stopPropagation(); onEditJob(job.id); }}
                        className="opacity-80 group-hover:opacity-100"
                      >
                        ✏️
                      </Button>
                    )}
                    {onDeleteJob && (
                      <Button
                        variant="danger"
                        size="sm"
                        aria-label={`Delete job ${job.id}`}
                        onClick={e => { e.stopPropagation(); onDeleteJob(job.id); }}
                        className="opacity-80 group-hover:opacity-100"
                      >
                        🗑
                      </Button>
                    )}
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}; 