import React, {Component} from 'react';
import {
  Nav,
  NavItem,
  NavLink,
  NavbarToggler,
  NavbarBrand,
} from 'reactstrap';
import { connect } from 'react-redux';
import * as actions from '../../actions';
let testWeakMap = new WeakMap();

class HeaderMainPage extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

    get state () {
        return testWeakMap.get(this);
    }

    set state (value) {
        testWeakMap.set(this, value);
    }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  sidebarToggle(e) {
      e.preventDefault();
      document.body.classList.toggle('sidebar-hidden');
  }

  mobileSidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-mobile-show');
  }

  render() {
      return (
          <header className="app-header navbar">
              <NavbarToggler className="d-lg-none" onClick={this.mobileSidebarToggle}>&#9776;</NavbarToggler>
              <NavbarBrand href="/"/>

              <Nav className="ml-auto" navbar>
                  <NavItem className="px-3 d-md-down-none" style={{fontSize: 24+'px'}}>
                      <NavLink href="tel:+48222951000"><span className="fa fa-phone"></span> 22 295 10 00</NavLink>
                  </NavItem>
              </Nav>

              <Nav className="ml-auto" navbar>

                  <NavItem className="px-3 d-md-down-none">
                      <NavLink href="#" onClick={()=>{this.props.setSearchProperties('&buy=1&rent=0'); this.props.setIsLoaded(false);}}>Usługi dodatkowe</NavLink>
                  </NavItem>
                  <NavItem className="px-3 d-md-down-none">
                      <NavLink href="#" onClick={()=>{this.props.setSearchProperties('&buy=1&rent=0'); this.props.setIsLoaded(false);}}>O nas</NavLink>
                  </NavItem>
                  <NavItem className="px-3 d-md-down-none">
                      <NavLink href="#" onClick={()=>{this.props.setSearchProperties('&buy=1&rent=0'); this.props.setIsLoaded(false);}}>Kontakt</NavLink>
                  </NavItem>

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

export default connect(mapStateToProps, actions)(HeaderMainPage);
