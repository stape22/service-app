import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
const base = 'badge';
const variantMap = {
    default: '',
    primary: 'badge-primary',
    secondary: 'badge-secondary',
    accent: 'badge-accent',
    ghost: 'badge-ghost',
    info: 'badge-info',
    success: 'badge-success',
    warning: 'badge-warning',
    error: 'badge-error',
};
const sizeMap = {
    sm: 'badge-sm',
    md: '',
    lg: 'badge-lg',
};
export const Badge = ({ variant = 'default', size = 'md', className = '', children, ...props }) => (_jsx("span", { className: [
        base,
        variantMap[variant],
        sizeMap[size],
        className,
    ].filter(Boolean).join(' '), ...props, children: children }));
