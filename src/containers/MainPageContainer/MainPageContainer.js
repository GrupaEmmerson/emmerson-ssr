import React, {Component} from 'react';
import HeaderMainPage from '../../components/HeaderMainPage/';
import MainPage from '../../views/MainPage/';
import Footer from "../../components/Footer/Footer";

class MainPageContainer extends Component {
    render() {
        return (
            <div className="app">
                <HeaderMainPage />
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