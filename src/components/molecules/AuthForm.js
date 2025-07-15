import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { Button } from '../atoms/Button';
export const AuthForm = ({ onSubmit, errorText, helpText, loading = false, submitLabel = 'Submit', children, className = '', errorTestId, ...props }) => (_jsxs("form", { className: ["w-full max-w-sm space-y-4", className].filter(Boolean).join(' '), onSubmit: onSubmit, ...props, children: [children, helpText && !errorText && (_jsx("div", { className: "text-xs text-base-content/60", children: helpText })), errorText && (_jsx("div", { className: "text-xs text-error", "data-testid": errorTestId, children: errorText })), _jsx(Button, { type: "submit", disabled: loading, className: "w-full", children: loading ? 'Loading...' : submitLabel })] }));
