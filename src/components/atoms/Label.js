import { jsx as _jsx } from "react/jsx-runtime";
const base = 'label';
const text = 'label-text';
export const Label = ({ className = '', children, ...props }) => (_jsx("label", { className: [base, text, className].filter(Boolean).join(' '), ...props, children: children }));
