import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import App from './App';
import { fetchSankeyData } from './actions';
import ErrorBoundary from "./components/ErrorBoundary";

jest.mock('./actions', () => ({
  fetchSankeyData: jest.fn(() => ({ type: 'FETCH_SANKEY_DATA' })),
}));

const mockStore = configureMockStore();
const store = mockStore({});


