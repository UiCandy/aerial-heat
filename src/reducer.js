import * as actions from './actions';

export const reducer = (state, action) => {
  switch (action.type) {
    case actions.GET_DATA_REQUESTED:
      return { ...state, isLoading: true };
    case actions.GET_DATA_DONE:
      if(action.payload[0].capital){
        return { ...state, isLoading: false, countries: action.payload };
      }
      else{
        return { ...state, isLoading: false, flights: action.payload };
      }
    case actions.GET_DATA_FAILED:
      return { ...state, isLoading: false, isError: true }
    default:
      return state;
  }
};