import {
    IS_LOADED
} from '../actions/types';

export default function(state = {}, action){
    // eslint-disable-next-line
    switch(action.type){
        case IS_LOADED:
            return { ...state, isLoaded: action.payload };
    }
    return state;
}