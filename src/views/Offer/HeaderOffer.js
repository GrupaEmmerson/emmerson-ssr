import React from 'react';
import NumberFormat from 'react-number-format';

let testWeakMap = new WeakMap();

class HeaderOffer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };

    }

    get state() {
        return testWeakMap.get(this);
    }

    set state(value) {
        testWeakMap.set(this, value);
    }

    render() {
        const { headerPhoto, surface, price, priceM2, full_location, type_of_contract} = this.props;
        const style = {
            container: {
                textAlign: 'left',
                position: 'relative',
                backgroundImage: 'URL("'+ headerPhoto.link +'")',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                height: 433+'px'
            },
            describe: {
                position: 'absolute',
                height: 'auto',
                bottom: 0,
                color: '#fff',
                backgroundColor: 'RGBA(0,0,0,0.6)',
            },
            text: {
                marginTop: 30+'px',
                textShadow: '3px 4px 8px #000'
            },
            textColor: {
                color: '#e3001b'
            }
        };

        return (
            <div style={style.container} >
                <div className='col-12 row justify-content-end'>
                    { type_of_contract.map(ico => {
                        return(
                            <div className='justify-content-end' style={{marginTop: 40+'px'}}>
                                <img src={'/img/'+ ico} style={{height: 150+'%', float: 'right'}} alt={ico}/>
                            </div>
                        )
                    })}
                </div>
                <div className='col-12 row nopadding' style={style.describe}>
                    <div className='col-12 col-sm-12 col-md-5' style={style.text}>
                        <span style={style.textColor}>Lokalizacja:</span>
                        <h3>{full_location}</h3>
                    </div>
                    <div className='col-12 col-sm-5 col-md-3' style={style.text}>
                        <span style={style.textColor}>Cena zł:</span>
                        <h3>{price}</h3>
                    </div>
                    <div className='col-6 col-sm-4 col-md-2' style={style.text}>
                        <span style={style.textColor}>Cena zł m<sup>2</sup>:</span>
                        <h3>{priceM2}</h3>
                    </div>
                    <div className='col-6 col-sm-3 col-md-2' style={style.text}>
                        <span style={style.textColor}>Powierzchnia m<sup>2</sup>:</span>
                        <h3>{surface}</h3>
                    </div>
                </div>
            </div>
        );
    }
}

export default HeaderOffer;