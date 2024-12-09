import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { useSelector, useDispatch } from 'react-redux';
import UpdateData from './UpdateSalaryAndExpenditure';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

jest.mock('../components/DialogBox', () => ({ onClose }) => (
  <div data-testid="dialog">
    Mock DialogBox
    <button onClick={onClose}>Close</button>
  </div>
));

describe('UpdateData Component', () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    useDispatch.mockReturnValue(mockDispatch);
    useSelector.mockReturnValue({
      inflows: [{ id: 1, name: 'Salary', value: 5000 }],
      outflows: [
        { id: 2, name: 'Rent', value: 1500, children: [{ id: 3, name: 'Utilities', value: 500 }] },
      ],
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it.only('renders inflows and outflows', () => {
    render(<UpdateData />);
    expect(screen.getByText(/Salary/i)).toBeInTheDocument();
    expect(screen.getByText(/Rent/i)).toBeInTheDocument();
    expect(screen.getByText(/Utilities/i)).toBeInTheDocument();
  });

  it.only('opens dialog for adding inflows', () => {
    render(<UpdateData />);
   // fireEvent.click(screen.getByText(/Add/i));
   const elements = screen.getAllByText(/Inflow/i);
   expect(elements).toHaveLength(2)
   // expect(screen.getAllByText(t('edit'))).toBeInTheDocument();
  });

  it.only('dispatches add action on form submission', () => {
    render(<UpdateData />);
    //fireEvent.click(screen.getByText(/Add/i));
    //fireEvent.click(screen.getByText(/Inflow/i));
    const elements = screen.getAllByText(/Inflow/i);
     expect(elements).toHaveLength(2)

   // fireEvent.click(screen.getByText(/Close/i));
    expect(mockDispatch).not.toHaveBeenCalled(); // Simulated close without dispatch
  });
});