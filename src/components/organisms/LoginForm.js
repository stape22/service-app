import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { AuthForm } from '../molecules/AuthForm';
import { Input } from '../atoms/Input';
import { Label } from '../atoms/Label';
import { useAuth } from '../../context/AuthContext';
export const LoginForm = () => {
    const { login, loading, error } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [formError, setFormError] = useState(null);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError(null);
        if (!email || !password) {
            setFormError('Email and password are required.');
            return;
        }
        await login(email, password);
    };
    const errorText = formError || error || undefined;
    return (_jsxs(AuthForm, { onSubmit: handleSubmit, errorText: errorText, loading: loading, submitLabel: "Sign In", ...(errorText ? { errorTestId: 'login-error' } : {}), children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "email", className: "text-sm font-medium text-gray-700", children: "Email address" }), _jsxs("div", { className: "relative", children: [_jsx("div", { className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none", children: _jsx("svg", { className: "h-5 w-5 text-gray-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" }) }) }), _jsx(Input, { id: "email", name: "email", type: "email", autoComplete: "email", value: email, onChange: e => setEmail(e.target.value), className: "pl-10", placeholder: "Enter your email", required: true })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "password", className: "text-sm font-medium text-gray-700", children: "Password" }), _jsxs("div", { className: "relative", children: [_jsx("div", { className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none", children: _jsx("svg", { className: "h-5 w-5 text-gray-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" }) }) }), _jsx(Input, { id: "password", name: "password", type: "password", autoComplete: "current-password", value: password, onChange: e => setPassword(e.target.value), className: "pl-10", placeholder: "Enter your password", required: true })] })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center", children: [_jsx("input", { id: "remember-me", name: "remember-me", type: "checkbox", checked: rememberMe, onChange: e => setRememberMe(e.target.checked), className: "h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" }), _jsx("label", { htmlFor: "remember-me", className: "ml-2 block text-sm text-gray-700", children: "Remember me" })] }), _jsx("div", { className: "text-sm", children: _jsx("a", { href: "#", className: "font-medium text-blue-600 hover:text-blue-500", children: "Forgot your password?" }) })] })] }));
};
