import {
	ADD_POST,
	DELETE_POST,
	EDIT_POST,
	QUERY_POSTS,
	UPVOTE_POST,
	DOWNVOTE_POST,
} from '../constants/PostConstants'

function posts (state = [], action) {
	let newState;

	switch(action.type) {
		case ADD_POST:
			const {post} = action;

			return [
				...state,
				post
			]
		case EDIT_POST:
			newState = state.map((p) => {
				if( p.id === action.post.id ) {
					return action.post;
				}

				return p;
			});

			return newState;
		case DELETE_POST:

			newState = state.filter((post) => action.id !== post.id)
			
			return newState;
		case QUERY_POSTS:

			return action.posts.filter((post) => !post.deleted );
		case UPVOTE_POST:
			newState = state.map((post) => {
				if( action.id === post.id ) {
					console.log('voted post up: ' + post.title);
					post.voteScore++;
				}

				return post;
			});
			return newState;
		case DOWNVOTE_POST:
			newState = state.map((post) => {
				if( action.id === post.id ) {
					post.voteScore--;
				}

				return post;
			});

			return newState;
		default:
			return state;
	}
}

export default posts;