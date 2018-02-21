import React, {Component} from "react";

let testWeakMap = new WeakMap();

class ImageOfferBox extends Component {

    constructor (props, context) {
        super(props, context);
        this.state = {

        }
    }

    get state () {
        return testWeakMap.get(this);
    }

    set state (value) {
        testWeakMap.set(this, value);
    }

    render(){
        const {image} = this.props;
        return(
            <div style={{ }}>
                <div style={{backgroundImage: 'url("'+image+'")', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center', backgroundSize: 'contain', minHeight: 220+'px', zIndex: 999}}>
                    <div style={{backgroundImage: 'url("/img/kafelek_sprzedam.svg")', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center', backgroundSize: 'contain', minHeight: 220+'px', zIndex: 99}}/>
                </div>
            </div>
        );
    }
}

export default ImageOfferBox;