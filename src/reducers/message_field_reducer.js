import {
    MESSAGE_FIELD
} from '../actions/types';

export default function(state = {}, action){
    // eslint-disable-next-line
    switch(action.type){
        case MESSAGE_FIELD:
            return { ...state, messageField: action.payload };
    }
    return state;
}