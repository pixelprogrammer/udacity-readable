import {
	ADD_COMMENT,
	DELETE_COMMENT,
	EDIT_COMMENT,
	ADD_COMMENTS,
	UPVOTE_COMMENT,
	DOWNVOTE_COMMENT,
	ADDING_COMMENT,
	EDITING_COMMENT,
	DELETING_COMMENT,
	IS_ADDING_COMMENT,
	IS_EDITING_COMMENT,
	IS_DELETING_COMMENT,
} from '../constants/CommentsConstants'

const initialState = {
	comments: {},
	isAdding: false,
	isEditing: false,
	isDeleting: false,
	editingComment: null,
	deletingComment: null,
}

function comments (state = initialState, action) {
	let newState;
	switch(action.type) {
		case ADD_COMMENT:
			let comments = state.comments[action.comment.parentId] ? state.comments[action.comment.parentId] : []
			comments.push(action.comment)
			return {
				...state,
				comments: {
					...state.comments,
					[action.comment.parentId]: comments
				}
			}
		case EDIT_COMMENT:
			return {
				...state,
				comments: {
					...state.comments,
					[action.comment.parentId]: state.comments[action.comment.parentId].map(c => {
						if(c.id === action.comment.id) {
							return action.comment
						}

						return c
					})
				}
			}
		case DELETE_COMMENT:
			return {
				...state,
				comments: {
					...state.comments,
					[action.comment.parentId]: state.comments[action.comment.parentId].filter((comment) => action.comment.id !== comment.id) 
				}
			}
		case ADD_COMMENTS:
			return {
				...state,
				comments: {
					...state.comments,
					[action.postId]: action.comments
				}
			}
		case UPVOTE_COMMENT:
			return {
				...state,
				comments: {
					...state.comments,
					[action.comment.parentId]: state.comments[action.comment.parentId].map(c => {
						if( c.id === action.comment.id ) {
							c.voteScore++;
						}

						return c;
					})
				}
			}
		case DOWNVOTE_COMMENT:
			return {
				...state,
				comments: {
					...state.comments,
					[action.comment.parentId]: state.comments[action.comment.parentId].map(c => {
						if( c.id === action.comment.id ) {
							c.voteScore--;
						}

						return c;
					})
				}
			}
		case EDITING_COMMENT:
			return {
				...state,
				editingComment: action.comment
			}
		case DELETING_COMMENT:
			return {
				...state,
				deletingComment: action.comment
			}
		case IS_ADDING_COMMENT:
			return {
				...state,
				isAdding: action.isAdding,
			}
		case IS_EDITING_COMMENT:
			return {
				...state,
				isEditing: action.isEditing,
			}
		case IS_DELETING_COMMENT:
			return {
				...state,
				isDeleting: action.isDeleting,
			}
		default:
			return state;
	}
}

export default comments;