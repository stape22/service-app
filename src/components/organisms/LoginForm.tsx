import React, { useState } from 'react';
import { AuthForm } from '../molecules/AuthForm';
import { Input } from '../atoms/Input';
import { Label } from '../atoms/Label';
import { useAuth } from '../../context/AuthContext';

export const LoginForm: React.FC = () => {
  const { login, loading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError(null);
    
    if (!email || !password) {
      setFormError('Email and password are required.');
      return;
    }
    
    await login(email, password);
  };

  const errorText = formError || error || undefined;

  return (
    <AuthForm
      onSubmit={handleSubmit}
      errorText={errorText}
      loading={loading}
      submitLabel="Sign In"
      showSignupLink={true}
      {...(errorText ? { errorTestId: 'login-error' } : {})}
    >
      <div className="space-y-2">
        <Label htmlFor="email" className="text-slate-700">
          Email address
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="Enter your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="w-full"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="password" className="text-slate-700">
          Password
        </Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="Enter your password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className="w-full"
        />
      </div>
    </AuthForm>
  );
}; 