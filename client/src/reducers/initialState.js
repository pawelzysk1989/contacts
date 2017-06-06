import { SEARCH_LIMIT } from '../constants/variables';

export default {
	contacts: {
		contacts: [],
		offset: 0,
		limit: SEARCH_LIMIT,
		count: 0
	},
	ajaxCallsInProgress: 0
};
