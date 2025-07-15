import React, { useState } from 'react';
import { Button } from '../atoms/Button';
import { Badge } from '../atoms/Badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../Figma Design/components/ui/table';

export interface CustomerData {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  customerType: 'residential' | 'commercial';
  status: 'active' | 'inactive';
  jobCount: number;
  lastContact: string;
  assignedRoofer: string | null;
}

interface CustomersProps {
  onAddCustomer: () => void;
  onEditCustomer: (customer: CustomerData) => void;
}

type SortField = 'fullName' | 'email' | 'phone' | 'address' | 'customerType' | 'status' | 'jobCount' | 'lastContact';
type SortDirection = 'asc' | 'desc';

const getCustomerTypeColor = (type: string) => {
  return type === 'residential' 
    ? 'bg-blue-100 text-blue-800 border-blue-200' 
    : 'bg-purple-100 text-purple-800 border-purple-200';
};

const getStatusColor = (status: string) => {
  return status === 'active' 
    ? 'bg-green-100 text-green-800 border-green-200' 
    : 'bg-gray-100 text-gray-800 border-gray-200';
};

const customersData: CustomerData[] = [
  {
    id: 1,
    fullName: 'John Smith',
    email: 'john.smith@email.com',
    phone: '(555) 123-4567',
    address: '123 Main Street, Springfield, IL 62701',
    customerType: 'residential',
    status: 'active',
    jobCount: 3,
    lastContact: '2024-01-15',
    assignedRoofer: 'Michael Rodriguez'
  },
  {
    id: 2,
    fullName: 'ABC Corporation',
    email: 'contact@abccorp.com',
    phone: '(555) 987-6543',
    address: '456 Business Ave, Chicago, IL 60601',
    customerType: 'commercial',
    status: 'active',
    jobCount: 8,
    lastContact: '2024-01-20',
    assignedRoofer: 'Sarah Johnson'
  },
  {
    id: 3,
    fullName: 'Maria Garcia',
    email: 'maria.garcia@email.com',
    phone: '(555) 234-5678',
    address: '789 Oak Drive, Peoria, IL 61602',
    customerType: 'residential',
    status: 'active',
    jobCount: 1,
    lastContact: '2024-01-10',
    assignedRoofer: 'David Thompson'
  },
  {
    id: 4,
    fullName: 'Tech Solutions Inc.',
    email: 'info@techsolutions.com',
    phone: '(555) 345-6789',
    address: '321 Corporate Blvd, Rockford, IL 61101',
    customerType: 'commercial',
    status: 'inactive',
    jobCount: 0,
    lastContact: '2023-12-05',
    assignedRoofer: null
  },
  {
    id: 5,
    fullName: 'Robert Johnson',
    email: 'rob.johnson@email.com',
    phone: '(555) 456-7890',
    address: '654 Pine Street, Decatur, IL 62521',
    customerType: 'residential',
    status: 'active',
    jobCount: 5,
    lastContact: '2024-01-18',
    assignedRoofer: 'Jennifer Martinez'
  }
];

