import { jsx as _jsx } from "react/jsx-runtime";
import React, { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from '../organisms/LoginForm';
import { AuthPageTemplate } from '../templates/AuthPageTemplate';
export const LoginPage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        if (user)
            navigate('/dashboard');
    }, [user, navigate]);
    return (_jsx(AuthPageTemplate, { title: "Sign in to your account", children: _jsx(LoginForm, {}) }));
};
