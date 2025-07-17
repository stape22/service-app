import React, { useState } from 'react';
import { Button } from '../atoms/Button';
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from '../atoms/Table';
// TODO: Replace with atomic/organism Table implementation. See dev-log.md for rationale.
// import { Table } from '../../../Figma Design/components/ui/table';

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
  customers: CustomerData[];
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

export const Customers: React.FC<CustomersProps> = ({ customers, onAddCustomer, onEditCustomer }) => {
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

  const sortedCustomers = [...customers].sort((a, b) => {
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
          {/* Table Body */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead onClick={() => handleSort('fullName')}>Full Name<SortIcon field="fullName" /></TableHead>
                <TableHead onClick={() => handleSort('email')}>Email<SortIcon field="email" /></TableHead>
                <TableHead onClick={() => handleSort('phone')}>Phone<SortIcon field="phone" /></TableHead>
                <TableHead onClick={() => handleSort('address')}>Address<SortIcon field="address" /></TableHead>
                <TableHead onClick={() => handleSort('customerType')}>Type<SortIcon field="customerType" /></TableHead>
                <TableHead onClick={() => handleSort('status')}>Status<SortIcon field="status" /></TableHead>
                <TableHead onClick={() => handleSort('jobCount')}>Jobs<SortIcon field="jobCount" /></TableHead>
                <TableHead onClick={() => handleSort('lastContact')}>Last Contact<SortIcon field="lastContact" /></TableHead>
                <TableHead>Assigned Roofer</TableHead>
                <TableHead>Edit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>{customer.fullName}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.phone}</TableCell>
                  <TableCell>{customer.address}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded ${getCustomerTypeColor(customer.customerType)}`}>{customer.customerType.charAt(0).toUpperCase() + customer.customerType.slice(1)}</span>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded ${getStatusColor(customer.status)}`}>{customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}</span>
                  </TableCell>
                  <TableCell>{customer.jobCount}</TableCell>
                  <TableCell>{customer.lastContact}</TableCell>
                  <TableCell>{customer.assignedRoofer || '-'}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" onClick={() => onEditCustomer(customer)}>
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  );
}; 