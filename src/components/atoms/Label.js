import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
const base = 'label';
const text = 'label-text';
export const Label = ({ className = '', children, ...props }) => (_jsx("label", { className: [base, text, className].filter(Boolean).join(' '), ...props, children: children }));
