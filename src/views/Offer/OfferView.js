/*global FB*/
import React, {Component} from "react";
import { connect } from 'react-redux';
import * as actions from '../../actions';
import SimpleSlider from './SimpleSlider';
import Contact from './Contact';
import { MapOfferContainer } from './MapOfferContainer';
import InfoOfferView from  './InfoOfferView';
import HeaderOffer from "./HeaderOffer";
import { FacebookButton, GooglePlusButton, TwitterButton } from "react-social";
import {API_DIR, API_PORT, DIR_URL} from "../../config/parameters";

let testWeakMap = new WeakMap();

class OfferView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            offer: null,
            baseUrl: DIR_URL,
            link : DIR_URL+'/offer/' + this.props.match.params.id,
            name : 'Emmerson Realty S.A.',
            caption : 'Emmerson Realty S.A',
            description :  '-',
            redirect_uri : DIR_URL+'/offer/' + this.props.match.params.id,
            appId: 1537301123055501,
            noConfirmed: false,
            noValid: false,
            check_one: false,
            check_two: false,
        };
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    get state() {
        return testWeakMap.get(this);
    }

    set state(value) {
        testWeakMap.set(this, value);
    }

    componentDidMount(){
        const apiUrl =  API_DIR+API_PORT+`/offer/`;
        console.log(this.props.match.params );
        const url = this.props.match.params.usr ? [apiUrl + this.props.match.params.id + '/usr/'+ this.props.match.params.usr].join("") : [apiUrl + this.props.match.params.id].join("");

        fetch(url)
            .then(res => res.json())
            .then(response => {
                this.setState({offer: response});
                this.setState({
                    picture: this.state.offer.photo[0].link,
                    // picture: 'http://test.draftway.pl/img/26-googleplusreviews.jpg',
                    description: this.state.offer.description.replace(/<\/?[^>]+(>|$)/g, "").substring(0,247) + '...'
                });
            });

        window.fbAsyncInit = function() {
            FB.init({
                appId      : '1537301123055501',
                xfbml      : true,
                version    : 'v2.11'
            });
            FB.AppEvents.logPageView();
        };

        (function(d, s, id){
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {return;}
            js = d.createElement(s); js.id = id;
            js.src = "https://connect.facebook.net/pl_PL/sdk.js#xfbml=1&version=v2.8";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        console.log(event);

        this.setState({
            [name]: value
        });
    }
    checkNoValidForm(){
        this.props.setCheckConfirmed(false);
        this.props.setSentConfirmed(false);
        this.props.setResetForm(true);
        this.setState({
            noConfirmed: false,
            noValid: false,
            check_one: false,
            check_two: false
        });
    }
    checkValidForm(){
        if(this.state.check_one && this.state.check_two){
            console.log(this.props.messageField.messageField);
            this.props.sentMessage(this.props.messageField.messageField);
            this.props.setCheckConfirmed(true);
        }
        else{
            this.setState({noValid: true});
        }
    }

    renderAlert(noValid){
        if(noValid){
            return(
                <div>
                    Wszystkie zgody muszą być wyrażone.
                </div>
            )
        }
    }

    renderPopUpValid(){
        if(!this.props.sentCheck)
            return;
        if(this.props.checkConfirmed)
            return;

        return(
            <div style={{position: 'fixed',  margin: 'auto', padding: 20+'px', top: 20+'vh',backgroundColor: 'RGBA(0,0,0,0.9)', zIndex: 9999, color: '#fff'}} className='col-12 col-sm-12 col-md-6'>
                {
                    this.renderAlert(this.state.noValid)
                }
                <div className="col-md-12">
                    <label htmlFor="check_one" className='form-check-label'>
                        Wyrażam zgodę. *</label>
                    <input type="checkbox" name="check_one" id="check_one" required="required"
                           placeholder="" value={this.state.check_one} onChange={this.handleInputChange}
                           style={{float: 'left'}}
                    />
                    <br/>
                    <span style={{fontSize: 9+'px'}}>{'Zgodnie z ustawą z dnia 29 sierpnia 1997 r. o ochronie danych osobowych ' +
                    '(Dz.U. Nr 133, poz 883) wypełniając ten formularz wyrażasz zgodę na przetwarzanie ' +
                    'Twoich danych osobowych i w wykorzystywanie ich tylko do wewnętrznych celów statystycznych ' +
                    'i marketingowych. Jednocześnie masz prawo wglądu do swoich danych,ich poprawienia i ' +
                    'usunięcia. Administratorem danych osobowych jest Emmerson Realty S.A., ul. ' +
                    'Stawki 40, 01-040 Warszawa.'}</span>
                </div>
                <div className="col-md-12">
                    <div className="form-group">
                        <label htmlFor="check_two" className='form-check-label'>
                            Wyrażam zgodę. *</label>
                        <input type="checkbox" name="check_two" id="check_two" rows="9" cols="25" required="required"
                               placeholder="" value={this.state.check_two} onChange={this.handleInputChange}
                               style={{float: 'left'}}
                        />
                        <br/>
                        <span style={{fontSize: 9+'px'}}>{'Zgodnie z ustawą z dnia 26.08.2002 r. o świadczeniu usług ' +
                        'drogą elektroniczną obowiązującą od 10 marca 2003, wyrażam zgodę na ' +
                        'otrzymywanie informacji handlowej drogą elektroniczną.'}</span>
                    </div>
                </div>
                <div className="row">

                    <div className="col-md-6">
                        <button className="btn btn-outline-light col-12 " id="btnConfirmed" onClick={()=>this.checkValidForm()}>
                            Potwierdzam
                        </button>
                    </div>

                    <div className="col-md-6">
                        <button className="btn btn-outline-light col-12 " id="btnConfirmed" onClick={()=>this.checkNoValidForm()}>
                            Rezygnuję
                        </button>
                    </div>

                </div>
            </div>
        );
    }

    render() {

        if(!this.state.offer){
            return (
                <div className='vertical-center'>
                    <div className='loader' style={{margin: 'auto'}}>
                    </div>
                </div>
            )
        }

        return (
            <div>
                <div className='row justify-content-center nopadding' style={{width: 100+'%'}}>
                    {
                        this.renderPopUpValid(this.props.checkConfirmed)
                    }
                </div>
            <div className="container">

                <div className='row'>
                    <div className='col-12 col-sm-12 col-md-12 col-lg-12' style={{backgroundColor: '#151b1e', margin: 0, padding: 0}} >
                        <div className='col-12 nopadding' style={{marginBottom: 25+'px'}}>
                            <HeaderOffer
                                headerPhoto={this.state.offer.photo[0]}
                                price={this.state.offer.price}
                                priceM2={this.state.offer.price_per_m2}
                                surface={this.state.offer.surface}
                                full_location={this.state.offer.full_location}
                                type_of_contract={this.state.offer.type_of_contract}
                            />
                        </div>

                        <div className='contact contact-background' style={{padding: '20px 20px', margin: 0, height: 'auto'}}>
                            <Contact adviser={this.state.offer.adviser} {...this.props} checkedConfirme={this.state.noConfirmed}/>
                        </div>

                        <div className='offer-box col-12 col-sm-12 col-md-12 col-lg-12 row nopadding' style={{marginTop: 50+'px'}} >

                            <div className='col-12 col-sm-12 col-md-12'>
                                <div style={{borderBottom: '1px solid #e3001b', color: '#fff', margin: 0, padding: 0, fontSize: 14+'px', marginTop: 20+'px'}}>
                                    <div style={{backgroundColor: '#e3001b', padding: 4+'px'}} className='col-3'>Galeria:</div>
                                </div>
                                <SimpleSlider images={this.state.offer.photo}/>
                            </div>

                            <div className='col-12 col-sm-12 col-md-5 col-lg-3 nopadding' style={{marginBottom: 40+'px', paddingBottom: 40+'px'}}>
                                <div className='col-12 contact-background contact-small-screen' style={{padding: '20px 10px', margin: 0, height: 'auto', marginBottom: 40+'px', marginTop: 40+'px'}}>
                                    <Contact adviser={this.state.offer.adviser} {...this.props}/>
                                </div>
                                <InfoOfferView offer={this.state.offer}/>
                            </div>

                            <div className='col-12 col-sm-12 col-md-7 col-lg-9' style={{marginBottom: 40+'px'}}>

                                <div style={{borderBottom: '1px solid #e3001b', color: '#fff', margin: 0, padding: 0, fontSize: 14+'px', marginTop: 40+'px'}}>
                                    <div style={{backgroundColor: '#e3001b', padding: 4+'px'}} className='col-3'>Opis:</div>
                                </div>

                                <div dangerouslySetInnerHTML={{ __html: this.state.offer.description }} style={{marginTop: 40+'px', marginBottom: 40+'px'}}/>

                                <div style={{borderBottom: '1px solid #e3001b', color: '#fff', margin: 0, padding: 0, fontSize: 14+'px', marginTop: 20+'px'}}>
                                    <div style={{backgroundColor: '#e3001b', padding: 4+'px'}} className='col-3'>Udostępnij:</div>
                                </div>

                                <div className="col-12 row nopadding">
                                    <FacebookButton url={this.state.link} appId={this.state.appId} media={this.state.picture}
                                                    className="btn btn-lg btn-facebook col-12 col-sm-6 col-md-6 col-lg-3 fb-share-button" style={{marginTop: 10+'px'}}>
                                        <span> Facebook</span>
                                    </FacebookButton>
                                    <GooglePlusButton url={this.state.link} appId={this.state.appId} media={this.state.picture}
                                                      className="btn btn-lg btn-google-plus col-12 col-sm-6 col-md-6 col-lg-3" style={{marginTop: 10+'px'}}>
                                        <span> Google+</span>
                                    </GooglePlusButton>
                                    <TwitterButton url={this.state.link} appId={this.state.appId} media={this.state.picture}
                                                   className="btn btn-lg btn-twitter col-12 col-sm-6 col-md-6 col-lg-3" style={{marginTop: 10+'px'}}>
                                        <span> Twitter</span>
                                    </TwitterButton>
                                    <button className="btn btn-lg btn-pinterest text col-12 col-sm-6 col-md-6 col-lg-3" style={{marginTop: 10+'px'}}
                                    onClick={()=>window.location = 'http://program.emmerson.pl/Administracja/admSzablonyDokument.aspx?' +
                                        'IdSzablon=491&Obiekt=virgoLib.Oferta&idek='+this.state.offer.id+'&typ=pdf'}>
                                        <i className="fa fa-file-pdf-o"></i>&nbsp;Zapisz do PDF</button>
                                </div>

                                <div style={{borderBottom: '1px solid #e3001b', color: '#fff', margin: 0, padding: 0, fontSize: 14+'px', marginTop: 40+'px'}}>
                                    <div style={{backgroundColor: '#e3001b', padding: 4+'px'}} className='col-3'>Mapa:</div>
                                </div>

                                <div style={{margin: 0, padding: 0}}>
                                    <MapOfferContainer markerLocation={{lat: parseFloat(this.state.offer.latitude), lng: parseFloat(this.state.offer.longitude)}} markerIco={this.state.offer.ico}/>
                                </div>
                            </div>
                        </div>
                    </div>
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
        sentCheck: state.sentCheck.sentCheck,
        checkConfirmed: state.checkConfirmed.checkConfirmed,
        messageField: state.messageField.messageField,
    }
}


OfferView = connect(
    mapStateToProps,
    actions
)(OfferView);

export default OfferView;