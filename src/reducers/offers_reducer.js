import {
    GET_OFFERS
} from '../actions/types';

export default function(state = {}, action){
    // eslint-disable-next-line
    switch(action.type){
        case GET_OFFERS:
            return { ...state, offers: action.payload };
    }
    return state;
}