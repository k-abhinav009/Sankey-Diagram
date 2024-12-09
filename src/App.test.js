import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import App from './App';
import { fetchSankeyData } from './actions';

jest.mock('./actions', () => ({
  fetchSankeyData: jest.fn(() => ({ type: 'FETCH_SANKEY_DATA' })),
}));

const mockStore = configureMockStore();
const store = mockStore({});

// test('dispatches fetchSankeyData on render', () => {
//   render(
//     <Provider store={store}>
//       <App />
//     </Provider>
//   );

//   const actions = store.getActions();
//   expect(actions).toContainEqual({ type: 'FETCH_SANKEY_DATA' });
// });

// test('renders SankeySalary component', () => {
//   render(
//     <Provider store={store}>
//       <App />
//     </Provider>
//   );

//   const sankeyElement = screen.getByText(/salary/i); // Adjust based on `SankeySalary` content
//   expect(sankeyElement).toBeInTheDocument();
// });

// test('matches snapshot', () => {
//   const { asFragment } = render(
//     <Provider store={store}>
//       <App />
//     </Provider>
//   );
//   expect(asFragment()).toMatchSnapshot();
// });

test('calls fetchSankeyData', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  expect(fetchSankeyData()).toHaveBeenCalled();
});