import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { JobsTable } from './JobsTable';
import type { JobData } from './JobsTable';
import { vi } from 'vitest';

describe('JobsTable', () => {
  const jobs: JobData[] = [
    { id: '#1', date: '2025-01-01', jobType: 'Install', status: 'scheduled', roofer: 'Roofer A', address: '123 Main', customer: 'Alice' },
    { id: '#2', date: '2025-01-02', jobType: 'Repair', status: 'completed', roofer: 'Roofer B', address: '456 Oak', customer: 'Bob' },
  ];

  it('renders job rows', () => {
    render(<JobsTable />);
    expect(screen.getByText('#318')).toBeInTheDocument();
    // Use getAllByText for duplicate values
    expect(screen.getAllByText('Install').length).toBeGreaterThan(0);
    expect(screen.getByText('Mike Johnson')).toBeInTheDocument();
  });

  it('calls onEditJob when a row is clicked', () => {
    const handleEdit = vi.fn();
    render(<JobsTable onEditJob={handleEdit} />);
    const row = screen.getByText('#318').closest('tr');
    if (row) fireEvent.click(row);
    expect(handleEdit).toHaveBeenCalledWith('#318');
  });
}); 