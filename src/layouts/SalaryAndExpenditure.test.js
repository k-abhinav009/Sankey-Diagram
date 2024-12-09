import React from 'react';
import { render, screen } from '@testing-library/react';
import { useSelector } from 'react-redux';
import SankeySalary from './SalaryAndExpenditure';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

jest.mock('../components/Header', () => () => <div>Mock Header</div>);
jest.mock('../components/SankeyDiagram', () => () => <div>Mock SankeyDiagram</div>);
jest.mock('./UpdateSalaryAndExpenditure', () => () => <div>Mock UpdateData</div>);
jest.mock('../utils', () => ({
  transformDataForSankey: jest.fn(() => ({ transformed: true })),
}));

describe('SankeySalary Component', () => {
  it('renders loading state', () => {
    useSelector.mockReturnValueOnce({ loading: true, inflows: [] });
    render(<SankeySalary />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('renders main content when data is loaded', () => {
    useSelector.mockReturnValueOnce({
      loading: false,
      inflows: [{ id: 1, value: 100 }],
      outflows: [{ id: 2, value: 50 }],
    });

    render(<SankeySalary />);
    expect(screen.getByText(/Mock Header/i)).toBeInTheDocument();
    expect(screen.getByText(/Mock SankeyDiagram/i)).toBeInTheDocument();
    expect(screen.getByText(/Mock UpdateData/i)).toBeInTheDocument();
  });
});