import React from 'react';
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
export declare function DataTable<T extends Record<string, any>>({ data, columns, loading, searchable, searchPlaceholder, searchKeys, paginated, itemsPerPage, onRowClick, onEdit, onDelete, className, emptyMessage, actions }: DataTableProps<T>): import("react/jsx-runtime").JSX.Element;
export {};
