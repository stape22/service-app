import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import { Button } from './Button';
describe('Button', () => {
    it('renders children', () => {
        render(_jsx(Button, { children: "Click me" }));
        expect(screen.getByText('Click me')).toBeInTheDocument();
    });
});
