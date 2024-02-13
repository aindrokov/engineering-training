const INITIAL_STATE = {
    dataLoaded: false,
    data: {},
    loading: false,
    error: "This is an error message!",
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
    case "DATA_FAILURE":
      return {
        ...state,
        error: action.error,
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