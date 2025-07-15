import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import { FormGroup } from './FormGroup';
import { Input } from '../atoms/Input';

describe('FormGroup', () => {
  it('renders label and children', () => {
    render(
      <FormGroup label="Email" htmlFor="email">
        <Input id="email" />
      </FormGroup>
    );
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });
  it('renders help text', () => {
    render(
      <FormGroup label="Email" helpText="We will not share your email.">
        <Input />
      </FormGroup>
    );
    expect(screen.getByText('We will not share your email.')).toBeInTheDocument();
  });
  it('renders error text', () => {
    render(
      <FormGroup label="Email" errorText="Email is required.">
        <Input />
      </FormGroup>
    );
    expect(screen.getByText('Email is required.')).toBeInTheDocument();
  });
}); 