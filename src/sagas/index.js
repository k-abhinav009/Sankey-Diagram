import { takeLatest, call, put } from 'redux-saga/effects';
import { FETCH_SANKEY_DATA, setSankeyData, sankeyDataFailed } from '../actions';
import { fetchMockData } from '../mockApi';
 // Assuming this is your API call function

export function* watchSankeyData() {
  console.log("Watcher is listening for FETCH_SANKEY_DATA");
  yield takeLatest(FETCH_SANKEY_DATA, fetchSankeyDataSaga);
}

function* fetchSankeyDataSaga() {
  try {
    const data = yield call(fetchMockData);
    yield put(setSankeyData(data));
  } catch (error) {
    yield put(sankeyDataFailed(error.message));
  }
}