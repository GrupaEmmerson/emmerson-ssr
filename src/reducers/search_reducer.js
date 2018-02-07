import {
    GET_SEARCH
} from '../actions/types';

export default function(state = {}, action){
    // eslint-disable-next-line
    switch(action.type){
        case GET_SEARCH:
            return { ...state, search: action.payload };
    }
    return state;
}