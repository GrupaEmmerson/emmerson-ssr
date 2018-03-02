import {
    SENT_CHECK
} from '../actions/types';

export default function(state = {}, action){
    // eslint-disable-next-line
    switch(action.type){
        case SENT_CHECK:
            return { ...state, sentCheck: action.payload };
    }
    return state;
}