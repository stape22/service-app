import React, { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { SignupForm } from '../organisms/SignupForm';
import { AuthPageTemplate } from '../templates/AuthPageTemplate';

export const SignupPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/dashboard');
  }, [user, navigate]);

  return (
    <AuthPageTemplate 
      title="Create your account" 
      subtitle="Get started with your free account"
    >
      <SignupForm />
    </AuthPageTemplate>
  );
}; 