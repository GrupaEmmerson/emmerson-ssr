import React from 'react';
import {
    withGoogleMap,
    GoogleMap,
    withScriptjs,
    Marker,
} from "react-google-maps";
import {GOOGLE_API_KEY} from "../../config/parameters";

const { compose, withProps} = require("recompose");


export const MapOfferContainer = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key="+GOOGLE_API_KEY+"&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }}/>,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }}/>,
    }),
    withScriptjs,
    withGoogleMap
)(props =>
    <GoogleMap
        defaultCenter={ props.markerLocation }
        defaultZoom={12}
        options={
            {
                minZoom: 12,
                maxZoom: 16
            }
        }
    >
        <Marker position={props.markerLocation} icon={'/img/'+props.markerIco}/>
    </GoogleMap>
);

