import React, {Component} from "react";

import { connect } from 'react-redux';
import * as actions from '../../actions';
import { MapWithASearchBox } from './MapContainer'
import OffersView from "./OffersView";

let testWeakMap = new WeakMap();

class Home extends Component {

    constructor (props) {
        super(props);
        this.state = {
            markers: [],
            viewport: [],
            latitude: 52.2209732,
            longitude: 21.0118365,
            checkLocation: '',
            maxLatitude: 52.321709857270186,
            minLatitude: 52.12000751685476,
            maxLongitude: 21.186587781738353,
            minLongitude: 20.83708521826179
        };

    }

    get state () {
        return testWeakMap.get(this);
    }

    set state (value) {
        testWeakMap.set(this, value);
    }

    componentDidMount() {

        const searchProperties = this.props.searchProperties !== undefined ? this.props.searchProperties : '';
        const search = this.props.search !== undefined ? this.props.search : '&priceFrom=0&priceTo=999999999&priceM2From=0&priceM2To=999999999&primaryMarket=0&secondaryMarket=1&commercialMarket=0&flatType=1&houseType=0&plotType=0&hallType=0&commercialUnitType=0&officeType=0&exclusive=0&zeroPercent=0';

        const apiUrl = `http://api-www.emmerson.pl/offers?` +
            'minLatitude=' + parseFloat(this.state.minLatitude) +
            '&maxLatitude=' + parseFloat(this.state.maxLatitude) +
            '&minLongitude=' + parseFloat(this.state.minLongitude) +
            '&maxLongitude=' + parseFloat(this.state.maxLongitude) + searchProperties + search;

        const url = [apiUrl].join("");
        fetch(url)
            .then(res => res.json())
            .then(response => {
                this.props.setOffers({tableData: response});
            });

        this.props.setRowsCount(20);
        this.props.setIsLoaded(true);

    }

    componentDidUpdate(){
        if(this.props.isLoaded === false){
            this.props.setRowsCount(0);
            const searchProperties = this.props.searchProperties !== undefined ? this.props.searchProperties : '';
            const search = this.props.search !== undefined ? this.props.search : '';
            setTimeout(()=>{
                let apiUrl = null;
                if(!this.props.location)
                {
                     apiUrl = `http://api-www.emmerson.pl/offers?` +
                        'minLatitude=' + parseFloat(this.state.minLatitude) +
                        '&maxLatitude=' + parseFloat(this.state.maxLatitude) +
                        '&minLongitude=' + parseFloat(this.state.minLongitude) +
                        '&maxLongitude=' + parseFloat(this.state.maxLongitude) + searchProperties + search;
                }
                else
                {
                     apiUrl = `http://api-www.emmerson.pl/offers?`+
                        'minLatitude='+ parseFloat(this.props.location.arguments.minLatitude) +
                        '&maxLatitude='+ parseFloat(this.props.location.arguments.maxLatitude) +
                        '&minLongitude='+ parseFloat(this.props.location.arguments.minLongitude) +
                        '&maxLongitude='+ parseFloat(this.props.location.arguments.maxLongitude) + searchProperties + search;
                }

                const url = [apiUrl].join("");
                fetch(url)
                    .then(res => res.json())
                    .then(response => {
                        this.props.setOffers({tableData: response});
                    });

                this.props.setIsLoaded(true);
                setTimeout(()=>{
                    this.props.setRowsCount(20);},2000);
            },100);
        }
    }

    render() {
        if(!this.props.offers)
            return(
                <div className='vertical-center'>
                    <div className='loader' style={{margin: 'auto'}}>

                    </div>
                </div>
            );
        return (
            <div className='container-fluid' style={{margin: 0, paddingLeft: 15, paddingRight: 15}}>
                <div className="row">
                    <div className="col-lg-9 col-md-12 col-sm-12 nopadding" id="left">
                        <MapWithASearchBox viewport={this.props.viewport} tableData={this.props.offers.tableData} placesChanged={this.props.placesChanged} {...this.props}/>
                    </div>
                    <div className="col-lg-3 col-md-12 col-sm-12 nopadding right-bar" style={{float: 'left'}}>
                        <OffersView tableData={this.props.offers.tableData} count={this.props.rowsCount}/>
                    </div>
                </div>
            </div>
        )
    }

}

function mapStateToProps(state){
    return {
        location: state.location.location,
        viewport: state.viewport.viewport,
        offers: state.offers.offers,
        isLoaded: state.isLoaded.isLoaded,
        searchProperties: state.searchProperties.searchProperties,
        search: state.search.search,
        rowsCount: state.rowsCount.rowsCount,
        placesChanged: state.placesChanged.placesChanged
    }
}

export default connect(mapStateToProps, actions)(Home);