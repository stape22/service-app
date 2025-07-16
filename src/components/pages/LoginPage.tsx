import React, { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
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
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Don't have an account?{' '}
          <Link 
            to="/signup" 
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Sign up here
          </Link>
        </p>
      </div>
    </AuthPageTemplate>
  );
}; 