import React from 'react';
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
  if (loading) return null; // or a loading spinner
  return <Navigate to={user ? '/dashboard' : '/login'} replace />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RootRedirect />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/jobs" element={
          <ProtectedRoute>
            <JobsPage />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/roofers" element={
          <ProtectedRoute>
            <RoofersPage />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/customers" element={
          <ProtectedRoute>
            <CustomersPage />
          </ProtectedRoute>
        } />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
