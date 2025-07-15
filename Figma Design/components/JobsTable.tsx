import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { ChevronUp, ChevronDown } from "lucide-react";

interface JobData {
  id: string;
  date: string;
  jobType: string;
  status: 'scheduled' | 'to-schedule' | 'completed' | 'in-progress';
  roofer: string;
  address: string;
  customer: string;
}

interface JobsTableProps {
  onJobEdit?: (jobId: number) => void;
}

type SortField = 'id' | 'date' | 'jobType' | 'status' | 'roofer' | 'address' | 'customer';
type SortDirection = 'asc' | 'desc';

const getStatusColor = (status: JobData['status']) => {
  switch (status) {
    case 'scheduled':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'to-schedule':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'completed':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'in-progress':
      return 'bg-purple-100 text-purple-800 border-purple-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getStatusText = (status: JobData['status']) => {
  switch (status) {
    case 'to-schedule':
      return 'To Schedule';
    case 'in-progress':
      return 'In Progress';
    default:
      return status.charAt(0).toUpperCase() + status.slice(1);
  }
};

const jobsData: JobData[] = [
  {
    id: '#318',
    date: 'June 4, 2025',
    jobType: 'Install',
    status: 'scheduled',
    roofer: 'Mike Johnson',
    address: '1234 Oak Street',
    customer: 'John Smith'
  },
  {
    id: '#319',
    date: 'June 5, 2025',
    jobType: 'Repair',
    status: 'to-schedule',
    roofer: 'Sarah Williams',
    address: '567 Pine Avenue',
    customer: 'Emily Davis'
  },
  {
    id: '#320',
    date: 'June 5, 2025',
    jobType: 'Estimate',
    status: 'completed',
    roofer: 'David Chen',
    address: '890 Maple Drive',
    customer: 'Robert Johnson'
  },
  {
    id: '#321',
    date: 'June 6, 2025',
    jobType: 'Install',
    status: 'in-progress',
    roofer: 'James Wilson',
    address: '123 Elm Court',
    customer: 'Patricia Brown'
  },
  {
    id: '#322',
    date: 'June 7, 2025',
    jobType: 'Repair',
    status: 'scheduled',
    roofer: 'Lisa Martinez',
    address: '456 Cedar Lane',
    customer: 'Michael Wilson'
  },
  {
    id: '#323',
    date: 'June 8, 2025',
    jobType: 'Cleaning',
    status: 'to-schedule',
    roofer: 'Thomas Anderson',
    address: '789 Birch Street',
    customer: 'Jennifer Taylor'
  }
];

export function JobsTable({ onJobEdit }: JobsTableProps) {
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
    let aValue: string | number;
    let bValue: string | number;

    switch (sortField) {
      case 'id':
        // Extract number from ID for proper sorting
        aValue = parseInt(a.id.replace('#', ''));
        bValue = parseInt(b.id.replace('#', ''));
        break;
      case 'date':
        aValue = new Date(a.date).getTime();
        bValue = new Date(b.date).getTime();
        break;
      case 'jobType':
        aValue = a.jobType;
        bValue = b.jobType;
        break;
      case 'status':
        aValue = a.status;
        bValue = b.status;
        break;
      case 'roofer':
        aValue = a.roofer;
        bValue = b.roofer;
        break;
      case 'address':
        aValue = a.address;
        bValue = b.address;
        break;
      case 'customer':
        aValue = a.customer;
        bValue = b.customer;
        break;
      default:
        aValue = parseInt(a.id.replace('#', ''));
        bValue = parseInt(b.id.replace('#', ''));
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
            <ChevronUp className="h-4 w-4 text-gray-600" />
          ) : (
            <ChevronDown className="h-4 w-4 text-gray-600" />
          )
        ) : (
          <span className="text-gray-400 text-sm">↕</span>
        )}
      </span>
    );
  };

  const handleJobClick = (jobId: string) => {
    if (onJobEdit) {
      // Extract number from job ID and pass to parent
      const numericId = parseInt(jobId.replace('#', ''));
      onJobEdit(numericId);
    }
  };

  return (
    <div className="rounded-lg border border-gray-200 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead 
              className="font-medium text-gray-700 cursor-pointer hover:bg-gray-100 select-none"
              onClick={() => handleSort('id')}
            >
              <div className="flex items-center justify-end">
                Job #
                <SortIcon field="id" />
              </div>
            </TableHead>
            <TableHead 
              className="font-medium text-gray-700 cursor-pointer hover:bg-gray-100 select-none"
              onClick={() => handleSort('date')}
            >
              <div className="flex items-center justify-start">
                Date
                <SortIcon field="date" />
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
              onClick={() => handleSort('roofer')}
            >
              <div className="flex items-center justify-start">
                Roofer
                <SortIcon field="roofer" />
              </div>
            </TableHead>
            <TableHead 
              className="font-medium text-gray-700 cursor-pointer hover:bg-gray-100 select-none"
              onClick={() => handleSort('address')}
            >
              <div className="flex items-center justify-start">
                Address
                <SortIcon field="address" />
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
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedJobs.map((job) => (
            <TableRow key={job.id} className="hover:bg-gray-50">
              <TableCell className="text-right">
                <button 
                  className="text-blue-600 hover:text-blue-800 hover:underline"
                  onClick={() => handleJobClick(job.id)}
                >
                  {job.id}
                </button>
              </TableCell>
              <TableCell className="text-gray-900">{job.date}</TableCell>
              <TableCell className="text-gray-900">{job.jobType}</TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={`text-xs px-2 py-1 ${getStatusColor(job.status)}`}
                >
                  {getStatusText(job.status)}
                </Badge>
              </TableCell>
              <TableCell className="text-gray-900">{job.roofer}</TableCell>
              <TableCell className="text-gray-600">{job.address}</TableCell>
              <TableCell className="text-gray-900">{job.customer}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}