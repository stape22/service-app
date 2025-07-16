import React from 'react';
import { NavItem } from '../molecules/NavItem';
import { Link } from 'react-router-dom';

export interface SidebarProps {
  className?: string;
  currentPage?: string;
  onPageChange?: (page: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  className = '', 
  currentPage, 
  onPageChange 
}) => (
  <aside className={["sidebar bg-base-100 border-r border-base-300 min-h-screen w-64 p-4", className].filter(Boolean).join(' ')} role="complementary" aria-label="Sidebar navigation">
    <div className="mb-8">
      <Link to="/dashboard" className="text-2xl font-bold tracking-tight">
        ServiceApp
      </Link>
    </div>
    <nav className="flex flex-col gap-2">
      <NavItem to="/dashboard/jobs" label="Jobs" />
      <NavItem to="/dashboard/roofers" label="Roofers" />
      <NavItem to="/dashboard/customers" label="Customers" />
    </nav>
  </aside>
); 