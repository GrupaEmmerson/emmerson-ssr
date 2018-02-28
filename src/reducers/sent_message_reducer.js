import {
    GET_SENT_MESSAGE
} from '../actions/types';

export default function(state = {}, action){
    // eslint-disable-next-line
    switch(action.type){
        case GET_SENT_MESSAGE:
            return { ...state, responseMessage: action.payload };
    }
    return state;
}