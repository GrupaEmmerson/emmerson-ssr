import React, {Component} from 'react';
import HeaderMainPage from '../../components/HeaderMainPage/';
import MainPage from '../../views/MainPage/';
import Footer from "../../components/Footer/Footer";
import SidebarMainPage from '../../components/SidebarMainPage/';

class MainPageContainer extends Component {
    render() {
        return (
            <div className="app">
                <HeaderMainPage />
                <div className="app-body">
                    <SidebarMainPage {...this.props}/>
                    <main className="main" >
                        <MainPage/>
                    </main>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default MainPageContainer;