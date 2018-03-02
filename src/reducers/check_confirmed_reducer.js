import {
    CHECK_CONFIRMED
} from '../actions/types';

export default function(state = {}, action){
    // eslint-disable-next-line
    switch(action.type){
        case CHECK_CONFIRMED:
            return { ...state, checkConfirmed: action.payload };
    }
    return state;
}