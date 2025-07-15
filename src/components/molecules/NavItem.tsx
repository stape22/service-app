import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export interface NavItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
  label: string;
  icon?: React.ReactNode;
  exact?: boolean;
}

export const NavItem: React.FC<NavItemProps> = ({
  to,
  label,
  icon,
  exact = false,
  className = '',
  ...props
}) => {
  const location = useLocation();
  const isActive = exact ? location.pathname === to : location.pathname.startsWith(to);
  return (
    <Link
      to={to}
      className={[
        'flex items-center gap-2 px-4 py-2 rounded transition-colors',
        isActive ? 'bg-base-200 text-primary font-semibold' : 'hover:bg-base-100',
        className,
      ].filter(Boolean).join(' ')}
      aria-current={isActive ? 'page' : undefined}
      {...props}
    >
      {icon && <span className="text-lg">{icon}</span>}
      <span>{label}</span>
    </Link>
  );
}; 