import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import { FormGroup } from './FormGroup';
import { Input } from '../atoms/Input';
describe('FormGroup', () => {
    it('renders label and children', () => {
        render(_jsx(FormGroup, { label: "Email", htmlFor: "email", children: _jsx(Input, { id: "email" }) }));
        expect(screen.getByText('Email')).toBeInTheDocument();
        expect(screen.getByRole('textbox')).toBeInTheDocument();
    });
    it('renders help text', () => {
        render(_jsx(FormGroup, { label: "Email", helpText: "We will not share your email.", children: _jsx(Input, {}) }));
        expect(screen.getByText('We will not share your email.')).toBeInTheDocument();
    });
    it('renders error text', () => {
        render(_jsx(FormGroup, { label: "Email", errorText: "Email is required.", children: _jsx(Input, {}) }));
        expect(screen.getByText('Email is required.')).toBeInTheDocument();
    });
});
