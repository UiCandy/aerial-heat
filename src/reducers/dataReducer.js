import initialState from '../initialState';
import * as actions from '../actions';

const dataReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.GET_DATA_REQUESTED:
            return { ...state, isLoading: true };
        case actions.GET_DATA_DONE:
            console.log(action);
        
            if (action.selector === 'countries') {
                return { ...state, isLoading: false, countries: action.payload };
            }
            else if (action.selector === 'flights') {
                return { ...state, isLoading: false, flights: action.payload };
            }
            else {
                return { ...state, isLoading: false, weather: action.payload };
            }
        case actions.GET_DATA_FAILED:
            return { ...state, isLoading: false, isError: true }
        default:
            return state;
    }
};

export default dataReducer;