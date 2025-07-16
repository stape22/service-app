import React from 'react';
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
export declare const Avatar: React.FC<AvatarProps>;
export declare const AvatarImage: React.FC<AvatarImageProps>;
export declare const AvatarFallback: React.FC<AvatarFallbackProps>;
