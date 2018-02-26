import {
    GET_SENT_MESSAGE,
    GET_SENT_ERROR
} from '../actions/types';

export default function(state = {}, action){
    // eslint-disable-next-line
    switch(action.type){
        case GET_SENT_MESSAGE:
            return { ...state, sentMessage: action.payload };
    }
    return state;
}