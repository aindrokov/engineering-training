const INITIAL_STATE = {
    dataLoaded: false,
};
  
function dataLoadedReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "TOGGLE_DATALOADED":
      return {
        ...state,
        dataLoaded: !state.dataLoaded,
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