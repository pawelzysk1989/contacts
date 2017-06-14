import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import Contacts from './components/contact/Contacts';
import ContactDetails from './components/contact/ContactDetails';
import {default as Preloader} from './components/common/Preloader';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Preloader(Contacts)}/>
    <Route path="contact" component={Preloader(ContactDetails)}/>
    <Route path="contact/:id" component={Preloader(ContactDetails)}/>
  </Route>
);
