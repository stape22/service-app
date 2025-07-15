import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { MessageCircle, Settings, Home, Briefcase, Users, HardHat } from "lucide-react";

type CurrentPage = 'dashboard' | 'jobs' | 'roofers' | 'customers' | 'add-roofer' | 'edit-roofer' | 'add-customer' | 'edit-customer';

interface HeaderProps {
  onChatToggle: () => void;
  currentPage: CurrentPage;
  onPageChange: (page: CurrentPage) => void;
}

export function Header({ onChatToggle, currentPage, onPageChange }: HeaderProps) {
  const getNavButtonClass = (page: CurrentPage) => {
    const isActive = currentPage === page || 
      (page === 'roofers' && (currentPage === 'add-roofer' || currentPage === 'edit-roofer')) ||
      (page === 'customers' && (currentPage === 'add-customer' || currentPage === 'edit-customer'));
    
    return isActive
      ? "flex items-center space-x-2 text-blue-600 bg-blue-50"
      : "flex items-center space-x-2 text-gray-600 hover:text-gray-900";
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
            <span className="text-xl font-semibold text-gray-900">ServiceMaster</span>
          </div>
          
          <nav className="flex items-center space-x-6">
            <Button 
              variant="ghost" 
              className={getNavButtonClass('dashboard')}
              onClick={() => onPageChange('dashboard')}
            >
              <Home className="w-4 h-4" />
              <span>Dashboard</span>
            </Button>
            <Button 
              variant="ghost" 
              className={getNavButtonClass('jobs')}
              onClick={() => onPageChange('jobs')}
            >
              <Briefcase className="w-4 h-4" />
              <span>Jobs</span>
            </Button>
            <Button 
              variant="ghost" 
              className={getNavButtonClass('roofers')}
              onClick={() => onPageChange('roofers')}
            >
              <HardHat className="w-4 h-4" />
              <span>Roofers</span>
            </Button>
            <Button 
              variant="ghost" 
              className={getNavButtonClass('customers')}
              onClick={() => onPageChange('customers')}
            >
              <Users className="w-4 h-4" />
              <span>Customers</span>
            </Button>
          </nav>
        </div>

        {/* Right side icons */}
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-gray-600 hover:text-gray-900"
            onClick={onChatToggle}
          >
            <MessageCircle className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-900">
            <Settings className="w-5 h-5" />
          </Button>
          <Avatar className="w-8 h-8">
            <AvatarImage src="/api/placeholder/32/32" alt="Alex" />
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}