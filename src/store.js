import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
 // Import the reducer
 import rootReducer from './reducer/rootReducer'
import { watchSankeyData } from './sagas'; // Import the saga

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// Create the Redux store with middleware
const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware)
);

// Run the saga middleware
sagaMiddleware.run(watchSankeyData);

export default store;