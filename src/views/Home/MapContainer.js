/*global google*/
import React from 'react';
import {
    withGoogleMap,
    GoogleMap,
    withScriptjs,
    Marker,
    InfoWindow,
} from "react-google-maps";
import SearchBox from "react-google-maps/lib/components/places/SearchBox";
import * as actions from '../../actions';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { Input } from "reactstrap";

const { compose, withProps, lifecycle} = require("recompose");
const _ = require("lodash");

const mapStateToProps = state => ({
    viewport: state.viewport.viewport,
    location: state.location.location,
    offers: state.offers.offers,
    isLoaded: state.isLoaded.isLoaded,
    placesChanged: state.placesChanged.placesChanged
});

export const MapWithASearchBox = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBA9X1FA_bOugQ9pK8uoO9dK7WXHM_-zE8&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }}/>,
        containerElement: <div style={{ height: `100%`}}/>,
        mapElement: <div style={{ height: `100%` }}/>,
        actions
    }),
    lifecycle({
        componentWillMount() {
            const refs = {};
            this.setState({
                bounds: null,
                center: {
                    lat: 52.2209732, lng: 21.0118365
                },
                markers: [],
                markersOffer: [],
                searchTerm: '',
                checkLocation: '',
                isChange: false,
                onMapMounted: ref => {
                    refs.map = ref;
                    if(this.props.placesChanged){
                        const places = this.props.placesChanged;
                        const bounds = new google.maps.LatLngBounds();
                        places.forEach(place => {
                            if (place.geometry.viewport) {
                                bounds.union(place.geometry.viewport)
                            } else {
                                bounds.extend(place.geometry.location)
                            }
                        });
                        refs.map.fitBounds(bounds);

                        const minLat = bounds.f.b;
                        const maxLat = bounds.f.f;
                        const minLng = bounds.b.b;
                        const maxLng = bounds.b.f;

                        this.props.actions.setLocation({arguments:{minLatitude:minLat, maxLatitude: maxLat, minLongitude: minLng, maxLongitude: maxLng}});
                        this.props.actions.setIsLoaded(false);
                    }
                },
                onSearchBoxMounted: ref => {
                    refs.searchBox = ref;
                },
                onPlacesChanged: () => {
                    let street = '';
                    let district = '';
                    let city = '';

                    const searchPlaces = refs.searchBox.getPlaces();
                    this.props.setPlacesChanged(searchPlaces);
                    const places = this.props.placesChanged;
                    console.log(places);

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
                    const bounds = new google.maps.LatLngBounds();

                    places.forEach(place => {
                        if (place.geometry.viewport) {
                            bounds.union(place.geometry.viewport)
                        } else {
                            bounds.extend(place.geometry.location)
                        }
                    });
                    const nextMarkers = places.map(place => ({

                        position: place.address_components ? place.geometry.location : null,

                    }));
                    const nextCenter = _.get(nextMarkers, '0.position', this.state.center);

                    this.setState({
                        center: nextCenter,
                        markers: nextMarkers,
                    });
                    refs.map.fitBounds(bounds);
                },
                onSelectMarker: (marker, index, props) => {
                    props.setViewport({index: index, position: marker});
                },
                onCloseOverlay: (props) => {
                    props.setViewport({index: null, position: null});
                },
                onZoomSetBounds: (props) => {
                    this.setState({mapBounds: refs.map.getBounds()});

                    if(props.isLoaded){
                        const minLat = this.state.mapBounds.f.b;
                        const maxLat = this.state.mapBounds.f.f;
                        const minLng = this.state.mapBounds.b.b;
                        const maxLng = this.state.mapBounds.b.f;

                        props.setLocation({arguments:{minLatitude:minLat, maxLatitude: maxLat, minLongitude: minLng, maxLongitude: maxLng}});
                        props.setIsLoaded(false);
                        this.setState({checkLocation: props.location});
                    }
                }
            });
        },
    }),
    withScriptjs,
    withGoogleMap,
    connect(mapStateToProps, actions)
)(props =>
        <GoogleMap
            ref={props.onMapMounted}
            defaultZoom={12}
            center={props.center}
            onDragEnd={() => setTimeout(() =>
                {
                    props.onZoomSetBounds(props)
                }, 100)
            }
            onZoomChanged={() => setTimeout(() =>
            {
                props.onZoomSetBounds(props)
            }, 100)
            }
            options={
                {
                    minZoom: 12,
                    maxZoom: 16
                }
            }
        >
            <SearchBox
                ref={props.onSearchBoxMounted}
                bounds={props.bounds}
                controlPosition={google.maps.ControlPosition.TOP_CENTER}
                onPlacesChanged={props.onPlacesChanged}
            >
                <Input type="text" className='custom_inputs search-box' placeholder='Lokalizacja' style={{width: 400+'px', marginTop: 10+'px'}} />
            </SearchBox>
            {props.markers.map((marker, index) =>
                <Marker key={index} position={marker.position} />
            )}
                {props.tableData ? props.tableData.map((e) => {

                    return(
                        <Marker
                            key={e.id}
                            position={{ lat: parseFloat(e.latitude), lng: parseFloat(e.longitude) }}
                            onClick={() => props.onSelectMarker({ lat: parseFloat(e.latitude), lng: parseFloat(e.longitude) }, e.id, props)}
                            icon={'./img/'+e.ico}
                            zIndex={parseInt(e.id, 0)}
                        >
                            {props.viewport && props.viewport.index === e.id &&
                                <InfoWindow
                                    position={props.viewport.position}
                                    onCloseClick={() => props.onCloseOverlay(props)}
                                    options={{}}
                                >

                                <Link to={"/offer/"+e.id} target='_blank'>
                                    <div className='googft-info-window row nopadding a-no-decoration' style={{minWidth: 330+'px', width: 100+'%', margin: 0, padding: 0, minHeight: 100 + 'px', color: '#000'}}>
                                            <div style={{float: 'left'}} className='nopadding'>
                                                <img src={ e.photo_url } style={{width: 150+'px', maxHeight: 100+'px'}} alt={e.number}/>
                                            </div>
                                            <div style={{float: 'left', marginLeft: 20+'px'}}>
                                                <b>Miasto</b> {e.city}<br/>
                                                <b>Nr Oferty:</b> {e.number}<br/>
                                                <b>Rodzaj:</b> {e.item}<br/>
                                                <b>Cena:</b> {e.price}<br/>
                                                <b>Cena za m<sup>2</sup>:</b> {e.price_per_m2}<br/>
                                            </div>
                                        </div>
                                </Link>
                                </InfoWindow>
                            }
                        </Marker>);
                }) : ''}
        </GoogleMap>
);

