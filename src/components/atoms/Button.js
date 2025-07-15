import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
const base = 'btn';
const variantMap = {
    default: 'btn-neutral',
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    accent: 'btn-accent',
    ghost: 'btn-ghost',
    link: 'btn-link',
};
const sizeMap = {
    sm: 'btn-sm',
    md: '',
    lg: 'btn-lg',
};
export const Button = ({ variant = 'default', size = 'md', className = '', children, ...props }) => (_jsx("button", { type: "button", className: [
        base,
        variantMap[variant],
        sizeMap[size],
        className,
    ].filter(Boolean).join(' '), ...props, children: children }));
