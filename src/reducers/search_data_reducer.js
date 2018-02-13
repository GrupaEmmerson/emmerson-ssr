import {
    GET_SEARCH_DATA
} from '../actions/types';

export default function(state = {}, action){
    // eslint-disable-next-line
    switch(action.type){
        case GET_SEARCH_DATA:
            return { ...state, searchData: action.payload };
    }
    return state;
}