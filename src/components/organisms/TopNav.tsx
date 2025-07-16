import React from 'react';
import { NavItem } from '../molecules/NavItem';
import { Button } from '../atoms/Button';
import { Link } from 'react-router-dom';

export interface TopNavProps {
  userName?: string;
  onMenuToggle?: () => void;
  currentPage?: string;
  onPageChange?: (page: string) => void;
}

export const TopNav: React.FC<TopNavProps> = ({ 
  userName, 
  onMenuToggle, 
  currentPage, 
  onPageChange 
}) => (
  <nav className="navbar bg-base-100 shadow-sm px-4" role="navigation" aria-label="Main navigation">
    <div className="flex-1">
      {/* Mobile menu button */}
      <button
        onClick={onMenuToggle}
        className="lg:hidden btn btn-ghost btn-sm mr-2"
        aria-label="Toggle menu"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      
      <Link to="/dashboard" className="text-xl font-bold tracking-tight">
        ServiceApp
      </Link>
    </div>
    
    {/* Desktop navigation - hidden on mobile */}
    <div className="hidden lg:flex flex-none gap-2">
      <NavItem to="/dashboard/jobs" label="Jobs" />
      <NavItem to="/dashboard/roofers" label="Roofers" />
      <NavItem to="/dashboard/customers" label="Customers" />
    </div>
    
    <div className="flex-none gap-2">
      <div className="dropdown dropdown-end">
        <Button tabIndex={0} className="btn-circle avatar btn-ghost">
          <span className="sr-only">Open user menu</span>
          <div className="w-8 rounded-full bg-base-200 flex items-center justify-center">
            <span className="text-base-content font-bold">{userName ? userName[0] : '?'}</span>
          </div>
        </Button>
        {/* Dropdown menu placeholder */}
        <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-40">
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/settings">Settings</Link></li>
          <li><Button variant="ghost">Logout</Button></li>
        </ul>
      </div>
    </div>
  </nav>
); 