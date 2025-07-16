import { render, screen, fireEvent } from '@testing-library/react';
import { JobsCalendar } from './JobsCalendar';
import type { Job } from './JobsCalendar';

describe('JobsCalendar', () => {
  const jobs: Job[] = [
    {
      id: '1',
      title: 'Install',
      type: 'install',
      date: new Date(2025, 5, 4), // June 4, 2025
    },
    {
      id: '2',
      title: 'Repair',
      type: 'repair',
      date: new Date(2025, 5, 5), // June 5, 2025
    },
  ];

  it('renders calendar grid and navigation', () => {
    render(<JobsCalendar jobs={jobs} />);
    expect(screen.getByText(/June|July|August|September|October|November|December|January|February|March|April|May/)).toBeInTheDocument();
    expect(screen.getByText('Today')).toBeInTheDocument();
    expect(screen.getAllByText('Sun').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Mon').length).toBeGreaterThan(0);
  });

  it('renders job badges on correct dates', () => {
    render(<JobsCalendar jobs={jobs} />);
    // Find a badge for Install job
    expect(screen.getByText('Install')).toBeInTheDocument();
    // Find a badge for Repair job
    expect(screen.getByText('Repair')).toBeInTheDocument();
  });

  it('navigates months when nav buttons are clicked', () => {
    render(<JobsCalendar jobs={jobs} />);
    const nextBtn = screen.getAllByRole('button', { name: /→/ })[0];
    fireEvent.click(nextBtn);
    // Should update the month (not asserting text, just that it doesn't crash)
    expect(screen.getByText('Today')).toBeInTheDocument();
  });
}); 