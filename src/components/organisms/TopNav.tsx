import React from 'react';
import { Button } from '../atoms/Button';
import { Avatar, AvatarFallback } from '../atoms/Avatar';
import { Link, useLocation } from 'react-router-dom';
import { Home, Briefcase, HardHat, Users, MessageCircle, Settings } from 'lucide-react';

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
}) => {
  const location = useLocation();
  
  const getNavButtonClass = (path: string) => {
    const isActive = location.pathname === path || 
      (path === '/dashboard/roofers' && location.pathname.includes('/roofers')) ||
      (path === '/dashboard/customers' && location.pathname.includes('/customers'));
    
    return isActive
      ? "flex items-center space-x-2 text-blue-600 bg-blue-50 rounded-md px-3 py-2"
      : "flex items-center space-x-2 text-gray-600 hover:text-gray-900 px-3 py-2";
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 h-16 flex items-center">
      <div className="flex items-center justify-between w-full">
        {/* Logo and Navigation */}
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-sm"></div>
            </div>
            <Link to="/dashboard" className="text-xl font-semibold text-gray-900">
              ServiceMaster
            </Link>
          </div>
          
          <nav className="flex items-center space-x-6">
            <Link to="/dashboard">
              <Button 
                variant="ghost" 
                className={getNavButtonClass('/dashboard')}
              >
                <Home className="w-4 h-4" />
                <span>Dashboard</span>
              </Button>
            </Link>
            <Link to="/dashboard/jobs">
              <Button 
                variant="ghost" 
                className={getNavButtonClass('/dashboard/jobs')}
              >
                <Briefcase className="w-4 h-4" />
                <span>Jobs</span>
              </Button>
            </Link>
            <Link to="/dashboard/roofers">
              <Button 
                variant="ghost" 
                className={getNavButtonClass('/dashboard/roofers')}
              >
                <HardHat className="w-4 h-4" />
                <span>Roofers</span>
              </Button>
            </Link>
            <Link to="/dashboard/customers">
              <Button 
                variant="ghost" 
                className={getNavButtonClass('/dashboard/customers')}
              >
                <Users className="w-4 h-4" />
                <span>Customers</span>
              </Button>
            </Link>
          </nav>
        </div>

        {/* Right side icons */}
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-gray-600 hover:text-gray-900"
            onClick={onMenuToggle}
          >
            <MessageCircle className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-900">
            <Settings className="w-5 h-5" />
          </Button>
          <Avatar className="w-8 h-8">
            <AvatarFallback className="bg-gray-100 text-gray-600">
              {userName ? userName[0] : 'A'}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}; 