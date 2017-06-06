import * as types from '../constants/actionTypes';
import initialState from './initialState';

export default function(state = initialState.contacts, action) {
	switch(action.type) {
		
		case types.LOAD_CONTACTS_SUCCESS: {
			const payload = action.payload;
			return { ...state, contacts: payload.contacts,  count: payload.count, offset: payload.offset };
		}

		case types.CREATE_CONTACT_SUCCESS: {
			return { ...state };
		}

		case types.UPDATE_CONTACT_SUCCESS: {
			const payload = action.payload;
			return { ...state, contacts: state.contacts.map(contact => contact._id !== payload._id ? contact : {_id: payload._id, ...payload.contact})};
		}

		case types.DELETE_CONTACT_SUCCESS: {
			return { ...state };
		}

	}
	
  return state;
}


