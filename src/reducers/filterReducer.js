import { createSelector } from 'reselect';
import initialState from '../initialState';
import * as actions from '../actions';


const filterReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.GET_FILTERED_LIST:``
            console.log(action.payload);
            return { ...state, filtered: action.payload }
        default:
            return state;
    }
};

export default filterReducer;