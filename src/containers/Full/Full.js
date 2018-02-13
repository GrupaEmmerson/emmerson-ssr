import React, {Component} from 'react';
import Header from '../../components/Header/';
import Home from '../../views/Home/';
import Sidebar from '../../components/Sidebar/';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Full extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <div className="app-body">
          <Sidebar {...this.props} searchData={this.props.searchData}/>
          <main className="main">
              <Home/>
          </main>
        </div>
      </div>
    );
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
        searchData: state.searchData.searchData,
        rowsCount: state.rowsCount.rowsCount,
        placesChanged: state.placesChanged.placesChanged
    }
}

export default connect(mapStateToProps, actions)(Full);
