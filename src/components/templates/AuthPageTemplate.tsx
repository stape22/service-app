import React from 'react';

interface AuthPageTemplateProps {
  title: string;
  children: React.ReactNode;
}

export const AuthPageTemplate: React.FC<AuthPageTemplateProps> = ({ title, children }) => (
  <div className="min-h-screen flex items-center justify-center bg-base-200">
    <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">{title}</h1>
      {children}
    </div>
  </div>
); 