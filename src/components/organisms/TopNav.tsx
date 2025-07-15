import React from 'react';
import { NavItem } from '../molecules/NavItem';
import { Button } from '../atoms/Button';
import { Link } from 'react-router-dom';

export interface TopNavProps {
  userName?: string;
}

export const TopNav: React.FC<TopNavProps> = ({ userName }) => (
  <nav className="navbar bg-base-100 shadow-sm px-4" role="navigation" aria-label="Main navigation">
    <div className="flex-1">
      <Link to="/dashboard" className="text-xl font-bold tracking-tight">
        ServiceApp
      </Link>
    </div>
    <div className="flex-none gap-2">
      <NavItem to="/dashboard/jobs" label="Jobs" />
      <NavItem to="/dashboard/roofers" label="Roofers" />
      <NavItem to="/dashboard/customers" label="Customers" />
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