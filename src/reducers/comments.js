import {
	ADD_COMMENT,
	DELETE_COMMENT,
	EDIT_COMMENT,
	ADD_COMMENTS,
	UPVOTE_COMMENT,
	DOWNVOTE_COMMENT,
} from '../constants/CommentsConstants'

function comments (state = {}, action) {
	let newState;
	switch(action.type) {
		case ADD_COMMENT:
			const {comment} = action;
			console.log('Comment added action called')
			return {
				...state,
				[comment.parentId]: [
					...state[comment.parentId],
					comment
				]
				
			}
		case EDIT_COMMENT:
			newState = state.map((p) => {
				if( p.id === action.comment.id ) {
					return action.comment;
				}

				return p;
			});

			return newState;
		case DELETE_COMMENT:
			newState = {
				...state,
				[action.comment.parentId]: state[action.comment.parentId].filter((comment) => action.comment.id !== comment.id) 
			} 

			return newState;
		case ADD_COMMENTS:
			newState = {
				...state
			}

			if( typeof action.comments !== 'undefined') {
				newState[action.postId] = action.comments
			}
			return newState;
		case UPVOTE_COMMENT:
			var {comment} = action
			newState = {...state}

			newState[comment.parentId].map((c) => {
				if( c.id === comment.id ) {
					c.voteScore++;
				}

				return c;
			})

			return newState;
		case DOWNVOTE_COMMENT:
			var {comment} = action
			newState = {...state}

			newState[comment.parentId].map((c) => {
				if( c.id === comment.id ) {
					c.voteScore--;
				}

				return c;
			})

			return newState;
		default:
			return state;
	}
}

export default comments;