import {
  SET__DATA,
  DATA_FAILED,
  ADD_CHART_DATA,
  EDIT_CHART_DATA,
  DELETE_CHART_DATA,
} from "../actions";

const initialState = {
  inflows: [],
  outflows: [],
  loading: false,
  error: null,
};

const chartData = (state = initialState, action) => {
  switch (action.type) {
    case SET__DATA:
      return {
        ...state,
        inflows: action.data.inflows,
        outflows: action.data.outflows,
        loading: false,
        error: null,
      };
    case ADD_CHART_DATA:
      const { newItem, addType, addparent } = action.data;
      let currInflow = [];
      let currOutflow = [];
      if (addType == "inflows") {
        currInflow = state.inflows;
        currInflow.push({ ...newItem, id: Date.now() });
        currOutflow = state.outflows;
      } else {
        currOutflow = state.outflows;
        currInflow = state.inflows;
        if (addparent != null) {
          currOutflow[addparent].children.push({ ...newItem, id: Date.now() });
        } else {
          currOutflow.push({ ...newItem, id: Date.now(), children: [] });
        }
      }
      return {
        ...state,
        inflows: currInflow,
        outflows: currOutflow,
        loading: false,
        error: null,
      };
    case EDIT_CHART_DATA:
      debugger
      const { editItem, type, editParent } = action.data;
      let editedInflow = [];
      let editedOutflows = [];
      if (type == "inflows") {
        editedOutflows = state.outflows;
        editedInflow = state.inflows.map((inflow) =>
          inflow.id === editItem.id ? { ...inflow, ...editItem } : inflow
        );
      } else {
        editedInflow = state.inflows;
        editedOutflows = state.outflows;

        if (editParent!=null) {
          editedOutflows[editParent].children = editedOutflows[
            editParent
          ].children.map((child) =>
            child.id === editItem.id ? { ...child, ...editItem } : child
          );
        } else {
          editedOutflows = editedOutflows.map((outflow) =>
            outflow.id === editItem.id ? { ...outflow, ...editItem } : outflow
          );
        }
      }
      return {
        ...state,
        inflows: editedInflow,
        outflows: editedOutflows,
        loading: false,
        error: null,
      };
    case DELETE_CHART_DATA:
      const { id, deleteParent, deleteType } = action.data;
      let deletedInflows = [];
      let deletedOutflows=[]
      if (deleteType == "inflows") {
        deletedOutflows=state.outflows
        deletedInflows = state.inflows.filter((inflow) => inflow.id !== id);
      } else {
        deletedInflows=state.inflows
        deletedOutflows=state.outflows
        if (deleteParent!=null) {
          deletedOutflows[deleteParent].children = deletedOutflows[
            deleteParent
          ].children.filter((child) => child.id !== id);
        }else{
          deletedOutflows = state.outflows.filter(
            (outflow) => outflow.id !== id
          );
        }
      }
      return {
        ...state,
        inflows: deletedInflows,
        outflows: deletedOutflows,
        loading: false,
        error: null,
      };

    case DATA_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default chartData;
