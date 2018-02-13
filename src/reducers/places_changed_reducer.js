import {
    GET_PLACES_CHANGED
} from '../actions/types';

export default function(state = {}, action){
    // eslint-disable-next-line
    switch(action.type){
        case GET_PLACES_CHANGED:
            return { ...state, placesChanged: action.payload };
   }
    return state;
}