import {combineReducers} from 'redux'
import blogPosts from './posts'
import categories from './categories'
import comments from './comments'

export default combineReducers({
	blogPosts,
	categories,
	comments
});