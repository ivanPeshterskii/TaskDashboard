import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import StatsBar from './StatsBar';

describe('StatsBar', () => {
  it('renders correct task counts', () => {
    const tasks = [
      { id: 1, title: 'A', description: '', priority: 'Low', status: 'To Do' },
      { id: 2, title: 'B', description: '', priority: 'Medium', status: 'In Progress' },
      { id: 3, title: 'C', description: '', priority: 'High', status: 'Done' },
    ];

    render(<StatsBar tasks={tasks as any} />);

    expect(screen.getByText('To Do: 1')).toBeInTheDocument();
    expect(screen.getByText('In Progress: 1')).toBeInTheDocument();
    expect(screen.getByText('Done: 1')).toBeInTheDocument();
  });
});