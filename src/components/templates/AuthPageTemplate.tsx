import React from 'react';

interface AuthPageTemplateProps {
  title: string;
  children: React.ReactNode;
  subtitle?: string;
}

export const AuthPageTemplate: React.FC<AuthPageTemplateProps> = ({ 
  title, 
  children, 
  subtitle 
}) => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
    <div className="w-full max-w-md">
      {/* Logo/Branding Section */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
        {subtitle && (
          <p className="text-gray-600 text-sm">{subtitle}</p>
        )}
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
        {children}
      </div>

      {/* Footer */}
      <div className="text-center mt-6">
        <p className="text-gray-500 text-sm">
          © 2024 Service Industry App. All rights reserved.
        </p>
      </div>
    </div>
  </div>
); 