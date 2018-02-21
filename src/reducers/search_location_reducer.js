import {
    GET_SEARCH_LOCATION
} from '../actions/types';

export default function(state = {}, action){
    // eslint-disable-next-line
    switch(action.type){
        case GET_SEARCH_LOCATION:
            return { ...state, searchLocation: action.payload };
   }
    return state;
}