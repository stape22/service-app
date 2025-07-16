import React, { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from '../organisms/LoginForm';
import { AuthPageTemplate } from '../templates/AuthPageTemplate';

export const LoginPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/dashboard');
  }, [user, navigate]);

  return (
    <AuthPageTemplate 
      title="Welcome back" 
      subtitle="Sign in to your account to continue"
    >
      <LoginForm />
    </AuthPageTemplate>
  );
}; 