import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import { LoginPage } from './components/pages/LoginPage';
import { SignupPage } from './components/pages/SignupPage';
import { useAuth } from './context/AuthContext';
import { DashboardPage } from './components/pages/DashboardPage';

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
      </Routes>
    </Router>
  );
}

export default App;
