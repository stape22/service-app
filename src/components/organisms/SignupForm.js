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
        await signup(email, password);
    };
    const errorText = formError || error || undefined;
    return (_jsxs(AuthForm, { onSubmit: handleSubmit, errorText: errorText, loading: loading, submitLabel: "Create Account", showLoginLink: true, helpText: "By creating an account, you agree to our terms of service and privacy policy.", ...(errorText ? { errorTestId: 'signup-error' } : {}), children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "email", className: "text-slate-700", children: "Email address" }), _jsx(Input, { id: "email", name: "email", type: "email", autoComplete: "email", placeholder: "Enter your email", value: email, onChange: e => setEmail(e.target.value), required: true, className: "w-full" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "password", className: "text-slate-700", children: "Password" }), _jsx(Input, { id: "password", name: "password", type: "password", autoComplete: "new-password", placeholder: "Create a password", value: password, onChange: e => setPassword(e.target.value), required: true, className: "w-full" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "confirmPassword", className: "text-slate-700", children: "Confirm password" }), _jsx(Input, { id: "confirmPassword", name: "confirmPassword", type: "password", autoComplete: "new-password", placeholder: "Confirm your password", value: confirmPassword, onChange: e => setConfirmPassword(e.target.value), required: true, className: "w-full" })] })] }));
};
