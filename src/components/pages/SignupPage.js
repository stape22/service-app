import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { SignupForm } from '../organisms/SignupForm';
import { AuthPageTemplate } from '../templates/AuthPageTemplate';
export const SignupPage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        if (user)
            navigate('/dashboard');
    }, [user, navigate]);
    return (_jsxs(AuthPageTemplate, { title: "Create your account", subtitle: "Get started with your free account", children: [_jsx(SignupForm, {}), _jsx("div", { className: "mt-6 text-center", children: _jsxs("p", { className: "text-sm text-gray-600", children: ["Already have an account?", ' ', _jsx(Link, { to: "/login", className: "font-medium text-blue-600 hover:text-blue-500", children: "Sign in here" })] }) })] }));
};
