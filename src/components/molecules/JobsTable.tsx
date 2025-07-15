import React, { useState } from 'react';
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from '../atoms/Table';
import { Badge } from '../atoms/Badge';

export interface JobData {
  id: string;
  date: string;
  jobType: string;
  status: 'scheduled' | 'to-schedule' | 'completed' | 'in-progress';
  roofer: string;
  address: string;
  customer: string;
}

interface JobsTableProps {
  onEditJob?: (jobId: string) => void;
}

const jobsData: JobData[] = [
  { id: '#318', date: 'June 4, 2025', jobType: 'Install', status: 'scheduled', roofer: 'Mike Johnson', address: '1234 Oak Street', customer: 'John Smith' },
  { id: '#319', date: 'June 5, 2025', jobType: 'Repair', status: 'to-schedule', roofer: 'Sarah Williams', address: '567 Pine Avenue', customer: 'Emily Davis' },
  { id: '#320', date: 'June 5, 2025', jobType: 'Estimate', status: 'completed', roofer: 'David Chen', address: '890 Maple Drive', customer: 'Robert Johnson' },
  { id: '#321', date: 'June 6, 2025', jobType: 'Install', status: 'in-progress', roofer: 'James Wilson', address: '123 Elm Court', customer: 'Patricia Brown' },
  { id: '#322', date: 'June 7, 2025', jobType: 'Repair', status: 'scheduled', roofer: 'Lisa Martinez', address: '456 Cedar Lane', customer: 'Michael Wilson' },
  { id: '#323', date: 'June 8, 2025', jobType: 'Cleaning', status: 'to-schedule', roofer: 'Thomas Anderson', address: '789 Birch Street', customer: 'Jennifer Taylor' },
];

type SortField = keyof JobData;
type SortDirection = 'asc' | 'desc';

const statusColors: Record<JobData['status'], string> = {
  'scheduled': 'bg-blue-100 text-blue-800 border-blue-200',
  'to-schedule': 'bg-yellow-100 text-yellow-800 border-yellow-200',
  'completed': 'bg-green-100 text-green-800 border-green-200',
  'in-progress': 'bg-orange-100 text-orange-800 border-orange-200',
};

export const JobsTable: React.FC<JobsTableProps> = ({ onEditJob }) => {
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

  const sortedJobs = [...jobsData].sort((a, b) => {
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
          <TableRow>
            <TableHead className="cursor-pointer" onClick={() => handleSort('id')}>
              <div className="flex items-center">Job #<SortIcon field="id" /></div>
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort('date')}>
              <div className="flex items-center">Date<SortIcon field="date" /></div>
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort('jobType')}>
              <div className="flex items-center">Job Type<SortIcon field="jobType" /></div>
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort('status')}>
              <div className="flex items-center">Status<SortIcon field="status" /></div>
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort('roofer')}>
              <div className="flex items-center">Roofer<SortIcon field="roofer" /></div>
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort('address')}>
              <div className="flex items-center">Address<SortIcon field="address" /></div>
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort('customer')}>
              <div className="flex items-center">Customer<SortIcon field="customer" /></div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedJobs.map((job) => (
            <TableRow key={job.id} className="hover:bg-blue-50 cursor-pointer" onClick={() => onEditJob?.(job.id)}>
              <TableCell className="text-right font-mono">{job.id}</TableCell>
              <TableCell>{job.date}</TableCell>
              <TableCell>{job.jobType}</TableCell>
              <TableCell>
                <Badge variant="secondary" className={`text-xs px-2 py-1 border ${statusColors[job.status]}`}>{job.status.replace('-', ' ')}</Badge>
              </TableCell>
              <TableCell>{job.roofer}</TableCell>
              <TableCell>{job.address}</TableCell>
              <TableCell>{job.customer}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}; 