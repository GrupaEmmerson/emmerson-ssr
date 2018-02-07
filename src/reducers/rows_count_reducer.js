import {
    GET_ROWS_COUNT
} from '../actions/types';

export default function(state = {}, action){
    // eslint-disable-next-line
    switch(action.type){
        case GET_ROWS_COUNT:
            return { ...state, rowsCount: action.payload };
   }
    return state;
}