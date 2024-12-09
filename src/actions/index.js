export const FETCH_SANKEY_DATA = 'FETCH_SANKEY_DATA';
export const SET__DATA = 'SET__DATA';
export const DATA_FAILED = 'DATA_FAILED';
export const ADD_CHART_DATA    = 'ADD_CHART_DATA';
export const EDIT_CHART_DATA    = 'EDIT_CHART_DATA'
export const DELETE_CHART_DATA  = 'DELETE_CHART_DATA'

export const fetchSankeyData = () => (
  {
  type: FETCH_SANKEY_DATA,
});

export const setSankeyData = (data) => ({
  type: SET__DATA,
  data,
});

export const sankeyDataFailed = (error) => ({
  type: DATA_FAILED,
  error,
});

export const addChartData =(data)=>({
  type: ADD_CHART_DATA,
  data
})

export const editChartData =(data)=>({
  type: EDIT_CHART_DATA,
  data
})

export const deleteChartData = (data)=>({
  type:DELETE_CHART_DATA,
  data
})