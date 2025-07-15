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
    return (_jsxs(AuthForm, { onSubmit: handleSubmit, errorText: errorText, loading: loading, submitLabel: "Sign In", ...(errorText ? { errorTestId: 'login-error' } : {}), children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "email", children: "Email" }), _jsx(Input, { id: "email", name: "email", type: "email", autoComplete: "email", value: email, onChange: e => setEmail(e.target.value), required: true })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "password", children: "Password" }), _jsx(Input, { id: "password", name: "password", type: "password", autoComplete: "current-password", value: password, onChange: e => setPassword(e.target.value), required: true })] })] }));
};
