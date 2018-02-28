import React, {Component} from 'react';

import { connect } from 'react-redux';
import * as actions from '../../actions';
import { reduxForm, Field} from 'redux-form';
import { Form, Button, Nav } from "reactstrap";
import PropTypes from "prop-types";

let testWeakMap = new WeakMap();

class Sidebar extends Component {
    static contextTypes = {
        router: PropTypes.object
    };

    constructor (props, context) {
        super(props, context);
        this.state = {
            priceFrom: this.props.searchData ? this.props.searchData['priceFrom'] : 0,
            priceTo: this.props.searchData ? this.props.searchData['priceTo'] : 999999999,
            priceM2From: this.props.searchData ? this.props.searchData['priceM2From'] : 0,
            priceM2To: this.props.searchData ? this.props.searchData['priceM2To'] : 999999999,
            primaryMarket: this.props.searchData ? this.props.searchData['primaryMarket'] : false,
            secondaryMarket: this.props.searchData ? this.props.searchData['secondaryMarket'] : true,
            flatType: this.props.searchData ? this.props.searchData['flatType'] : true,
            houseType: this.props.searchData ? this.props.searchData['houseType'] : false,
            plotType: this.props.searchData ? this.props.searchData['plotType'] : false,
            hallType: this.props.searchData ? this.props.searchData['hallType'] : false,
            commercialUnitType: this.props.searchData ? this.props.searchData['commercialUnitType'] : false,
            officeType: this.props.searchData ? this.props.searchData['officeType'] : false,
            exclusive: this.props.searchData ? this.props.searchData['exclusive'] : false,
            zeroPercent: this.props.searchData ? this.props.searchData['zeroPercent'] : false
        };
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    get state () {
        return testWeakMap.get(this);
    }

    set state (value) {
        testWeakMap.set(this, value);
    }
    componentDidMount(){
        if(this.props.searchData === undefined ){
            this.props.setSearchData({
                priceFrom: this.props.searchData ? this.props.searchData['priceFrom'] : 0,
                priceTo: this.props.searchData ? this.props.searchData['priceTo'] : 999999999,
                priceM2From: this.props.searchData ? this.props.searchData['priceM2From'] : 0,
                priceM2To: this.props.searchData ? this.props.searchData['priceM2To'] : 999999999,
                primaryMarket: this.props.searchData ? this.props.searchData['primaryMarket'] : false,
                secondaryMarket: this.props.searchData ? this.props.searchData['secondaryMarket'] : true,
                flatType: this.props.searchData ? this.props.searchData['flatType'] : true,
                houseType: this.props.searchData ? this.props.searchData['houseType'] : false,
                plotType: this.props.searchData ? this.props.searchData['plotType'] : false,
                hallType: this.props.searchData ? this.props.searchData['hallType'] : false,
                commercialUnitType: this.props.searchData ? this.props.searchData['commercialUnitType'] : false,
                officeType: this.props.searchData ? this.props.searchData['officeType'] : false,
                exclusive: this.props.searchData ? this.props.searchData['exclusive'] : false,
                zeroPercent: this.props.searchData ? this.props.searchData['zeroPercent'] : false
            });
            this.props.setSearch({
                priceFrom: this.props.searchData ? this.props.searchData['priceFrom'] : 0,
                priceTo: this.props.searchData ? this.props.searchData['priceTo'] : 999999999,
                priceM2From: this.props.searchData ? this.props.searchData['priceM2From'] : 0,
                priceM2To: this.props.searchData ? this.props.searchData['priceM2To'] : 999999999,
                primaryMarket: this.props.searchData ? this.props.searchData['primaryMarket'] : false,
                secondaryMarket: this.props.searchData ? this.props.searchData['secondaryMarket'] : true,
                flatType: this.props.searchData ? this.props.searchData['flatType'] : true,
                houseType: this.props.searchData ? this.props.searchData['houseType'] : false,
                plotType: this.props.searchData ? this.props.searchData['plotType'] : false,
                hallType: this.props.searchData ? this.props.searchData['hallType'] : false,
                commercialUnitType: this.props.searchData ? this.props.searchData['commercialUnitType'] : false,
                officeType: this.props.searchData ? this.props.searchData['officeType'] : false,
                exclusive: this.props.searchData ? this.props.searchData['exclusive'] : false,
                zeroPercent: this.props.searchData ? this.props.searchData['zeroPercent'] : false
            });
        }
    }
    checkValid(){
        if( !(this.state.primaryMarket || this.state.secondaryMarket ))
        {
            this.setState({noValid: true});
            return true;

        }
        else if(!(this.state.flatType||this.state.houseType||this.state.plotType||this.state.hallType||this.state.commercialUnitType||this.state.officeType))
        {
            this.setState({noValid: true});
            return true;
        }
        else
        {
            this.setState({
                noValid: false,
            });

            return false;
        }
    }

    handleFormSubmit(formData) {
        if( this.checkValid() )
        {
            return (
                this.setState({noValid: true})
            );
        }
        else
        {
            this.props.setSearch(formData);
            this.props.setSearchData(formData);
            this.props.setIsLoaded(false);
            this.setState({noValid: false});
            document.body.classList.toggle('sidebar-hidden');
            document.body.classList.toggle('sidebar-mobile-show');
        }
    }

    handleInputChange(event) {
        const target = event.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        if(target.type !== 'checkbox' && target.value === ''){
            switch (target.name){
                case 'priceFrom':
                    value = 0;
                    break;
                case 'priceTo':
                    value = 999999999;
                    break;
                case 'priceM2From':
                    value = 0;
                    break;
                case 'priceM2To':
                    value = 999999999;
                    break;
                default:
                    value = false;
            }
        }
        const searchData = this.props.searchData ? this.props.searchData : [];
        searchData[name] = value;
        this.setState({
            [name]: value
        });
        this.props.setSearchData(
            searchData
        );

        setTimeout(()=>this.checkValid(), 500);

    }

    renderAlert(noValid){
        console.log(noValid);
        if(noValid){
            return(
                <div className="col-md-12 col-sm-12 col-12" style={{
                    marginTop: 15 + 'px'
                }}>
                    <div style={{
                        textAlign: 'center',
                        color: '#e3001b',
                        backgroundColor: 'transparent',
                        backgroundImage: 'none',
                        borderColor: '#e3001b',
                        border: 'solid 1px',
                        padding: 5+'px'
                    }}>
                        <h4 style={{margin: 'auto', marginTop: 15+'px', marginBottom: 15+'px'}}>Zaznacz rynek i rodzaj nieruchomości</h4>
                    </div>
                </div>
            );
        }
    }

    render() {
        const formData = this.props.searchData;

        const checkInput = ({input:{ checked, onChange, name, value}, className, placeholder, id, label, type, children}) => (
            <label className="form-check-label col-sm-12 col-12">
                <input  type={type} className={className} id={id} name={name} placeholder={placeholder}
                        onChange={onChange} checked={ this.props.searchData ? this.props.searchData[name] : checked}
                        value={this.props.searchData ? this.props.searchData[name] : value}/>
                {label}
            </label>
        );

        return (
            <div className="sidebar">
                <nav className="sidebar-nav">
                    <Nav>
                        <div className='container-fluid nopadding' style={{position: 'relative'}}>
                            <div className='d-lg-none'>
                                <div className="col-12" style={{marginTop: 5+'px'}}>
                                    <button className='btn btn-lg btn-outline-emmerson col-12' onClick={()=>{
                                        this.props.setSearchProperties('&buy=1&rent=0'); this.props.setIsLoaded(false);
                                        document.body.classList.toggle('sidebar-hidden');
                                        document.body.classList.toggle('sidebar-mobile-show');
                                        this.context.router.history.push('/search');}}>Kup</button>
                                </div>

                                <div className="col-12" style={{marginTop: 5+'px'}}>
                                    <button className='btn btn-lg btn-outline-emmerson col-12' onClick={()=>{
                                        this.props.setSearchProperties('&buy=0&rent=1');
                                        document.body.classList.toggle('sidebar-hidden');
                                        document.body.classList.toggle('sidebar-mobile-show');
                                        this.props.setIsLoaded(false); this.context.router.history.push('/search');}}>Wynajmij</button>
                                </div>
                            </div>
                            <Form>
                                <legend className="col-form-legend col-sm-12 col-12 hidden-md-up"><h5>Cenna:</h5></legend>
                                <div className="col-md-12 col-12">
                                    <div className="row">
                                        <div className="col-md-6 col-sm-6 col-6">
                                            <div className="form-group">
                                                <label htmlFor='priceFrom'>Cena od:</label>
                                                <Field component='input' type="text" id="priceFrom" placeholder="od" name='priceFrom'
                                                    className="form-control bg-dark search-box search-color-text"
                                                    value={this.state.priceFrom} onChange={this.handleInputChange}/>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-sm-6 col-6">
                                            <div className="form-group">
                                                <label htmlFor='priceFrom'>Cena do:</label>
                                                <Field component='input' type="text" id="priceTo" placeholder="do"
                                                       name='priceTo' className="form-control bg-dark search-box search-color-text"
                                                       value={this.state.priceTo} onChange={this.handleInputChange}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-12 col-12">
                                    <div className="row">
                                        <div className="col-md-6 col-6">
                                            <div className="form-group">
                                                <label htmlFor='priceFrom'>Cena m<sup>2</sup> od:</label>
                                                <Field
                                                    component='input' type="text"
                                                    id="priceM2From" placeholder="od"  name='priceM2From' className="form-control bg-dark search-box search-color-text"
                                                    value={this.state.priceM2From} onChange={this.handleInputChange}/>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-6">
                                            <div className="form-group">
                                                <label htmlFor='priceFrom'>Cena m<sup>2</sup> do:</label>
                                                <Field
                                                    component='input' type="text"
                                                    id="priceM2To" placeholder="do"  name='priceM2To' className="form-control bg-dark search-box search-color-text"
                                                    value={this.state.priceM2To} onChange={this.handleInputChange}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <legend className="col-form-legend col-sm-12  col-12"><h5>Rynek:</h5></legend>
                                <div className="col-md-12">
                                    <div className="form-check">
                                        <Field
                                            component={checkInput} className="form-check-input" type="checkbox" name="primaryMarket"
                                            id="primaryMarket" label='&nbsp;Pierwotny' value={this.state.primaryMarket} checked={this.state.primaryMarket}  onChange={this.handleInputChange}/>
                                        <Field
                                            component={checkInput} className="form-check-input" type="checkbox" name="secondaryMarket"
                                            id="secondaryMarket" label='&nbsp;Wtórny' value={this.state.secondaryMarket} checked={this.state.secondaryMarket}  onChange={this.handleInputChange}/>
                                    </div>
                                </div>

                                <legend className="col-form-legend col-sm-12  col-12"><h5>Rodzaj Nieruchomości:</h5></legend>
                                <div className="col-md-12">
                                    <div className="form-check">
                                        <Field
                                            component={checkInput} className="form-check-input" type="checkbox" name="flatType" id="flatType"
                                            label='&nbsp;Mieszkania' value={this.state.flatType} checked={this.state.flatType} onChange={this.handleInputChange}/>

                                        <Field
                                            component={checkInput} className="form-check-input" type="checkbox" name="houseType" id="houseType"
                                            label='&nbsp;Domy' value={this.state.houseType} checked={this.state.houseType} onChange={this.handleInputChange}/>

                                        <Field
                                            component={checkInput} className="form-check-input" type="checkbox" name="plotType" id="plotType"
                                            label='&nbsp;Działki' value={this.state.plotType} checked={this.state.plotType} onChange={this.handleInputChange}/>

                                        <Field
                                            component={checkInput} className="form-check-input" type="checkbox" name="hallType" id="hallType"
                                            label='&nbsp;Hale' value={this.state.hallType} checked={this.state.hallType} onChange={this.handleInputChange}/>

                                        <Field
                                            component={checkInput} className="form-check-input" type="checkbox" name="commercialUnitType"
                                               id="commercialUnitType" label='&nbsp;Lokale Usługowe' value={this.state.commercialUnitType} checked={this.state.commercialUnitType} onChange={this.handleInputChange}/>

                                        <Field
                                            component={checkInput} className="form-check-input" type="checkbox" name="officeType"
                                               id="officeType" label='&nbsp;Biura' value={this.state.officeType} checked={this.state.officeType} onChange={this.handleInputChange}/>

                                    </div>
                                </div>

                                <legend className="col-form-legend col-sm-12 col-12"><h5>Rodzaj oferty:</h5></legend>
                                <div className="col-md-12">
                                        <Field
                                            component={checkInput} className="form-check-input" type="checkbox" name="exclusive" id="exclusive"
                                            label='&nbsp;Wyłącznie u Nas!' value={this.state.exclusive} checked={this.state.exclusive} onChange={this.handleInputChange}/>

                                        <Field
                                            component={checkInput} className="form-check-input" type="checkbox" name="zeroPercent" id="zeroPercent"
                                            label='&nbsp;Bez prowizji' value={this.state.zeroPercent} checked={this.state.zeroPercent} onChange={this.handleInputChange}/>

                                </div>
                                {
                                    this.renderAlert(this.state.noValid)
                                }
                                <div className="col-md-12 col-sm-12 col-12" style={{marginTop: 15 + 'px'}}>
                                    <Button onClick={()=>this.handleFormSubmit(formData)} className='btn btn-lg btn-outline-emmerson col-12'>
                                        <span className='fa fa-search'></span> Wyszukaj
                                    </Button>
                                </div>
                            </Form>
                        </div>
                    </Nav>
                </nav>
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
        searchData: state.searchData.searchData
    }
}

Sidebar = connect(
    mapStateToProps,
    actions
)(Sidebar);

export default Sidebar = reduxForm({
    form: 'searchBox',
    fields:
        [
            'priceFrom',
            'priceTo',
            'priceM2From',
            'priceM2To',
            'primaryMarket',
            'secondaryMarket',
            'flatType',
            'houseType',
            'plotType',
            'hallType',
            'commercialUnitType',
            'officeType',
            'exclusive',
            'zeroPercent'
        ]
})(Sidebar);