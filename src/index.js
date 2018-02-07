import React from 'react';
import ReactDOM from 'react-dom';

import { Route, Switch, Router} from 'react-router-dom';
import { createMemoryHistory, createBrowserHistory} from 'history';

import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';

// Styles
import 'font-awesome/css/font-awesome.min.css';
import 'simple-line-icons/css/simple-line-icons.css';
import './scss/index.css';

// Containers
import Full from './containers/Full/';
import MainPageContainer from './containers/MainPageContainer/';
import reducers from './reducers';
import {GET_LOCATION} from "./actions/types";
import NoSidebar from "./containers/NoSidebar/";

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);
store.dispatch({type: GET_LOCATION});

let history;
if (typeof(window) !== 'undefined'){
    history = createBrowserHistory();
}
else {
    history = createMemoryHistory(); //This kind of history is needed for server-side rendering.
}

ReactDOM.render((
    <Provider store={store}>
        <Router history={history} >
            <Switch>
                <Route path="/offer/:id" name="Offer Page" component={NoSidebar}/>
                <Route path="/search" name="Search Page" component={Full}/>
                <Route path="/" name="Main Page" component={MainPageContainer}/>
            </Switch>
        </Router>
    </Provider>
), document.getElementById('root'));
