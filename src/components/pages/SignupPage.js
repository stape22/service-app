import { jsx as _jsx } from "react/jsx-runtime";
import React, { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { SignupForm } from '../organisms/SignupForm';
import { AuthPageTemplate } from '../templates/AuthPageTemplate';
export const SignupPage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        if (user)
            navigate('/dashboard');
    }, [user, navigate]);
    return (_jsx(AuthPageTemplate, { title: "Create your account", children: _jsx(SignupForm, {}) }));
};
