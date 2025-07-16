import React from 'react';
interface SearchInputProps {
    placeholder?: string;
    value?: string;
    onChange?: (value: string) => void;
    onSearch?: (value: string) => void;
    debounceMs?: number;
    className?: string;
    size?: 'sm' | 'md' | 'lg';
}
export declare const SearchInput: React.FC<SearchInputProps>;
export {};
