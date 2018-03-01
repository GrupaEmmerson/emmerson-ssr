/*global google*/
import React from 'react';
import { Input } from "reactstrap";
import * as actions from '../../actions';
import { connect } from 'react-redux';
import {GOOGLE_API_KEY} from "../../config/parameters";
const { compose, withProps, lifecycle } = require("recompose");
const {
    withScriptjs,
} = require("react-google-maps");
const { StandaloneSearchBox } = require("react-google-maps/lib/components/places/StandaloneSearchBox");

const mapStateToProps = state => ({
    viewport: state.viewport.viewport,
    location: state.location.location,
    offers: state.offers.offers,
    isLoaded: state.isLoaded.isLoaded,
    placesChanged: state.placesChanged.placesChanged
});

export const SearchField = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key="+GOOGLE_API_KEY+"&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        actions
    }),
    lifecycle({
        componentWillMount() {
            const refs = {};
            this.setState({
                places: [],
                onSearchBoxMounted: ref => {
                    refs.searchBox = ref;
                },
                onPlacesChanged: () => {
                    let street = '';
                    let district = '';
                    let city = '';
                    const places = refs.searchBox.getPlaces();
                    const bounds = new google.maps.LatLngBounds();
                    if(places){
                        places.forEach(place => {
                            if(place.address_components){
                                if(place.address_components[0].types[0] === 'route'){
                                    street = place.address_components[0].long_name;
                                    city =  place.address_components[1].long_name;
                                }
                                if(place.address_components[0].types[0] === 'sublocality_level_1'){
                                    district = place.address_components[0].long_name;
                                    city =  place.address_components[1].long_name;
                                }
                                if(place.address_components[0].types[0] === 'locality'){
                                    city =  place.address_components[0].long_name;
                                }
                            }
                            else{
                                if(place.types[0] === 'locality'){
                                    city = place.name
                                }
                                if(place.types[0] === 'route'){
                                    street = place.name
                                }
                                if(place.types[0] === 'sublocality_level_1'){
                                    district = place.name
                                }
                            }
                        })
                    }

                    let placesSearch = {street: street, district: district,city: city};
                    this.props.setSearchLocation(placesSearch);
                    places.forEach(place => {
                        if (place.geometry.viewport) {
                            bounds.union(place.geometry.viewport)
                        } else {
                            bounds.extend(place.geometry.location)
                        }
                    });
                    this.props.setPlacesChanged(places);
                    this.setState({
                        places,
                        bounds
                    });
                },
            })
        },
    }),
    withScriptjs,
    connect(mapStateToProps, actions)
)(props => {
    return(
        <StandaloneSearchBox
            ref={props.onSearchBoxMounted}
            bounds={props.bounds}
            onPlacesChanged={props.onPlacesChanged}
        >
            <Input type="text" className='custom_inputs' placeholder='Lokalizacja' name={props.name} />
        </StandaloneSearchBox>
    )
}


);
