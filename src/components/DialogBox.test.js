import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DialogBox from './DialogBox';

describe('DialogBox Component', () => {
  const mockOnSubmit = jest.fn();
  const mockOnClose = jest.fn();

  it('renders dialog with title based on type and category', () => {
    render(<DialogBox type="add" category="inflows" onClose={mockOnClose} onSubmit={mockOnSubmit} />);
    expect(screen.getByText('Add inflow')).toBeInTheDocument();
  });

  it('disables save button when fields are incomplete', () => {
    render(<DialogBox type="add" category="inflows" onClose={mockOnClose} onSubmit={mockOnSubmit} />);
    expect(screen.getByText('Save')).toBeDisabled();
  });

  it('enables save button when fields are complete', () => {
    render(<DialogBox type="add" category="inflows" onClose={mockOnClose} onSubmit={mockOnSubmit} />);
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Test Name' } });
    fireEvent.change(screen.getByLabelText('Value'), { target: { value: '123' } });
    fireEvent.change(screen.getByLabelText('Details'), { target: { value: 'Details here' } });
    expect(screen.getByText('Save')).not.toBeDisabled();
  });

  it('calls onSubmit with correct data on save', () => {
    render(<DialogBox type="add" category="inflows" onClose={mockOnClose} onSubmit={mockOnSubmit} />);
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Test Name' } });
    fireEvent.change(screen.getByLabelText('Value'), { target: { value: '123' } });
    fireEvent.change(screen.getByLabelText('Details'), { target: { value: 'Details here' } });
    fireEvent.click(screen.getByText('Save'));
    expect(mockOnSubmit).toHaveBeenCalledWith('add', { name: 'Test Name', value: 123, details: 'Details here', id: '' }, 'inflows', undefined);
  });

  it('closes dialog on cancel', () => {
    render(<DialogBox type="add" category="inflows" onClose={mockOnClose} onSubmit={mockOnSubmit} />);
    fireEvent.click(screen.getByText('Cancel'));
    expect(mockOnClose).toHaveBeenCalled();
  });
});