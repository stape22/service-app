import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
export const Table = ({ className = '', ...props }) => (_jsx("table", { className: `min-w-full divide-y divide-gray-200 ${className}`, ...props }));
export const TableHeader = ({ className = '', ...props }) => (_jsx("thead", { className: `bg-gray-50 ${className}`, ...props }));
export const TableBody = ({ className = '', ...props }) => (_jsx("tbody", { className: className, ...props }));
export const TableRow = ({ className = '', ...props }) => (_jsx("tr", { className: `hover:bg-gray-50 ${className}`, ...props }));
export const TableCell = ({ className = '', ...props }) => (_jsx("td", { className: `px-4 py-2 text-sm text-gray-900 ${className}`, ...props }));
export const TableHead = ({ className = '', ...props }) => (_jsx("th", { className: `px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider ${className}`, ...props }));
