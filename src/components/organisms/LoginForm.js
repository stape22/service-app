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
    return (_jsxs(AuthForm, { onSubmit: handleSubmit, errorText: errorText, loading: loading, submitLabel: "Sign In", showSignupLink: true, ...(errorText ? { errorTestId: 'login-error' } : {}), children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "email", className: "text-slate-700", children: "Email address" }), _jsx(Input, { id: "email", name: "email", type: "email", autoComplete: "email", placeholder: "Enter your email", value: email, onChange: e => setEmail(e.target.value), required: true, className: "w-full" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "password", className: "text-slate-700", children: "Password" }), _jsx(Input, { id: "password", name: "password", type: "password", autoComplete: "current-password", placeholder: "Enter your password", value: password, onChange: e => setPassword(e.target.value), required: true, className: "w-full" })] })] }));
};
