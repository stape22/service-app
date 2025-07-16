import React from 'react';
import { NavItem } from '../molecules/NavItem';
import { Button } from '../atoms/Button';
import { Link } from 'react-router-dom';

export interface TopNavProps {
  userName?: string;
  currentPage?: string;
  onPageChange?: (page: string) => void;
  onChatToggle?: () => void;
  onMenuToggle?: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({ 
  userName, 
  currentPage, 
  onPageChange, 
  onChatToggle,
  onMenuToggle 
}) => (
  <nav className="bg-white shadow-sm border-b border-gray-200 px-4 py-3" role="navigation" aria-label="Main navigation">
    <div className="flex items-center justify-between">
      {/* Left side - Logo and mobile menu button */}
      <div className="flex items-center">
        {/* Mobile menu button */}
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        
        {/* Logo */}
        <Link to="/dashboard" className="text-xl font-bold tracking-tight text-gray-900 ml-2 lg:ml-0">
          ServiceApp
        </Link>
      </div>

      {/* Center - Navigation items (hidden on mobile) */}
      <div className="hidden lg:flex items-center space-x-4">
        <NavItem to="/dashboard/jobs" label="Jobs" />
        <NavItem to="/dashboard/roofers" label="Roofers" />
        <NavItem to="/dashboard/customers" label="Customers" />
      </div>

      {/* Right side - Chat toggle and user menu */}
      <div className="flex items-center space-x-2">
        {/* Chat toggle button */}
        {onChatToggle && (
          <button
            onClick={onChatToggle}
            className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            title="Toggle chat"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </button>
        )}

        {/* User menu */}
        <div className="relative">
          <Button 
            className="btn-circle btn-ghost"
            title="User menu"
          >
            <span className="sr-only">Open user menu</span>
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">
                {userName ? userName[0].toUpperCase() : '?'}
              </span>
            </div>
          </Button>
          {/* Dropdown menu placeholder */}
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 hidden">
            <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</Link>
            <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</Link>
            <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</button>
          </div>
        </div>
      </div>
    </div>
  </nav>
); 