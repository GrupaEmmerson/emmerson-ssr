import {
    GET_LOCATION
} from '../actions/types';

export default function(state = {}, action){
    // eslint-disable-next-line
    switch(action.type){
        case GET_LOCATION:
            return { ...state, location: action.payload };
   }
    return state;
}