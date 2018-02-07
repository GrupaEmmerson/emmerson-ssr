import {
    GET_PROPERTIES
} from '../actions/types';

export default function(state = {}, action){
    // eslint-disable-next-line
    switch(action.type){
        case GET_PROPERTIES:
            return { ...state, searchProperties: action.payload };
    }
    return state;
}