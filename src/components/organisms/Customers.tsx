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
                      Full Name
                      <SortIcon field="fullName" />
                    </div>
                  </TableHead>
                  <TableHead 
                    className="font-medium text-gray-700 cursor-pointer hover:bg-gray-100 select-none"
                    onClick={() => handleSort('email')}
                  >
                    <div className="flex items-center justify-start">
                      Email
                      <SortIcon field="email" />
                    </div>
                  </TableHead>
                  <TableHead 
                    className="font-medium text-gray-700 cursor-pointer hover:bg-gray-100 select-none"
                    onClick={() => handleSort('phone')}
                  >
                    <div className="flex items-center justify-start">
                      Phone
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
                  <TableHead 
                    className="font-medium text-gray-700 cursor-pointer hover:bg-gray-100 select-none"
                    onClick={() => handleSort('jobCount')}
                  >
                    <div className="flex items-center justify-start">
                      Jobs
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
                  <TableHead className="font-medium text-gray-700">
                    <div className="flex items-center justify-start">
                      Assigned Roofer
                      <span className="w-4 h-4 ml-2"></span>
                    </div>
                  </TableHead>
                  <TableHead className="font-medium text-gray-700">
                    <div className="flex items-center justify-center">
                      Edit
                      <span className="w-4 h-4 ml-2"></span>
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
                    <TableCell className="text-gray-900">
                      {customer.jobCount}
                    </TableCell>
                    <TableCell className="text-gray-900">
                      {new Date(customer.lastContact).toLocaleDateString()}
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
                    <TableCell className="text-center">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs px-2 py-1"
                        onClick={() => onEditCustomer(customer)}
                      >
                        Edit
                      </Button>
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