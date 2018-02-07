import React, {Component} from 'react';
import HeaderNoSidebar from '../../components/HeaderNoSidebar/';
import MainPage from '../../views/MainPage/';
import Footer from "../../components/Footer/Footer";

class MainPageContainer extends Component {
    render() {
        return (
            <div className="app">
                <HeaderNoSidebar />
                <div className="app-body">
                    <main className="main nopadding">
                        <MainPage/>
                    </main>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default MainPageContainer;