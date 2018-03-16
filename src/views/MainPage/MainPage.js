import React, {Component} from "react";
import { Row, Col, Form, FormGroup, Button, InputGroup, InputGroupButton } from "reactstrap";
import { reduxForm, Field } from 'redux-form';
import { SearchField } from './SearchField'
import AutoFitImage from 'react-image-autofit-frame';
import PropTypes from "prop-types";

import { connect } from 'react-redux';
import * as actions from '../../actions';
import Slider from 'react-slick';
import ImageOfferBox from "./ImageOfferBox";

let testWeakMap = new WeakMap();

let settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    touchMove: true,
    arrows: false,
    dotsClass: 'slick-dots white-dots',
    autoplay: true,
    autoplaySpeed: 10000,
    pauseOnHover: true

};

let settingsOffer = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    responsive: [
        { breakpoint: 388, settings: { slidesToShow: 1 } },
        { breakpoint: 768, settings: { slidesToShow: 2 } },
        { breakpoint: 991, settings: { slidesToShow: 3 } },
        { breakpoint: 1199, settings: { slidesToShow: 4 } }
    ],
    slidesToScroll: 1,
    adaptiveHeight: true,
    touchMove: true,
    arrows: true,
    dotsClass: 'slick-dots white-dots'
};

const style = {
    image: {
        width: 'auto',
        height: 'auto',
        maxHeight: 200+'px'
    },
    imageDiv: {
        height: 'auto',
        backgroundColor: 'RGBA(255,255,255,0.4)',
        textAlign: 'center',
    },
    imageDivOnMobile: {
        height: 'auto',
        textAlign: 'center',
        margin: 'auto',
    }
};

const promoFlat = [
    {link: 'https://img-static.emmerson.pl/img/slider/kafelek_oferta-01.jpg'},
    {link: 'https://img-static.emmerson.pl/img/slider/kafelek_oferta-01.jpg'},
    {link: 'https://img-static.emmerson.pl/img/slider/kafelek_oferta-01.jpg'},
    {link: 'https://img-static.emmerson.pl/img/slider/kafelek_oferta-01.jpg'},
    {link: 'https://img-static.emmerson.pl/img/slider/kafelek_oferta-01.jpg'},
];

const promoHouse = [
    {link: 'https://img-static.emmerson.pl/img/slider/kafelek_oferta-06.jpg'},
    {link: 'https://img-static.emmerson.pl/img/slider/kafelek_oferta-06.jpg'},
    {link: 'https://img-static.emmerson.pl/img/slider/kafelek_oferta-06.jpg'},
    {link: 'https://img-static.emmerson.pl/img/slider/kafelek_oferta-06.jpg'},
    {link: 'https://img-static.emmerson.pl/img/slider/kafelek_oferta-06.jpg'},
];

const images = [
    {
        link: 'https://img-static.emmerson.pl/img/slider/MB.jpg',
        name: 'Metro Bielany',
        sub_name: 'Warszawa-Bielany',
        url: 'http://www.metrobielany.pl/'
    },
    {
        link: 'https://img-static.emmerson.pl/img/slider/B10.jpg',
        name: 'Bobrowiecka 10',
        sub_name: 'Warszawa-Mokotów',
        url: 'http://bobrowiecka10.pl/'
    },
    {
        link: 'https://img-static.emmerson.pl/img/slider/CD.jpg',
        name: 'Cicha Dolina',
        sub_name: 'Warszawa-Wilanów',
        url: 'http://cichadolina.waw.pl/pl/'
    },
    {
        link: 'https://img-static.emmerson.pl/img/slider/RF.jpg',
        name: 'Riverfront',
        sub_name: 'Gdańsk',
        url: 'https://riverfront.pl/'
    },
    {
        link: 'https://img-static.emmerson.pl/img/slider/SR.jpg',
        name: 'Segmenty Radzymin',
        sub_name: 'Radzymin',
        url: 'http://www.segmenty-radzymin.pl/0'
    }
];

class MainPage extends Component {
    static contextTypes = {
        router: PropTypes.object
    };

