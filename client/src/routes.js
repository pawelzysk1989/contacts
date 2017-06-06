import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import Contacts from './components/contact/Contacts';
import ContactDetails from './components/contact/ContactDetails';
import Preloader from './components/common/Preloader';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Preloader(Contacts, 0)}/>
    <Route path="contact" component={ContactDetails}/>
    <Route path="contact/:id" component={ContactDetails}/>
  </Route>
);
