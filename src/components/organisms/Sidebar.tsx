import React from 'react';
import { NavItem } from '../molecules/NavItem';
import { Link } from 'react-router-dom';

export interface SidebarProps {
  className?: string;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  className = '', 
  onClose 
}) => (
  <aside className={["sidebar bg-base-100 border-r border-base-300 min-h-screen w-64 p-4", className].filter(Boolean).join(' ')} role="complementary" aria-label="Sidebar navigation">
    <div className="flex items-center justify-between mb-8">
      <Link to="/dashboard" className="text-2xl font-bold tracking-tight">
        ServiceApp
      </Link>
      {/* Mobile close button */}
      {onClose && (
        <button
          onClick={onClose}
          className="lg:hidden btn btn-ghost btn-sm"
          aria-label="Close sidebar"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
    <nav className="flex flex-col gap-2">
      <NavItem to="/dashboard/jobs" label="Jobs" />
      <NavItem to="/dashboard/roofers" label="Roofers" />
      <NavItem to="/dashboard/customers" label="Customers" />
    </nav>
  </aside>
); 