import {
	ADD_POST,
	EDIT_POST,
	DELETE_POST,
	QUERY_POSTS,
	UPVOTE_POST,
	DOWNVOTE_POST
} from '../constants/PostConstants'

export function addPostAction(post) {
	return {
		type: ADD_POST,
		post
	}
}

export function editPostAction({post}) {
	return {
		type: EDIT_POST,
		post
	}
}

export function deletePostAction(id) {
	return {
		type: DELETE_POST,
		id
	}
}

export function queryPostsAction({posts}) {
	return {
		type: QUERY_POSTS,
		posts
	}
}

export function upvotePostAction(id) {
	return {
		type: UPVOTE_POST,
		id
	}
}

export function downvotePostAction(id) {
	return {
		type: DOWNVOTE_POST,
		id
	}
}