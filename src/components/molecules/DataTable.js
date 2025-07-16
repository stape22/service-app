import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import React, { useState, useMemo } from 'react';
import { Table } from '../atoms/Table';
import { SearchInput } from '../atoms/SearchInput';
import { Pagination } from '../atoms/Pagination';
import { LoadingState, SkeletonTable } from '../atoms/LoadingState';
import { Button } from '../atoms/Button';
import { Badge } from '../atoms/Badge';
export function DataTable({ data, columns, loading = false, searchable = true, searchPlaceholder = 'Search...', searchKeys, paginated = true, itemsPerPage = 10, onRowClick, onEdit, onDelete, className = '', emptyMessage = 'No data found', actions = [] }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    // Filter data based on search term
    const filteredData = useMemo(() => {
        if (!searchTerm)
            return data;
        const keysToSearch = searchKeys || columns.map(col => col.key);
        return data.filter(item => keysToSearch.some(key => {
            const value = item[key];
            if (value == null)
                return false;
            return String(value).toLowerCase().includes(searchTerm.toLowerCase());
        }));
    }, [data, searchTerm, searchKeys, columns]);
    // Paginate data
    const paginatedData = useMemo(() => {
        if (!paginated)
            return filteredData;
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
        const rowData = {};
        columns.forEach(column => {
            const value = row[column.key];
            rowData[column.key] = column.render ? column.render(value, row) : value;
        });
        // Add actions column if needed
        if (onEdit || onDelete || actions.length > 0) {
            rowData.actions = (_jsxs("div", { className: "flex items-center space-x-2", children: [actions.map((action, index) => (_jsxs(Button, { variant: action.variant || 'outline', size: "sm", onClick: (e) => {
                            e.stopPropagation();
                            action.onClick(row);
                        }, children: [action.icon, action.label] }, index))), onEdit && (_jsx(Button, { variant: "outline", size: "sm", onClick: (e) => {
                            e.stopPropagation();
                            onEdit(row);
                        }, children: "Edit" })), onDelete && (_jsx(Button, { variant: "danger", size: "sm", onClick: (e) => {
                            e.stopPropagation();
                            onDelete(row);
                        }, children: "Delete" }))] }));
        }
        return rowData;
    });
    // Prepare table headers
    const tableHeaders = columns.map(col => col.header);
    if (onEdit || onDelete || actions.length > 0) {
        tableHeaders.push('Actions');
    }
    return (_jsxs("div", { className: `space-y-4 ${className}`, children: [searchable && (_jsx("div", { className: "flex justify-between items-center", children: _jsx(SearchInput, { placeholder: searchPlaceholder, value: searchTerm, onChange: setSearchTerm, className: "w-64" }) })), _jsx(LoadingState, { isLoading: loading, skeleton: _jsx(SkeletonTable, { rows: 5, columns: columns.length + (onEdit || onDelete || actions.length > 0 ? 1 : 0) }), children: filteredData.length === 0 ? (_jsx("div", { className: "text-center py-8 text-gray-500", children: searchTerm ? 'No results found' : emptyMessage })) : (_jsx(Table, { headers: tableHeaders, data: tableData, onRowClick: onRowClick ? (index) => onRowClick(paginatedData[index]) : undefined, className: "w-full" })) }), paginated && totalPages > 1 && (_jsx(Pagination, { currentPage: currentPage, totalPages: totalPages, onPageChange: setCurrentPage, totalItems: filteredData.length, itemsPerPage: itemsPerPage }))] }));
}
