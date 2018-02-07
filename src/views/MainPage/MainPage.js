import React, {Component} from "react";

import { connect } from 'react-redux';
import * as actions from '../../actions';
import Slider from 'react-slick';

let testWeakMap = new WeakMap();

let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    touchMove: true,
    arrows: false,
    dotsClass: 'slick-dots white-dots',
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: false

};

const style = {
    image: {
        width: 15+'vw',
        float: 'left'
    },
    imageDiv: {
        minHeight: 20+'vh',
        height: 100+'%',
        backgroundColor: 'RGBA(255,255,255,0.4)',
        textAlign: 'center',
        marginTop: 57+'vh',
        paddingTop: 20+'px'
    }
};

const images = [
    {
        link: '/img/slider/metrobielany_photo.jpg',
        name: 'Inwestycja Metro Bielany',
        promo: [
            {link: '/img/slider/promo/wybrane oferty z inwestycj2i-01.jpg'},
            {link: '/img/slider/promo/wybrane oferty z inwestycji3-01-01.jpg'},
            {link: '/img/slider/promo/wybrane oferty z inwestycji-01.jpg'},
        ]
    },
    {
        link: '/img/slider/bobrowiecka_photo.jpg',
        name: 'Inwestycja Bobrowiecka 10',
        promo: [
            {link: '/img/slider/promo/wybrane oferty z inwestycj2i-01.jpg'},
            {link: '/img/slider/promo/wybrane oferty z inwestycji3-01-01.jpg'},
            {link: '/img/slider/promo/wybrane oferty z inwestycji-01.jpg'},
        ]
    },
    {
        link: '/img/slider/cicha_dolina_photo.jpg',
        name: 'Inwestycja Cicha Dolina',
        promo: [
            {link: '/img/slider/promo/wybrane oferty z inwestycj2i-01.jpg'},
            {link: '/img/slider/promo/wybrane oferty z inwestycji3-01-01.jpg'},
            {link: '/img/slider/promo/wybrane oferty z inwestycji-01.jpg'},
        ]
    },
    {
        link: '/img/slider/Segmenty_Radzymin.jpg',
        name: 'Inwestycja Segmenty Radzymin',
        promo: [
            {link: '/img/slider/promo/wybrane oferty z inwestycj2i-01.jpg'},
            {link: '/img/slider/promo/wybrane oferty z inwestycji3-01-01.jpg'},
            {link: '/img/slider/promo/wybrane oferty z inwestycji-01.jpg'},
        ]
    },
    {
        link: '/img/slider/cityzen_photo.jpg',
        name: 'Inwestycja Cityzen',
        promo: [
            {link: '/img/slider/promo/wybrane oferty z inwestycj2i-01.jpg'},
            {link: '/img/slider/promo/wybrane oferty z inwestycji3-01-01.jpg'},
            {link: '/img/slider/promo/wybrane oferty z inwestycji-01.jpg'},
        ]
    }
];

class MainPage extends Component {

    constructor (props) {
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
            <div className="nopadding">
                <Slider {...settings}>
                    {images.map((e, index) => {
                        console.log(e);
                        return(
                            <div className='col-12 nopadding' style={{backgroundImage: 'url('+e.link+')', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', height: 80+'vh', backgroundSize: 'cover'}} key={index}>
                                <div className='justify-content-between' style={style.imageDiv}>
                                    <div style={{width: 55+'vw', margin: 'auto'}}>
                                        <img src={e.promo[0].link} alt={e.promo[0].link} style={style.image} />

                                        <img src={e.promo[1].link} alt={e.promo[1].link} style={{...style.image,
                                            marginLeft: 5+'vw'}} />

                                        <img src={e.promo[2].link} alt={e.promo[2].link} style={{...style.image,
                                            marginLeft: 5+'vw'}} />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </Slider>
                <div style={{backgroundColor: '#fff', minHeight: '1000px'}}>

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
        rowsCount: state.rowsCount.rowsCount
    }
}

export default connect(mapStateToProps, actions)(MainPage);