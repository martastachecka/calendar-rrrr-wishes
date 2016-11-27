import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import {
  Router,
  Route,
  IndexRoute,
  browserHistory,
} from 'react-router'

import App from './app/App';
import Users from './users/Users';
import Dashboard from './dashboard/Dashboard';
import NotFound from './not-found/NotFound';
import Login from './login';
import store from './store';

import { fetchEvents, checkLogin } from './dashboard/actionCreators';
import { fetchSunriseSunset } from './dashboard/actionCreators';
import './dashboard/notifications';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './index.css';

function fetchAllData() {
  store.dispatch(fetchEvents())
  store.dispatch(fetchSunriseSunset())
}

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App} onEnter={() => fetchAllData()}>
                <IndexRoute component={Login} />
                <Route
                  path="/dashboard"
                  component={Dashboard}
                  onEnter={(nextState, replace) => {
                    store.dispatch(checkLogin(replace));
                  }}
                />
                <Route
                  path="/users"
                  component={Users}
                  onEnter={(nextState, replace) => {
                    store.dispatch(checkLogin(replace));
                  }}
                />
                <Route path="*" component={NotFound} />
            </Route>
        </Router>
    </Provider>,
  document.getElementById('root')
);
