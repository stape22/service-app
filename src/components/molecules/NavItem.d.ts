import React from 'react';
export interface NavItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    to: string;
    label: string;
    icon?: React.ReactNode;
    exact?: boolean;
}
export declare const NavItem: React.FC<NavItemProps>;
