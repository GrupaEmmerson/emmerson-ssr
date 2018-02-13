import React, {Component} from 'react';
import {
  Nav,
  NavItem,
  NavLink,
  NavbarBrand,
} from 'reactstrap';
import { connect } from 'react-redux';
import * as actions from '../../actions';
let testWeakMap = new WeakMap();

class HeaderNoSidebar extends Component {

  constructor(props) {
    super(props);

    this.state = {
    };
  }

    get state () {
        return testWeakMap.get(this);
    }

    set state (value) {
        testWeakMap.set(this, value);
    }


  render() {
      return (
          <header className="app-header navbar">

              <NavbarBrand href="/"/>

              <Nav className="ml-auto" navbar>

              </Nav>
          </header>
      )
  }
}

function mapStateToProps(state){
    return {
        location: state.location.location,
        viewport: state.viewport.viewport,
        offers: state.offers.offers,
        isLoaded: state.isLoaded.isLoaded,
        searchProperties: state.searchProperties.searchProperties
    }
}

export default connect(mapStateToProps, actions)(HeaderNoSidebar);
