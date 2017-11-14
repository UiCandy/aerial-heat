import initialState from '../initialState';
import * as actions from '../actions';


const filterReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.GET_FILTERED_LIST:
            console.log(action.filter);
            return { ...state, filter: action.filter }
        default:
            return state;
    }
};

export default filterReducer;