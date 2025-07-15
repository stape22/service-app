import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();
    if (loading)
        return _jsx("div", { children: "Loading..." });
    if (!user)
        return _jsx(Navigate, { to: "/login", state: { from: location }, replace: true });
    return _jsx(_Fragment, { children: children });
};
export default ProtectedRoute;
