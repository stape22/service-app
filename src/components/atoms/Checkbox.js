import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const Checkbox = ({ label, error, className = '', ...props }) => {
    return (_jsxs("label", { className: `inline-flex items-center gap-2 cursor-pointer ${className}`, children: [_jsx("input", { type: "checkbox", className: `peer size-4 rounded border border-input bg-input-background transition-shadow focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${error ? 'border-destructive ring-destructive' : ''}`, "aria-invalid": !!error, ...props }), _jsx("span", { className: "select-none text-sm text-foreground", children: label }), error && _jsx("span", { className: "ml-2 text-xs text-destructive", children: error })] }));
};
