import React, {Component} from 'react';
import {
    Nav,
    NavItem,
    NavLink,
    NavbarToggler,
    NavbarBrand,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    DropdownToggle
} from 'reactstrap';
import { connect } from 'react-redux';
import * as actions from '../../actions';
let testWeakMap = new WeakMap();

class HeaderMainPage extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggle2 = this.toggle2.bind(this);
    this.toggle3 = this.toggle3.bind(this);
    this.state = {
      dropdownOpen: false,
      dropdownOpen2: false,
      dropdownOpen3: false
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
  toggle2() {
    this.setState({
      dropdownOpen2: !this.state.dropdownOpen2
    });
  }
  toggle3() {
    this.setState({
      dropdownOpen3: !this.state.dropdownOpen3
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
                      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                          <DropdownToggle className="nav-link dropdown-toggle">
                              Usługi dodatkowe
                          </DropdownToggle>
                          <DropdownMenu right className={this.state.dropdownOpen ? 'show' : ''}>
                              <DropdownItem><i className="fa fa-file"></i> Badania i Analizy rynku</DropdownItem>
                              <DropdownItem><i className="fa fa-home"></i> Zarządzanie nieruchomościami</DropdownItem>
                              <DropdownItem><i className="fa fa-image"></i> Aranżacja i wyposażenie wnętrz</DropdownItem>
                              <DropdownItem><i className="fa fa-comments"></i> Obsługa inwestycji</DropdownItem>
                              <DropdownItem><i className="fa fa-legal"></i> Doradztwo gospodarcze</DropdownItem>
                              <DropdownItem><i className="fa fa-building"></i> Inwestowanie w nieruchomości</DropdownItem>
                              <DropdownItem><i className="fa fa-video-camera"></i> Marketing i reklama</DropdownItem>
                              <DropdownItem><i className="fa fa-usd"></i> Wyceny nieruchomości</DropdownItem>
                              <DropdownItem><i className="fa fa-lightbulb-o"></i> Inspiracje</DropdownItem>
                          </DropdownMenu>
                      </Dropdown>
                  </NavItem>
                  <NavItem className="px-3 d-md-down-none">
                      <Dropdown isOpen={this.state.dropdownOpen2} toggle={this.toggle2}>
                          <DropdownToggle className="nav-link dropdown-toggle">
                              O Nas
                          </DropdownToggle>
                          <DropdownMenu right className={this.state.dropdownOpen2 ? 'show' : ''}>
                              <DropdownItem><i className="fa fa-info-circle"></i> Misja</DropdownItem>
                              <DropdownItem><i className="fa fa-history"></i> Historia</DropdownItem>
                              <DropdownItem><i className="fa fa-shield"></i> Praca</DropdownItem>
                              <DropdownItem><i className="fa fa-institution"></i> System franczyzowy</DropdownItem>
                              <DropdownItem><i className="fa fa-handshake-o"></i> Nasi partnerzy</DropdownItem>
                          </DropdownMenu>
                      </Dropdown>
                  </NavItem>
                  <NavItem className="px-3 d-md-down-none">
                      <Dropdown isOpen={this.state.dropdownOpen3} toggle={this.toggle3}>
                          <DropdownToggle className="nav-link dropdown-toggle">
                              Kontakt
                          </DropdownToggle>
                          <DropdownMenu right className={this.state.dropdownOpen3 ? 'show' : ''}>
                              <DropdownItem><i className="fa fa-map"></i> Nasze biura</DropdownItem>
                              <DropdownItem><i className="fa fa-phone"></i> Napisz do nas</DropdownItem>
                          </DropdownMenu>
                      </Dropdown>
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
