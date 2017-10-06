import {QUERY_CATEGORIES} from '../constants/CategoryConstants';

function categories(state=[], action) {

	switch(action.type) {
		case QUERY_CATEGORIES:
			return action.categories;
		default:
			return state
	}
}

export default categories;