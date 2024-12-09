import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header';

describe('Header Component', () => {
  it('renders title and logo', () => {
    render(<Header title="Test Title" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByAltText('Centime')).toBeInTheDocument();
  });

  it('switches language on dropdown change', () => {
    const { getByRole } = render(<Header title="Test Title" />);
    const dropdown = screen.getByRole('combobox');
    fireEvent.change(dropdown, { target: { value: 'fr' } });
    expect(dropdown.value).toBe('fr');
  });
});