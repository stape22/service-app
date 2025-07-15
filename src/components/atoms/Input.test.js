import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import { Input } from './Input';
describe('Input', () => {
    it('renders with placeholder', () => {
        render(_jsx(Input, { placeholder: "Type here" }));
        expect(screen.getByPlaceholderText('Type here')).toBeInTheDocument();
    });
});
