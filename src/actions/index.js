import {
    GET_LOCATION, GET_VIEWPORT, GET_OFFERS, IS_LOADED, GET_PROPERTIES, GET_SEARCH, GET_ROWS_COUNT,
    GET_PLACES_CHANGED, GET_SEARCH_DATA, GET_SEARCH_LOCATION, GET_SENT_MESSAGE
} from './types';
import axios from 'axios';
import {API_DIR, API_PORT} from "../config/parameters";

export function setLocation(location) {
    return function (dispatch) {
        dispatch({type: GET_LOCATION, payload: location});
    }
}

export function setViewport(location) {
    return function (dispatch) {
        dispatch({type: GET_VIEWPORT, payload: location});
    }
}

export function setOffers(offers) {
    return function (dispatch) {
        dispatch({type: GET_OFFERS, payload: offers});
    }
}

export function setIsLoaded(isLoaded) {
    return function (dispatch) {
        dispatch({type: IS_LOADED, payload: isLoaded});
    }
}

export function setPlacesChanged(places) {

    return function (dispatch) {

        dispatch({type: GET_PLACES_CHANGED, payload: places});

    }
}

export function setSearchProperties(data) {
    return function (dispatch) {
        dispatch({type: GET_PROPERTIES, payload: data});
    }
}

export function setSearch(data) {
    let url = Object.keys(data).map(function(k) {
        return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]).replace(/true/, '1').replace(/false/, '0')
    }).join('&');

    return function (dispatch) {
        dispatch({type: GET_SEARCH, payload: '&'+url});
    }
}

export function setSearchData(data) {


    return function (dispatch) {
        dispatch({type: GET_SEARCH_DATA, payload: data});
    }
}

export function sentMessage(data) {

    return function(dispatch){
        axios({method: 'post', url: API_DIR+API_PORT+`/offer/contact`, data: JSON.stringify(data) })
            .then(response => {
                if(response.status === 201){
                    dispatch({type: GET_SENT_MESSAGE, payload: response.status});
                }
            })
            .catch(function(error){
                dispatch({type: GET_SENT_MESSAGE, payload: error});
            });
    }
}

export function setSearchLocation(data) {
    let url = Object.keys(data).map(function(k) {
        return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]).replace(/true/, '1').replace(/false/, '0')
    }).join('&');

    return function (dispatch) {
        dispatch({type: GET_SEARCH_LOCATION, payload: '&'+url});
    }
}

export function setRowsCount(data) {
    return function (dispatch) {
        dispatch({type: GET_ROWS_COUNT, payload: data});
    }
}