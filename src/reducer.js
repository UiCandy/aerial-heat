import { routerReducer } from 'react-router-redux';
import { createSelector } from 'reselect';
import * as actions from './actions';
import { combineReducers } from 'redux';
import initialState from './initialState';
import filterReducer from "./reducers/filterReducer";
import dataReducer from "./reducers/dataReducer";

export const reducer = combineReducers({
  filterReducer,
  dataReducer,
  routing: routerReducer
});


