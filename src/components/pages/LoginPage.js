import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { LoginForm } from '../organisms/LoginForm';
import { AuthPageTemplate } from '../templates/AuthPageTemplate';
export const LoginPage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        if (user)
            navigate('/dashboard');
    }, [user, navigate]);
    return (_jsxs(AuthPageTemplate, { title: "Welcome back", subtitle: "Sign in to your account to continue", children: [_jsx(LoginForm, {}), _jsx("div", { className: "mt-6 text-center", children: _jsxs("p", { className: "text-sm text-gray-600", children: ["Don't have an account?", ' ', _jsx(Link, { to: "/signup", className: "font-medium text-blue-600 hover:text-blue-500", children: "Sign up here" })] }) })] }));
};
