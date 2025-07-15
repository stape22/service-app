import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import { LoginPage } from './components/pages/LoginPage';
import { SignupPage } from './components/pages/SignupPage';
import { useAuth } from './context/AuthContext';
import { DashboardPage } from './components/pages/DashboardPage';
function RootRedirect() {
    const { user, loading } = useAuth();
    if (loading)
        return null; // or a loading spinner
    return _jsx(Navigate, { to: user ? '/dashboard' : '/login', replace: true });
}
function App() {
    return (_jsx(Router, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(RootRedirect, {}) }), _jsx(Route, { path: "/login", element: _jsx(LoginPage, {}) }), _jsx(Route, { path: "/signup", element: _jsx(SignupPage, {}) }), _jsx(Route, { path: "/dashboard", element: _jsx(ProtectedRoute, { children: _jsx(DashboardPage, {}) }) })] }) }));
}
export default App;
