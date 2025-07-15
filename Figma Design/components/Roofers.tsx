import { useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { ChevronUp, ChevronDown } from "lucide-react";

export interface RooferData {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  availability: 'full-time' | 'part-time';
  certifications: string[];
  contactCount: number;
}

interface RoofersProps {
  onAddRoofer: () => void;
  onEditRoofer: (roofer: RooferData) => void;
}

type SortField = 'fullName' | 'email' | 'phone' | 'address' | 'availability' | 'contactCount';
type SortDirection = 'asc' | 'desc';

const getAvailabilityColor = (availability: string) => {
  return availability === 'full-time' 
    ? 'bg-green-100 text-green-800 border-green-200' 
    : 'bg-yellow-100 text-yellow-800 border-yellow-200';
};

const getCertificationColor = (certification: string) => {
  switch (certification.toLowerCase()) {
    case 'licensed':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'insured':
      return 'bg-purple-100 text-purple-800 border-purple-200';
    case 'bonded':
      return 'bg-green-100 text-green-800 border-green-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const roofersData: RooferData[] = [
  {
    id: 1,
    fullName: 'Michael Rodriguez',
    email: 'michael.r@example.com',
    phone: '(555) 123-4567',
    address: '1234 Oak Street',
    availability: 'full-time',
    certifications: ['Licensed', 'Insured'],
    contactCount: 3
  },
  {
    id: 2,
    fullName: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    phone: '(555) 987-6543',
    address: '1234 Oak Street',
    availability: 'part-time',
    certifications: ['Licensed', 'Insured', 'Bonded'],
    contactCount: 2
  },
  {
    id: 3,
    fullName: 'David Thompson',
    email: 'david.t@example.com',
    phone: '(555) 234-5678',
    address: '1234 Oak Street',
    availability: 'full-time',
    certifications: ['Licensed'],
    contactCount: 0
  },
  {
    id: 4,
    fullName: 'Jennifer Martinez',
    email: 'jennifer.m@example.com',
    phone: '(555) 345-6789',
    address: '1234 Oak Street',
    availability: 'full-time',
    certifications: ['Licensed', 'Insured'],
    contactCount: 1
  },
  {
    id: 5,
    fullName: 'Robert Wilson',
    email: 'robert.w@example.com',
    phone: '(555) 456-7890',
    address: '1234 Oak Street',
    availability: 'part-time',
    certifications: ['Licensed', 'Insured'],
    contactCount: 4
  }
];

export function Roofers({ onAddRoofer, onEditRoofer }: RoofersProps) {
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

  const sortedRoofers = [...roofersData].sort((a, b) => {
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
      case 'availability':
        aValue = a.availability;
        bValue = b.availability;
        break;
      case 'contactCount':
        aValue = a.contactCount;
        bValue = b.contactCount;
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
              <h1 className="text-2xl font-semibold text-gray-900">Roofers</h1>
              <p className="text-gray-600 mt-1">Manage all roofer profiles and their associated contacts</p>
            </div>
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={onAddRoofer}
            >
              Add Roofer
            </Button>
          </div>

          {/* Roofers Table */}
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
                    onClick={() => handleSort('availability')}
                  >
                    <div className="flex items-center justify-start">
                      Availability
                      <SortIcon field="availability" />
                    </div>
                  </TableHead>
                  <TableHead className="font-medium text-gray-700">
                    <div className="flex items-center justify-start">
                      Certifications
                      <span className="w-4 h-4 ml-2"></span>
                    </div>
                  </TableHead>
                  <TableHead 
                    className="font-medium text-gray-700 cursor-pointer hover:bg-gray-100 select-none"
                    onClick={() => handleSort('contactCount')}
                  >
                    <div className="flex items-center justify-end">
                      # of Contacts
                      <SortIcon field="contactCount" />
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedRoofers.map((roofer) => (
                  <TableRow key={roofer.id} className="hover:bg-gray-50">
                    <TableCell>
                      <button 
                        className="text-blue-600 hover:text-blue-800 hover:underline text-left"
                        onClick={() => onEditRoofer(roofer)}
                      >
                        {roofer.fullName}
                      </button>
                    </TableCell>
                    <TableCell className="text-gray-900">{roofer.email}</TableCell>
                    <TableCell className="text-gray-900">{roofer.phone}</TableCell>
                    <TableCell className="text-gray-900">{roofer.address}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`text-xs px-2 py-1 ${getAvailabilityColor(roofer.availability)}`}
                      >
                        {roofer.availability === 'full-time' ? 'Full-time' : 'Part-time'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1 flex-wrap">
                        {roofer.certifications.map((cert, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className={`text-xs px-2 py-1 ${getCertificationColor(cert)}`}
                          >
                            {cert}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-right text-gray-900">
                      {roofer.contactCount}
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
}