import React, { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
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
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <Link 
            to="/login" 
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Sign in here
          </Link>
        </p>
      </div>
    </AuthPageTemplate>
  );
}; 