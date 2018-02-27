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
    this.toggle4 = this.toggle4.bind(this);
    this.state = {
      dropdownOpen: false,
      dropdownOpen2: false,
      dropdownOpen3: false,
      dropdownOpen4: false
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
  toggle4() {
    this.setState({
      dropdownOpen4: !this.state.dropdownOpen4
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
                              <NavLink href="https://emmerson.pl/pl/article/1/badania-i-analizy-rynku">
                                  <DropdownItem><i className="fa fa-file"></i> Badania i Analizy rynku</DropdownItem>
                              </NavLink>
                              <NavLink href="http://emmerson-zarzadzanie.pl/">
                                  <DropdownItem><i className="fa fa-home"></i> Zarządzanie nieruchomościami</DropdownItem>
                              </NavLink>
                              <NavLink href="http://emmerson-zarzadzanie.pl/aranzacje-i-wykonczenia/">
                                  <DropdownItem><i className="fa fa-image"></i> Aranżacja i wyposażenie wnętrz</DropdownItem>
                              </NavLink>
                              <NavLink href="https://emmerson.pl/pl/article/46/oferta-dla-inwestorow">
                                  <DropdownItem><i className="fa fa-comments"></i> Obsługa inwestycji</DropdownItem>
                              </NavLink>
                              <NavLink href="http://hills.pl/">
                                  <DropdownItem><i className="fa fa-legal"></i> Doradztwo gospodarcze</DropdownItem>
                              </NavLink>
                              <NavLink href="http://www.grupaemmerson.pl/">
                                  <DropdownItem><i className="fa fa-building"></i> Inwestowanie w nieruchomości</DropdownItem>
                              </NavLink>
                              <NavLink href="https://emmerson.pl/pl/article/171/marketing-i-reklama">
                                  <DropdownItem><i className="fa fa-video-camera"></i> Marketing i reklama</DropdownItem>
                              </NavLink>
                              <NavLink href="http://www.emmerson-evaluation.pl/">
                                  <DropdownItem><i className="fa fa-usd"></i> Wyceny nieruchomości</DropdownItem>
                              </NavLink>
                          </DropdownMenu>
                      </Dropdown>
                  </NavItem>
                  <NavItem className="px-3 d-md-down-none">
                      <Dropdown isOpen={this.state.dropdownOpen2} toggle={this.toggle2}>
                          <DropdownToggle className="nav-link dropdown-toggle">
                              O Nas
                          </DropdownToggle>
                          <DropdownMenu right className={this.state.dropdownOpen2 ? 'show' : ''}>
                              <NavLink href="https://emmerson.pl/pl/article/51/misja-firmy">
                                  <DropdownItem><i className="fa fa-info-circle"></i> Misja</DropdownItem>
                              </NavLink>
                              <NavLink href="https://emmerson.pl/pl/article/52/historia-firmy">
                                  <DropdownItem><i className="fa fa-history"></i> Historia</DropdownItem>
                              </NavLink>
                              <NavLink href="https://emmerson.pl/pl/article/100/pracuj-z-nami">
                                  <DropdownItem><i className="fa fa-shield"></i> Praca</DropdownItem>
                              </NavLink>
                              <NavLink href="https://emmerson.pl/pl/article/54/system-franczyzowy">
                                  <DropdownItem><i className="fa fa-institution"></i> System franczyzowy</DropdownItem>
                              </NavLink>
                              <NavLink href="https://emmerson.pl/pl/article/53/partnerzy">
                                  <DropdownItem><i className="fa fa-handshake-o"></i> Nasi partnerzy</DropdownItem>
                              </NavLink>
                          </DropdownMenu>
                      </Dropdown>
                  </NavItem>
                  <NavItem className="px-3 d-md-down-none">
                      <Dropdown isOpen={this.state.dropdownOpen4} toggle={this.toggle4}>
                          <DropdownToggle className="nav-link dropdown-toggle">
                              Relacje Inwestorskie
                          </DropdownToggle>
                          <DropdownMenu right className={this.state.dropdownOpen4 ? 'show' : ''}>
                                  <NavLink href="https://emmerson.pl/pl/article/62/profil-spolki">
                                      <DropdownItem>Profil spółki</DropdownItem>
                                  </NavLink>
                                  <NavLink href="https://emmerson.pl/pl/article/73/walne-zgromadzenia">
                                      <DropdownItem>Walne zgromadzenia</DropdownItem>
                                  </NavLink>
                                  <NavLink href="https://emmerson.pl/pl/article/80/akcjonariat">
                                      <DropdownItem>Akcjonariat</DropdownItem>
                                  </NavLink>
                                  <NavLink href="https://emmerson.pl/pl/article/158/wyniki-finansowe">
                                      <DropdownItem>Wyniki Finansowe</DropdownItem>
                                  </NavLink>
                                  <NavLink href="https://emmerson.pl/pl/article/85/kalendarium">
                                      <DropdownItem>Kalendarium</DropdownItem>
                                  </NavLink>
                              <DropdownItem header tag="div" className="text-center" style={{}}><strong>Raporty</strong></DropdownItem>
                                  <NavLink href="https://emmerson.pl/pl/article/253/informacje-poufne">
                                      <DropdownItem>Informacje poufne</DropdownItem>
                                  </NavLink>
                                  <NavLink href="https://emmerson.pl/pl/article/167/raporty-okresowe">
                                      <DropdownItem>Raporty okresowe</DropdownItem>
                                  </NavLink>
                                  <NavLink href="https://emmerson.pl/pl/article/252/espi">
                                      <DropdownItem>ESPI</DropdownItem>
                                  </NavLink>
                                  <NavLink href="https://emmerson.pl/pl/article/251/ebi">
                                      <DropdownItem>EBI</DropdownItem>
                                  </NavLink>
                          </DropdownMenu>
                      </Dropdown>
                  </NavItem>
                  <NavItem className="px-3 d-md-down-none">
                      <Dropdown isOpen={this.state.dropdownOpen3} toggle={this.toggle3}>
                          <DropdownToggle className="nav-link dropdown-toggle">
                              Kontakt
                          </DropdownToggle>
                          <DropdownMenu right className={this.state.dropdownOpen3 ? 'show' : ''}>
                              <NavLink href="https://emmerson.pl/pl/departments">
                                  <DropdownItem><i className="fa fa-map"></i> Nasze biura</DropdownItem>
                              </NavLink>
                              <NavLink href="https://emmerson.pl/pl/contact">
                                  <DropdownItem><i className="fa fa-phone"></i> Napisz do nas</DropdownItem>
                              </NavLink>
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
