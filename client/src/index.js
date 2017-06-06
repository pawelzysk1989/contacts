/* eslint-disable import/default */

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import configureStore from './store/configureStore';
import { loadContacts } from './actions/contactActions';
import { syncHistoryWithStore } from 'react-router-redux';
import 'materialize-css/dist/js/materialize.js'
import 'materialize-css/dist/css/materialize.css'
import 'material-design-icons/iconfont/material-icons.css'
import './styles/styles.scss';
import 'toastr/build/toastr.min.css';

$(".button-collapse").sideNav();

const store = configureStore();

store.dispatch(loadContacts());

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>, document.getElementById('app')
);

