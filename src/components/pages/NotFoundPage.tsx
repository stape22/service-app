import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../atoms/Button';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center">
            <div className="text-gray-500 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33" />
              </svg>
            </div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">Page Not Found</h1>
            <p className="text-gray-600 mb-6">
              Sorry, we couldn't find the page you're looking for.
            </p>
            <div className="space-y-3">
              <Link to="/dashboard">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Go to Dashboard
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" className="w-full">
                  Go to Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};