const INITIAL_STATE = {
    dataLoaded: false,
    data: {},
};
  
function dataLoadedReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "TOGGLE_DATALOADED":
      return {
        ...state,
        dataLoaded: !state.dataLoaded,
        loading: false,
      };
    case "DATA_SUCCESS":
      return {
        ...state,
        data: action.data,
        loading: false,
      };
    default:
      return state;
    case "DATA_LOADING":
      return {
        ...state,
        loading: action.loading,
      };
  }
}

export default dataLoadedReducer;