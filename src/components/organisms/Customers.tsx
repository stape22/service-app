import React, { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { Button } from '../atoms/Button';
import { Badge } from '../atoms/Badge';
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from '../atoms/Table';

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
  isLoading?: boolean;
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

export const Customers: React.FC<CustomersProps> = ({ 
  customers, 
  onAddCustomer, 
  onEditCustomer, 
  isLoading = false 
}) => {
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

  const handleKeyDown = (event: React.KeyboardEvent, field: SortField) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleSort(field);
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

  const SortIcon = ({ field }: { field: SortField }) => {
    return (
      <span className="inline-flex items-center justify-center w-4 h-4 ml-2" aria-hidden="true">
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

  if (isLoading) {
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
                disabled
              >
                Add Customer
              </Button>
            </div>

            {/* Loading State */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="p-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading customers...</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

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
            {customers.length === 0 ? (
              <div className="p-8 text-center">
                <div className="text-gray-400 mb-4">
                  <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No customers found</h3>
                <p className="text-gray-600 mb-4">Get started by adding your first customer.</p>
                <Button 
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={onAddCustomer}
                >
                  Add Customer
                </Button>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead 
                      className="font-medium text-gray-700 cursor-pointer hover:bg-gray-100 select-none"
                      onClick={() => handleSort('fullName')}
                      onKeyDown={(e) => handleKeyDown(e, 'fullName')}
                      tabIndex={0}
                      role="button"
                      aria-label={`Sort by customer name ${sortField === 'fullName' ? (sortDirection === 'asc' ? 'descending' : 'ascending') : 'ascending'}`}
                    >
                      <div className="flex items-center justify-start">
                        Customer Name
                        <SortIcon field="fullName" />
                      </div>
                    </TableHead>
                    <TableHead 
                      className="font-medium text-gray-700 cursor-pointer hover:bg-gray-100 select-none"
                      onClick={() => handleSort('email')}
                      onKeyDown={(e) => handleKeyDown(e, 'email')}
                      tabIndex={0}
                      role="button"
                      aria-label={`Sort by email address ${sortField === 'email' ? (sortDirection === 'asc' ? 'descending' : 'ascending') : 'ascending'}`}
                    >
                      <div className="flex items-center justify-start">
                        Email Address
                        <SortIcon field="email" />
                      </div>
                    </TableHead>
                    <TableHead 
                      className="font-medium text-gray-700 cursor-pointer hover:bg-gray-100 select-none"
                      onClick={() => handleSort('phone')}
                      onKeyDown={(e) => handleKeyDown(e, 'phone')}
                      tabIndex={0}
                      role="button"
                      aria-label={`Sort by phone number ${sortField === 'phone' ? (sortDirection === 'asc' ? 'descending' : 'ascending') : 'ascending'}`}
                    >
                      <div className="flex items-center justify-start">
                        Phone Number
                        <SortIcon field="phone" />
                      </div>
                    </TableHead>
                    <TableHead 
                      className="font-medium text-gray-700 cursor-pointer hover:bg-gray-100 select-none"
                      onClick={() => handleSort('address')}
                      onKeyDown={(e) => handleKeyDown(e, 'address')}
                      tabIndex={0}
                      role="button"
                      aria-label={`Sort by address ${sortField === 'address' ? (sortDirection === 'asc' ? 'descending' : 'ascending') : 'ascending'}`}
                    >
                      <div className="flex items-center justify-start">
                        Address
                        <SortIcon field="address" />
                      </div>
                    </TableHead>
                    <TableHead 
                      className="font-medium text-gray-700 cursor-pointer hover:bg-gray-100 select-none"
                      onClick={() => handleSort('customerType')}
                      onKeyDown={(e) => handleKeyDown(e, 'customerType')}
                      tabIndex={0}
                      role="button"
                      aria-label={`Sort by customer type ${sortField === 'customerType' ? (sortDirection === 'asc' ? 'descending' : 'ascending') : 'ascending'}`}
                    >
                      <div className="flex items-center justify-start">
                        Type
                        <SortIcon field="customerType" />
                      </div>
                    </TableHead>
                    <TableHead 
                      className="font-medium text-gray-700 cursor-pointer hover:bg-gray-100 select-none"
                      onClick={() => handleSort('status')}
                      onKeyDown={(e) => handleKeyDown(e, 'status')}
                      tabIndex={0}
                      role="button"
                      aria-label={`Sort by status ${sortField === 'status' ? (sortDirection === 'asc' ? 'descending' : 'ascending') : 'ascending'}`}
                    >
                      <div className="flex items-center justify-start">
                        Status
                        <SortIcon field="status" />
                      </div>
                    </TableHead>
                    <TableHead className="font-medium text-gray-700">
                      <div className="flex items-center justify-start">
                        Assigned Roofer
                        <span className="w-4 h-4 ml-2" aria-hidden="true"></span>
                      </div>
                    </TableHead>
                    <TableHead 
                      className="font-medium text-gray-700 cursor-pointer hover:bg-gray-100 select-none"
                      onClick={() => handleSort('jobCount')}
                      onKeyDown={(e) => handleKeyDown(e, 'jobCount')}
                      tabIndex={0}
                      role="button"
                      aria-label={`Sort by job count ${sortField === 'jobCount' ? (sortDirection === 'asc' ? 'descending' : 'ascending') : 'ascending'}`}
                    >
                      <div className="flex items-center justify-end">
                        # of Jobs
                        <SortIcon field="jobCount" />
                      </div>
                    </TableHead>
                    <TableHead 
                      className="font-medium text-gray-700 cursor-pointer hover:bg-gray-100 select-none"
                      onClick={() => handleSort('lastContact')}
                      onKeyDown={(e) => handleKeyDown(e, 'lastContact')}
                      tabIndex={0}
                      role="button"
                      aria-label={`Sort by last contact ${sortField === 'lastContact' ? (sortDirection === 'asc' ? 'descending' : 'ascending') : 'ascending'}`}
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
                          aria-label={`Edit customer ${customer.fullName}`}
                        >
                          {customer.fullName}
                        </button>
                      </TableCell>
                      <TableCell className="text-gray-900">{customer.email}</TableCell>
                      <TableCell className="text-gray-900">{customer.phone}</TableCell>
                      <TableCell className="text-gray-900">{customer.address}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`text-xs px-2 py-1 ${getCustomerTypeColor(customer.customerType)}`}
                        >
                          {customer.customerType === 'residential' ? 'Residential' : 'Commercial'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`text-xs px-2 py-1 ${getStatusColor(customer.status)}`}
                        >
                          {customer.status === 'active' ? 'Active' : 'Inactive'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {customer.assignedRoofer ? (
                          <Badge
                            variant="outline"
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
            )}
          </div>
        </div>
      </main>
    </div>
  );
}; 