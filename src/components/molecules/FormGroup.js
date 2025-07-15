import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { Label } from '../atoms/Label';
export const FormGroup = ({ label, htmlFor, helpText, errorText, children, className = '', ...props }) => (_jsxs("div", { className: ["form-control", className].filter(Boolean).join(' '), ...props, children: [_jsx(Label, { htmlFor: htmlFor, children: label }), children, helpText && !errorText && (_jsx("span", { className: "label-text-alt text-xs text-base-content/60", children: helpText })), errorText && (_jsx("span", { className: "label-text-alt text-xs text-error", children: errorText }))] }));
