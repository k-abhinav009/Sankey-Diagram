import { combineReducers } from 'redux';
import chartData from './chartDataSlice';

const rootReducer = combineReducers({
    chartData
});

export default rootReducer;