export const Customers: React.FC<CustomersProps> = ({ onAddCustomer, onEditCustomer }) => {
  const [sortField, setSortField] = useState<SortField>('fullName');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedCustomers = [...customersData].sort((a, b) => {
    let aValue: string | number;
    let bValue: string | number;

    switch (sortField) {
      case 'fullName':
        aValue = a.fullName;
        bValue = b.fullName;
        break;
      case 'email':
        aValue = a.email;
        bValue = b.email;
        break;
      case 'phone':
        aValue = a.phone;
        bValue = b.phone;
        break;
      case 'address':
        aValue = a.address;
        bValue = b.address;
        break;
      case 'customerType':
        aValue = a.customerType;
        bValue = b.customerType;
        break;
      case 'status':
        aValue = a.status;
        bValue = b.status;
        break;
      case 'jobCount':
        aValue = a.jobCount;
        bValue = b.jobCount;
        break;
      case 'lastContact':
        aValue = new Date(a.lastContact).getTime();
        bValue = new Date(b.lastContact).getTime();
        break;
      default:
        aValue = a.fullName;
        bValue = b.fullName;
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

  // Unicode arrows for sort icons (replace with icons if/when available)
  const SortIcon = ({ field }: { field: SortField }) => {
    return (
      <span className="inline-flex items-center justify-center w-4 h-4 ml-2">
        {sortField === field ? (
          sortDirection === 'asc' ? (
            <span className="text-gray-600">▲</span>
          ) : (
            <span className="text-gray-600">▼</span>
          )
        ) : (
          <span className="text-gray-400 text-sm">↕</span>
        )}
      </span>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <main className="px-6 lg:px-8 py-8">
        <div className="max-w-full mx-auto">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Customers</h1>
              <p className="text-gray-600 mt-1">Manage all customer profiles and their associated jobs</p>
            </div>
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={onAddCustomer}
            >
              Add Customer
            </Button>
          </div>

          {/* Customers Table */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead 
                    className="font-medium text-gray-700 cursor-pointer hover:bg-gray-100 select-none"
                    onClick={() => handleSort('fullName')}
                  >
                    <div className="flex items-center justify-start">
                      Customer Name
                      <SortIcon field="fullName" />
                    </div>
                  </TableHead>
                  <TableHead 
                    className="font-medium text-gray-700 cursor-pointer hover:bg-gray-100 select-none"
                    onClick={() => handleSort('email')}
                  >
                    <div className="flex items-center justify-start">
                      Email Address
                      <SortIcon field="email" />
                    </div>
                  </TableHead>
                  <TableHead 
                    className="font-medium text-gray-700 cursor-pointer hover:bg-gray-100 select-none"
                    onClick={() => handleSort('phone')}
                  >
                    <div className="flex items-center justify-start">
                      Phone Number
                      <SortIcon field="phone" />
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
                    onClick={() => handleSort('customerType')}
                  >
                    <div className="flex items-center justify-start">
                      Type
                      <SortIcon field="customerType" />
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
                  <TableHead className="font-medium text-gray-700">
                    <div className="flex items-center justify-start">
                      Assigned Roofer
                      <span className="w-4 h-4 ml-2"></span>
                    </div>
                  </TableHead>
                  <TableHead 
                    className="font-medium text-gray-700 cursor-pointer hover:bg-gray-100 select-none"
                    onClick={() => handleSort('jobCount')}
                  >
                    <div className="flex items-center justify-end">
                      # of Jobs
                      <SortIcon field="jobCount" />
                    </div>
                  </TableHead>
                  <TableHead 
                    className="font-medium text-gray-700 cursor-pointer hover:bg-gray-100 select-none"
                    onClick={() => handleSort('lastContact')}
                  >
                    <div className="flex items-center justify-start">
                      Last Contact
                      <SortIcon field="lastContact" />
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedCustomers.map((customer) => (
                  <TableRow key={customer.id} className="hover:bg-gray-50">
                    <TableCell>
                      <button 
                        className="text-blue-600 hover:text-blue-800 hover:underline text-left"
                        onClick={() => onEditCustomer(customer)}
                      >
                        {customer.fullName}
                      </button>
                    </TableCell>
                    <TableCell className="text-gray-900">{customer.email}</TableCell>
                    <TableCell className="text-gray-900">{customer.phone}</TableCell>
                    <TableCell className="text-gray-900">{customer.address}</TableCell>
                    <TableCell>
                      <Badge
                        variant="primary" // Figma uses 'outline', mapped to 'primary' in local Badge
                        className={`text-xs px-2 py-1 ${getCustomerTypeColor(customer.customerType)}`}
                      >
                        {customer.customerType === 'residential' ? 'Residential' : 'Commercial'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="primary" // Figma uses 'outline', mapped to 'primary' in local Badge
                        className={`text-xs px-2 py-1 ${getStatusColor(customer.status)}`}
                      >
                        {customer.status === 'active' ? 'Active' : 'Inactive'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {customer.assignedRoofer ? (
                        <Badge
                          variant="primary" // Figma uses 'outline', mapped to 'primary' in local Badge
                          className="text-xs px-2 py-1 bg-orange-100 text-orange-800 border-orange-200"
                        >
                          {customer.assignedRoofer}
                        </Badge>
                      ) : (
                        <span className="text-gray-400 text-sm">No roofer assigned</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right text-gray-900">
                      {customer.jobCount}
                    </TableCell>
                    <TableCell className="text-gray-900">
                      {new Date(customer.lastContact).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
    </div>
  );
}; 