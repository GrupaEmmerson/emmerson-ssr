import {
    MESSAGE_RESET
} from '../actions/types';

export default function(state = {}, action){
    // eslint-disable-next-line
    switch(action.type){
        case MESSAGE_RESET:
            return { ...state, resetForm: action.payload };
    }
    return state;
}