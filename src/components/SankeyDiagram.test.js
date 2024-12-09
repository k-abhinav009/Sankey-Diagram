/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import { render } from '@testing-library/react';
import SankeyDiagram from './SankeyDiagram';

describe('SankeyDiagram Component', () => {
//   it('renders with default props', () => {
//     const { container } = render(<SankeyDiagram data={{ nodes: [], links: [] }} />);
//     // eslint-disable-next-line testing-library/no-node-access
//     expect(container.firstChild).toBeInTheDocument();
//   });

  it('renders nodes and links from data', () => {
    const data = {
      nodes: [{ name: 'Node1' }, { name: 'Node2' }],
      links: [{ source: 0, target: 1, value: 10 }]
    };
    const { getByText } = render(<SankeyDiagram data={data} />);
    expect(getByText('Node1')).toBeInTheDocument();
    expect(getByText('Node2')).toBeInTheDocument();
    expect(getByText('10')).toBeInTheDocument();
  });
});