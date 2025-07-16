import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import { LoginPage } from './components/pages/LoginPage';
import { SignupPage } from './components/pages/SignupPage';
import { useAuth } from './context/AuthContext';
import { DashboardPage } from './components/pages/DashboardPage';
import { JobsPage } from './components/pages/JobsPage';
import { RoofersPage } from './components/pages/RoofersPage';
import { CustomersPage } from './components/pages/CustomersPage';
import { NotFoundPage } from './components/pages/NotFoundPage';
function RootRedirect() {
    const { user, loading } = useAuth();
    if (loading)
        return null; // or a loading spinner
    return _jsx(Navigate, { to: user ? '/dashboard' : '/login', replace: true });
}
function App() {
    return (_jsx(Router, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(RootRedirect, {}) }), _jsx(Route, { path: "/login", element: _jsx(LoginPage, {}) }), _jsx(Route, { path: "/signup", element: _jsx(SignupPage, {}) }), _jsx(Route, { path: "/dashboard", element: _jsx(ProtectedRoute, { children: _jsx(DashboardPage, {}) }) }), _jsx(Route, { path: "/dashboard/jobs", element: _jsx(ProtectedRoute, { children: _jsx(JobsPage, {}) }) }), _jsx(Route, { path: "/dashboard/roofers", element: _jsx(ProtectedRoute, { children: _jsx(RoofersPage, {}) }) }), _jsx(Route, { path: "/dashboard/customers", element: _jsx(ProtectedRoute, { children: _jsx(CustomersPage, {}) }) }), _jsx(Route, { path: "*", element: _jsx(NotFoundPage, {}) })] }) }));
}
export default App;
