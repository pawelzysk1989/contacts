import * as types from '../constants/actionTypes';
import axios from 'axios';
import { ROOT_URL, SEARCH_LIMIT } from '../constants/variables';
import { beginAjaxCall, ajaxCallError } from './ajaxStatusActions';


export function loadContactsSuccess(contacts) {
  return { type: types.LOAD_CONTACTS_SUCCESS, payload: contacts};
}

export function createContactSuccess(contact) {
  return { type: types.CREATE_CONTACT_SUCCESS, payload: contact};
}

export function updateContactSuccess(data) {
  return { type: types.UPDATE_CONTACT_SUCCESS, payload: data};
}

export function deleteContactSuccess(data) {
  return { type: types.DELETE_CONTACT_SUCCESS, payload: data};
}

export function getContactSuccess(data) {
  return { type: types.GET_CONTACT_SUCCESS, payload: data};
}

export function loadContacts(offset=0, limit=SEARCH_LIMIT) {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return axios.get(`${ROOT_URL}/getAllContacts?offset=${offset}&limit=${limit}`)
      .then(response => {
        dispatch(loadContactsSuccess(response.data));
      })
      .catch(error => {
        dispatch(ajaxCallError(error));
        throw(error);
      });
  };
}

export function createContact(contact) {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return axios.post(`${ROOT_URL}/addContact`, contact)
      .then(response => {
        dispatch(createContactSuccess(response.data));
      })
      .catch(error => {
        dispatch(ajaxCallError(error));
        throw(error);
      });
  };
}

export function updateContact(data) {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return axios.put(`${ROOT_URL}/updateContact`, data)
      .then(() => {
        dispatch(updateContactSuccess(data));
      })
      .catch(error => {
        dispatch(ajaxCallError(error));
        throw(error);
      });
  };
}

export function deleteContact(_id) {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return axios({
      method: "delete",
      url: `${ROOT_URL}/removeContact`,
      data: {_id}
    })
    .then(response => {
      dispatch(deleteContactSuccess(response));
    })
    .catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}

export function getContact(_id) {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return axios({
      method: "get",
      url: `${ROOT_URL}/getContact/${_id}`
    })
    .then(response => {
      dispatch(getContactSuccess(response));
      return response;
    })
    .catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}














