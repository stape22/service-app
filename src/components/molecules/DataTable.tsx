import React, { useState, useMemo } from 'react';
import { Table } from '../atoms/Table';
import { SearchInput } from '../atoms/SearchInput';
import { Pagination } from '../atoms/Pagination';
import { LoadingState, SkeletonTable } from '../atoms/LoadingState';
import { Button } from '../atoms/Button';
import { Badge } from '../atoms/Badge';

interface Column<T> {
  key: keyof T | string;
  header: string;
  render?: (value: any, row: T) => React.ReactNode;
  sortable?: boolean;
  width?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  searchable?: boolean;
  searchPlaceholder?: string;
  searchKeys?: (keyof T)[];
  paginated?: boolean;
  itemsPerPage?: number;
  onRowClick?: (row: T) => void;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  className?: string;
  emptyMessage?: string;
  actions?: {
    label: string;
    onClick: (row: T) => void;
    variant?: 'primary' | 'secondary' | 'danger' | 'outline';
    icon?: React.ReactNode;
  }[];
}

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  loading = false,
  searchable = true,
  searchPlaceholder = 'Search...',
  searchKeys,
  paginated = true,
  itemsPerPage = 10,
  onRowClick,
  onEdit,
  onDelete,
  className = '',
  emptyMessage = 'No data found',
  actions = []
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Filter data based on search term
  const filteredData = useMemo(() => {
    if (!searchTerm) return data;

    const keysToSearch = searchKeys || columns.map(col => col.key as keyof T);
    
    return data.filter(item =>
      keysToSearch.some(key => {
        const value = item[key];
        if (value == null) return false;
        return String(value).toLowerCase().includes(searchTerm.toLowerCase());
      })
    );
  }, [data, searchTerm, searchKeys, columns]);

  // Paginate data
  const paginatedData = useMemo(() => {
    if (!paginated) return filteredData;
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredData.slice(startIndex, endIndex);
  }, [filteredData, currentPage, itemsPerPage, paginated]);

  // Reset to first page when search changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Prepare table data
  const tableData = paginatedData.map(row => {
    const rowData: Record<string, React.ReactNode> = {};
    
    columns.forEach(column => {
      const value = row[column.key as keyof T];
      rowData[column.key as string] = column.render ? column.render(value, row) : value;
    });

    // Add actions column if needed
    if (onEdit || onDelete || actions.length > 0) {
      rowData.actions = (
        <div className="flex items-center space-x-2">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant={action.variant || 'outline'}
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                action.onClick(row);
              }}
            >
              {action.icon}
              {action.label}
            </Button>
          ))}
          {onEdit && (
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(row);
              }}
            >
              Edit
            </Button>
          )}
          {onDelete && (
            <Button
              variant="danger"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(row);
              }}
            >
              Delete
            </Button>
          )}
        </div>
      );
    }

    return rowData;
  });

  // Prepare table headers
  const tableHeaders = columns.map(col => col.header);
  if (onEdit || onDelete || actions.length > 0) {
    tableHeaders.push('Actions');
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Search and controls */}
      {searchable && (
        <div className="flex justify-between items-center">
          <SearchInput
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={setSearchTerm}
            className="w-64"
          />
        </div>
      )}

      {/* Table */}
      <LoadingState
        isLoading={loading}
        skeleton={<SkeletonTable rows={5} columns={columns.length + (onEdit || onDelete || actions.length > 0 ? 1 : 0)} />}
      >
        {filteredData.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            {searchTerm ? 'No results found' : emptyMessage}
          </div>
        ) : (
          <Table
            headers={tableHeaders}
            data={tableData}
            onRowClick={onRowClick ? (index) => onRowClick(paginatedData[index]) : undefined}
            className="w-full"
          />
        )}
      </LoadingState>

      {/* Pagination */}
      {paginated && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalItems={filteredData.length}
          itemsPerPage={itemsPerPage}
        />
      )}
    </div>
  );
}