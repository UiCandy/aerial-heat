import { routerReducer } from 'react-router-redux';
import { createSelector } from 'reselect';
import * as actions from './actions';
import { combineReducers } from 'redux';
import initialState from './initialState';
import filterReducer from "./reducers/filterReducer";
import dataReducer from "./reducers/dataReducer";

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_DATA_REQUESTED:
      return { ...state, isLoading: true };
    case actions.GET_DATA_DONE:
      if (action.selector == 'countries') {
        return { ...state, isLoading: false, countries: action.payload };
      }
      else {
        return { ...state, isLoading: false, flights: action.payload };
      }
    case actions.GET_DATA_FAILED:
      return { ...state, isLoading: false, isError: true }
    case actions.GET_FILTERED_LIST:
      return { ...state, filtered: action.payload }
    default:
      return state;
  }
};


export const reducer = combineReducers({
  filterReducer,
  dataReducer,
  routing: routerReducer
});


