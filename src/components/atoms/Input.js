import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
const base = 'input input-bordered';
const variantMap = {
    default: '',
    primary: 'input-primary',
    secondary: 'input-secondary',
    accent: 'input-accent',
    ghost: 'input-ghost',
};
const sizeMap = {
    sm: 'input-sm',
    md: '',
    lg: 'input-lg',
};
export const Input = ({ variant = 'default', size = 'md', className = '', ...props }) => (_jsx("input", { className: [
        base,
        variantMap[variant],
        sizeMap[size],
        className,
    ].filter(Boolean).join(' '), ...props }));
