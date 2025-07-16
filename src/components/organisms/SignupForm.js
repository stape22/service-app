import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { AuthForm } from '../molecules/AuthForm';
import { Input } from '../atoms/Input';
import { Label } from '../atoms/Label';
import { useAuth } from '../../context/AuthContext';
export const SignupForm = () => {
    const { signup, loading, error } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [formError, setFormError] = useState(null);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError(null);
        if (!email || !password || !confirmPassword) {
            setFormError('All fields are required.');
            return;
        }
        if (password !== confirmPassword) {
            setFormError('Passwords do not match.');
            return;
        }
        if (password.length < 6) {
            setFormError('Password must be at least 6 characters long.');
            return;
        }
        if (!acceptTerms) {
            setFormError('You must accept the terms and conditions.');
            return;
        }
        await signup(email, password);
    };
    const errorText = formError || error || undefined;
    return (_jsxs(AuthForm, { onSubmit: handleSubmit, errorText: errorText, loading: loading, submitLabel: "Create Account", ...(errorText ? { errorTestId: 'signup-error' } : {}), children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "email", className: "text-sm font-medium text-gray-700", children: "Email address" }), _jsxs("div", { className: "relative", children: [_jsx("div", { className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none", children: _jsx("svg", { className: "h-5 w-5 text-gray-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" }) }) }), _jsx(Input, { id: "email", name: "email", type: "email", autoComplete: "email", value: email, onChange: e => setEmail(e.target.value), className: "pl-10", placeholder: "Enter your email", required: true })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "password", className: "text-sm font-medium text-gray-700", children: "Password" }), _jsxs("div", { className: "relative", children: [_jsx("div", { className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none", children: _jsx("svg", { className: "h-5 w-5 text-gray-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" }) }) }), _jsx(Input, { id: "password", name: "password", type: "password", autoComplete: "new-password", value: password, onChange: e => setPassword(e.target.value), className: "pl-10", placeholder: "Create a password", required: true })] }), _jsx("p", { className: "text-xs text-gray-500", children: "Must be at least 6 characters long" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "confirmPassword", className: "text-sm font-medium text-gray-700", children: "Confirm Password" }), _jsxs("div", { className: "relative", children: [_jsx("div", { className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none", children: _jsx("svg", { className: "h-5 w-5 text-gray-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" }) }) }), _jsx(Input, { id: "confirmPassword", name: "confirmPassword", type: "password", autoComplete: "new-password", value: confirmPassword, onChange: e => setConfirmPassword(e.target.value), className: "pl-10", placeholder: "Confirm your password", required: true })] })] }), _jsxs("div", { className: "flex items-start", children: [_jsx("div", { className: "flex items-center h-5", children: _jsx("input", { id: "accept-terms", name: "accept-terms", type: "checkbox", checked: acceptTerms, onChange: e => setAcceptTerms(e.target.checked), className: "h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded", required: true }) }), _jsx("div", { className: "ml-3 text-sm", children: _jsxs("label", { htmlFor: "accept-terms", className: "text-gray-700", children: ["I agree to the", ' ', _jsx("a", { href: "#", className: "text-blue-600 hover:text-blue-500 font-medium", children: "Terms and Conditions" }), ' ', "and", ' ', _jsx("a", { href: "#", className: "text-blue-600 hover:text-blue-500 font-medium", children: "Privacy Policy" })] }) })] })] }));
};
