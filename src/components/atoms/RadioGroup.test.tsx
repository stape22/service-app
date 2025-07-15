import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { RadioGroup } from './RadioGroup';
import type { RadioGroupOption } from './RadioGroup';
import { vi } from 'vitest';

describe('RadioGroup', () => {
  const options: RadioGroupOption[] = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
  ];

  it('renders with label', () => {
    render(
      <RadioGroup label="Choose one" options={options} value="1" onChange={() => {}} />
    );
    expect(screen.getByText('Choose one')).toBeInTheDocument();
  });

  it('shows error message', () => {
    render(
      <RadioGroup label="Choose one" options={options} value="1" onChange={() => {}} error="Required" />
    );
    expect(screen.getByText('Required')).toBeInTheDocument();
  });

  it('calls onChange when a radio is selected', () => {
    const handleChange = vi.fn();
    render(
      <RadioGroup label="Choose one" options={options} value="1" onChange={handleChange} />
    );
    const radio = screen.getByLabelText('Option 2');
    fireEvent.click(radio);
    expect(handleChange).toHaveBeenCalledWith('2');
  });
}); 