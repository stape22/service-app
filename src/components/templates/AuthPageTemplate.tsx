import React from 'react';

interface AuthPageTemplateProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export const AuthPageTemplate: React.FC<AuthPageTemplateProps> = ({ 
  title, 
  subtitle, 
  children 
}) => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
    <div className="w-full max-w-md">
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">{title}</h1>
          {subtitle && (
            <p className="text-slate-600 text-sm">{subtitle}</p>
          )}
        </div>
        {children}
      </div>
    </div>
  </div>
); 