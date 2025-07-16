import React from 'react';
import { cn } from '../../utils/index';

export interface AvatarProps {
  className?: string;
  children?: React.ReactNode;
}

export interface AvatarImageProps {
  className?: string;
  src?: string;
  alt?: string;
}

export interface AvatarFallbackProps {
  className?: string;
  children?: React.ReactNode;
}

export const Avatar: React.FC<AvatarProps> = ({ 
  className, 
  children,
  ...props 
}) => {
  return (
    <div
      className={cn(
        "relative flex size-10 shrink-0 overflow-hidden rounded-full",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const AvatarImage: React.FC<AvatarImageProps> = ({ 
  className, 
  src, 
  alt,
  ...props 
}) => {
  return (
    <img
      className={cn("aspect-square size-full", className)}
      src={src}
      alt={alt}
      {...props}
    />
  );
};

export const AvatarFallback: React.FC<AvatarFallbackProps> = ({ 
  className, 
  children,
  ...props 
}) => {
  return (
    <div
      className={cn(
        "bg-muted flex size-full items-center justify-center rounded-full",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};