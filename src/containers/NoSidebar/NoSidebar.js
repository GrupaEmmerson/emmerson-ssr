import React, {Component} from 'react';
import HeaderNoSidebar from '../../components/HeaderNoSidebar/';
import Offer from "../../views/Offer/Offer";
import Footer from "../../components/Footer/Footer";

class NoSidebar extends Component {
    render() {
        return (
            <div className="app">
                <HeaderNoSidebar />
                <div className="app-body">
                    <main className="main">
                        <Offer {...this.props}/>
                    </main>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default NoSidebar;