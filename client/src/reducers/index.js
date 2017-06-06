import { combineReducers } from 'redux';
import ajaxCallsInProgress from './ajaxStatusReducer';
import {routerReducer} from 'react-router-redux';
import { reducer as form } from 'redux-form';
import contactReducer from './contactReducer';


const rootReducer = combineReducers({
  ajaxCallsInProgress,
  form,
  contacts: contactReducer,
  routing: routerReducer
});

export default rootReducer;

