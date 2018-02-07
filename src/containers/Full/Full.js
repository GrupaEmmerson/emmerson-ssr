import React, {Component} from 'react';
import Header from '../../components/Header/';
import Home from '../../views/Home/';
import Sidebar from '../../components/Sidebar/';

class Full extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <div className="app-body">
          <Sidebar {...this.props}/>
          <main className="main">
              <Home/>
          </main>
        </div>
      </div>
    );
  }
}

export default Full;
