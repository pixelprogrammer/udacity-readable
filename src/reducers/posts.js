import {
	ADD_POST,
	EDIT_POST,
	DELETE_POST,
	QUERY_POSTS,
	UPVOTE_POST,
	DOWNVOTE_POST,
	ADDING_POST,
	EDITING_POST,
	DELETING_POST,
	IS_ADDING,
	IS_EDITING,
	IS_DELETING,
} from '../constants/PostConstants'

const initialState = {
	posts: [],
	adding: false,
	editing: false,
	deleting: false,
	isAdding: false,
	isEditing: false,
	isDeleting: false,
}

function blogPosts (state = initialState, action) {
	let newState;

	switch(action.type) {
		case ADD_POST:
			const {post} = action;

			return {
				...state,
				posts: [
					...state.posts,
					post,
				]
			}
		case EDIT_POST:
			return {
				...state,
				posts: state.posts.map((p) => {
					if( p.id === action.post.id ) {
						return action.post;
					}

					return p;
				}),
			}
		case DELETE_POST:
			return {
				...state,
				posts: state.posts.filter((post) => action.id !== post.id)
			}
			
		case QUERY_POSTS:
			newState = {
				...state,
				posts: action.posts.filter((post) => !post.deleted ) 
			}
			return newState;
		case UPVOTE_POST:

			return {
				...state,
				posts: state.posts.map((post) => {
					if( action.id === post.id ) {
						return {...post, voteScore: ++post.voteScore}
					}

					return post
				})
			}
			
		case DOWNVOTE_POST:
			return {
				...state,
				posts: state.posts.map((post) => {
					if( action.id === post.id ) {
						return {...post, voteScore: --post.voteScore}
					}

					return post
				})
			}

		case ADDING_POST:
			return {
				...state,
				addingPost: action.adding,
			}
		case EDITING_POST:
			return {
				...state,
				editingPost: action.editing,
			}
		case DELETING_POST:
			return {
				...state,
				deletingPost: action.deleting,
			}
		case IS_ADDING:
			return {
				...state,
				isAdding: action.isAdding,
			}
		case IS_EDITING:
			return {
				...state,
				isEditing: action.isEditing,
			}
		case IS_DELETING:
			return {
				...state,
				isDeleting: action.isDeleting,
			}
		default:
			return state;
	}
}

export default blogPosts;