    constructor (props, context) {
        super(props, context);
        this.kindChange = this.kindChange.bind(this);
        this.typeChange = this.typeChange.bind(this);
        this.state = {
            name: images[0].name,
            sub_name: images[0].sub_name,
            type: 0,
            kind: 0,
            location: [],
            priceFrom: 0,
            priceTo: 999999999,
            priceM2From: 0,
            priceM2To: 999999999,
            primaryMarket: true,
            secondaryMarket: true,
            flatType: false,
            houseType: false,
            plotType: false,
            hallType: false,
            commercialUnitType: false,
            officeType: false,
            exclusive: false,
            zeroPercent: false
        };

    }

    get state () {
        return testWeakMap.get(this);
    }

    set state (value) {
        testWeakMap.set(this, value);
    }

    handleFormSubmit(formProps){


        if(this.state.type === 0){
            this.props.setSearchProperties('&buy=1&rent=0');
        }
        else {
            this.props.setSearchProperties('&buy=0&rent=1');
        }

        switch (parseInt(this.state.kind,0)){
            case 0:
                this.setState({
                    flatType: true
                });
                break;
            case 1:
                this.setState({
                    houseType: true
                });
                break;
            case 2:
                this.setState({
                    plotType: true
                });
                break;
            case 3:
                this.setState({
                    hallType: true,
                });
                break;
            case 4:
                this.setState({
                    commercialUnitType: true,
                });
                break;
            case 5:
                this.setState({
                    officeType: true,
                });
                break;
            default:
                this.setState({
                    flatType: true
                });
        }

        setTimeout(()=>{
            const formData =  {
                priceFrom: this.state.priceFrom,
                priceTo: this.state.priceTo,
                priceM2From: this.state.priceM2From,
                priceM2To: this.state.priceM2To,
                primaryMarket: this.state.primaryMarket,
                secondaryMarket: this.state.secondaryMarket,
                flatType: this.state.flatType,
                houseType: this.state.houseType,
                plotType: this.state.plotType,
                hallType: this.state.hallType,
                commercialUnitType: this.state.commercialUnitType,
                officeType: this.state.officeType,
                exclusive: this.state.exclusive,
                zeroPercent: this.state.zeroPercent
            };
            this.props.setSearch(formData);
            this.props.setSearchData(formData);
            this.props.setIsLoaded(false);
            this.context.router.history.push("/search");
        },1000)
    }
    kindChange(event){
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({
            kind: value
        });


    }
    typeChange(e){
        this.setState({
            type: e
        })
    }
    render() {
        const {
            handleSubmit,
            fields:{
                type,
                kind,
                location
            }
        } = this.props;

        const renderSelect = ({ input, label, type, meta: { touched, error }, children, className}) => (
            <div>
                <select {...input} className={className} >
                    {children}
                </select>
                {touched && error && <span>{error}</span>}
            </div>
        );

        return (
            <div className="nopadding" style={{zIndex: 1}}>
                <div className="row justify-content-md-center nopadding">
                    <div className='col-12 col-sm-12 col-md-10 col-lg-8 col-xl-8 search-main-box' style={{margin: 'auto', position: 'absolute', zIndex: 999, top: 55+'vh'}}>
                        <Col style={{backgroundColor: '#e3001b', margin: 'auto', paddingTop: 17+'px'}}>
                            <div className='show-on-mobile' style={{textAlign: 'center', fontFamily: 'BebasNeue Regular, sans-serif, FontAwesome', fontWeight: 800, color: '#fff', textShadow: '2px 2px #000000'}}>
                                <div style={{paddingTop: 7+'px', backgroundColor: 'RGBA(0,0,0,0.5)'}}>
                                    <h1>22 295 10 00</h1>
                                </div>
                            </div>
                            <Form name='main_page_form' onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                                <Row>
                                    <Col className='col-12 col-sm-6 col-md-3'>
                                        <FormGroup>
                                            <Field {...kind} component={renderSelect} name="kind" className="form-control custom_inputs"
                                                   placeholder="Wyszukaj" onChange={this.kindChange}>
                                                <option value={0}>Mieszkanie</option>
                                                <option value={1}>Dom</option>
                                                <option value={2}>Działka</option>
                                                <option value={3}>Hala</option>
                                                <option value={4}>Lokal usługowy</option>
                                                <option value={5}>Biuro</option>
                                            </Field>
                                        </FormGroup>
                                    </Col>
                                    <Col className='col-12 col-sm-6 col-md-3'>
                                        <FormGroup>
                                            <Field {...type} component={renderSelect} name="type" className="form-control custom_inputs"
                                                   placeholder="Wyszukaj" onChange={this.typeChange}>
                                                <option value={0}>na sprzedaż</option>
                                                <option value={1}>na wynajem</option>
                                            </Field>
                                        </FormGroup>
                                    </Col>
                                    <Col className='col-12 col-sm-12 col-md-6'>
                                        <FormGroup row>
                                            <Col xs="12" md="12">
                                                <InputGroup>
                                                    <SearchField name='location' {...location}  {...this.props}/>
                                                    <InputGroupButton>
                                                        <Button action='submit' className='btn-outline-emmerson bg-dark border-dark custom_inputs' onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                                                            <i className='fa fa-search' style={{color: '#fff'}}></i>
                                                        </Button>
                                                    </InputGroupButton>
                                                </InputGroup>
                                            </Col>
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </Form>
                        </Col>
                    </div>
                </div>
                <Slider {...settings}>
                    {images.map((e, index) => {
                        return(
                            <div className='col-12 nopadding'
                                 style={{
                                     backgroundImage: 'url('+e.link+')',
                                     backgroundPosition: 'center center',
                                     backgroundRepeat: 'no-repeat',
                                     height: 60+'vh',
                                     backgroundSize: 'cover'
                                 }}
                                 key={index}
                                 onMouseOver={(event)=>{
                                     event.target.classList.toggle('cursor-ew-resize');
                                 }}
                                 onMouseDown={(event)=>{
                                    event.target.classList.toggle('cursor-move');
                                 }}
                                 onMouseUp={(event)=>{
                                    event.target.classList.toggle('cursor-move');
                                 }}
                                 onMouseOut={(event)=>{
                                     event.target.classList.remove('cursor-ew-resize');
                                     event.target.classList.remove('cursor-move');
                                 }}
                            >
                                <div className='col-12 col-sm-12 col-md-10 col-lg-8 col-xl-8' style={style.imageDivOnMobile}>
                                    <div className='imageDiv' style={{
                                        fontFamily: 'BebasNeue Regular, sans-serif, FontAwesome',
                                        color: '#fff',
                                        textShadow: '2px 2px #000000',
                                        marginTop: 20+'vh'
                                        }}
                                    >
                                        <div style={{backgroundColor: 'RGBA(0,0,0,0.5)',
                                            paddingTop: 5+'px'}}>
                                            <h1>{e.name}</h1>
                                            <h2>{e.sub_name}</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </Slider>
                <div  style={{backgroundColor: '#fff', minHeight: '1000px'}}>
                    <div className='container' style={{paddingTop: 50+'px'}}>
                        <div className='row nopadding'>
                            <div className='info-invest-box col-12 col-sm-12 col-md-4 col-lg-3' style={{
                                fontFamily: 'BebasNeue Regular, sans-serif, FontAwesome',
                                color: '#000',
                                padding: 2+'px', margin: 0}}>
                                <h1>Nasze inwestycje na wyłączność</h1>
                                apartamenty, mieszkania, domy, segmenty oferty naszych inwestycji, tu znajdziesz to czego szukasz!
                            </div>
                            <div className='col-12 col-sm-12 col-md-8 col-lg-9 row nopadding'>
                                {images.map( (e, index) => {
                                    return(
                                      <div className='col-12 col-sm-12 col-md-6 col-lg-4 cursor-pointer' style={{padding: 2+'px', margin: 0}} key={index} onClick={() => window.location = e.url }>
                                            <div className='offer-text' style={{margin: 'auto', width: 100+'%', height: 100+'%', maxHeight: 200+'px', minHeight: 200+'px', backgroundImage: 'url('+e.link+')', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}>
                                                <span style={{padding: '2px 4px 2px 4px', backgroundColor: 'RGBA(0,0,0,0.5)'}}>{e.name}</span>
                                            </div>
                                      </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    <div className='container' style={{paddingTop: 50+'px', paddingBottom: 50+'px'}}>
                        <div className='row nopadding'>
                            <div className='info-invest-box col-12 col-sm-12 col-md-6 col-lg-4' style={{
                                fontFamily: 'BebasNeue Regular, sans-serif, FontAwesome',
                                color: '#000',
                                textAlign: 'center',
                                padding: 2+'px', margin: 0, paddingBottom: 40+'px'}}>
                                <img src='https://img-static.emmerson.pl/img/home_why_us_01.jpg' style={{width: 100+'%'}}/>
                                <h3>10 TYSIĘCY OFERT NIERUCHOMOŚCI W CAŁYM KRAJU</h3>
                                <div className='col-12 text-justify'>
                                    Bogata baza ofert z całego kraju zapewnia komfort wyboru nieruchomości
                                    dostosowanych do różnych możliwości finansowych i spełniających najróżniejsze
                                    oczekiwania pod względem lokalizacji, powierzchni, standardu, wykończenia i wielu
                                    innych parametrów. Znajdź idealne mieszkanie, dom, lokal użytkowy lub biuro dla
                                    siebie!
                                </div>
                            </div>

                            <div className='info-invest-box col-12 col-sm-12 col-md-6 col-lg-4' style={{
                                fontFamily: 'BebasNeue Regular, sans-serif, FontAwesome',
                                color: '#000',
                                textAlign: 'center',
                                padding: 2+'px', margin: 0, paddingBottom: 40+'px'}}>
                                <img src='https://img-static.emmerson.pl/img/home_why_us_02.jpg' style={{width: 100+'%'}}/>
                                <h3>POZNAJ LOKALNE RYNKI NIERUCHOMOŚCI W POLSCE</h3>
                                <div className='col-12 text-justify'>
                                    Zakup nieruchomości warto poprzedzić analizą lokalnego rynku. Możemy uniknąć w ten
                                    sposób wielu niespodzianek. Skorzystaj z doradztwa ekspertów, którzy łączą znajomość
                                    nowoczesnych narzędzi badawczych z obszerną wiedzą i doświadczeniem, zdobywanym od
                                    początku istnienia nowoczesnego rynku nieruchomości w Polsce. Dysponując bogatą bazą
                                    historycznych i aktualnych danych, przygotujemy dla Ciebie eksperckie opracowanie
                                    niezbędne w planowaniu przedsięwzięć o charakterze inwestycyjnym.
                                </div>
                            </div>

                            <div className='info-invest-box col-12 col-sm-12 col-md-6 col-lg-4' style={{
                                fontFamily: 'BebasNeue Regular, sans-serif, FontAwesome',
                                color: '#000',
                                textAlign: 'center',
                                padding: 2+'px', margin: 0, paddingBottom: 40+'px'}}>
                                <img src='https://img-static.emmerson.pl/img/home_why_us_03.jpg' style={{width: 100+'%'}}/>
                                <h3>PORÓWNAJ CENY OFERTOWE I TRANSAKCYJNE</h3>
                                <div className='col-12 text-justify'>
                                    Większość analiz rynku nieruchomości opartych jest na badaniach cen ofertowych,
                                    czyli dyktowanych przez właścicieli. Takie analizy niezbyt wiernie odzwierciedlają
                                    rzeczywistą sytuację na rynku sprzedaży. Nasze badania uwzględniają również ceny
                                    transakcyjne. gromadzone i aktualizowane w ciągu wielu lat naszej działalności.
                                    Dzięki temu również nasze analizy są bliższe rynkowej rzeczywistości.
                                    Poznaj rynkową wartość wybranej przez siebie nieruchomości!
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
        placesChanged: state.placesChanged.placesChanged
    }
}


MainPage = connect(
    mapStateToProps,
    actions
)(MainPage);

export default MainPage = reduxForm({
    form: 'main_page_form',
    fields:
        [
            'type',
            'kind',
            'location'
        ]
})(MainPage);