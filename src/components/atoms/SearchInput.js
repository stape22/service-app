import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useEffect } from 'react';
import { Input } from './Input';
export const SearchInput = ({ placeholder = 'Search...', value: controlledValue, onChange, onSearch, debounceMs = 300, className = '', size = 'md' }) => {
    const [internalValue, setInternalValue] = useState(controlledValue || '');
    useEffect(() => {
        if (controlledValue !== undefined) {
            setInternalValue(controlledValue);
        }
    }, [controlledValue]);
    useEffect(() => {
        if (!onSearch)
            return;
        const timer = setTimeout(() => {
            onSearch(internalValue);
        }, debounceMs);
        return () => clearTimeout(timer);
    }, [internalValue, onSearch, debounceMs]);
    const handleChange = (e) => {
        const newValue = e.target.value;
        setInternalValue(newValue);
        onChange?.(newValue);
    };
    return (_jsxs("div", { className: `relative ${className}`, children: [_jsx(Input, { type: "text", placeholder: placeholder, value: internalValue, onChange: handleChange, size: size, className: "pl-10" }), _jsx("div", { className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none", children: _jsx("svg", { className: "h-5 w-5 text-gray-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" }) }) })] }));
};
