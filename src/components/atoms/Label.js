import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
const base = 'block text-sm font-medium text-gray-700';
export const Label = ({ className = '', children, ...props }) => (_jsx("label", { className: [base, className].filter(Boolean).join(' '), ...props, children: children }));
