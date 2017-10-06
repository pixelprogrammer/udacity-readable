import {QUERY_CATEGORIES} from "../constants/CategoryConstants"

export function queryCategories({categories}) {
	return {
		type: QUERY_CATEGORIES,
		categories,
	}
}