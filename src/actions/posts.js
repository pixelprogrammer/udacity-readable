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

export function addPostAction(post) {
	return {
		type: ADD_POST,
		post
	}
}

export function editPostAction(post) {
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

export function addingPostAction(post) {
	return {
		type: ADDING_POST,
		adding: post,
	}
}

export function editingPostAction(post) {
	return {
		type: EDITING_POST,
		editing: post,
	}
}

export function deletingPostAction(post) {
	return {
		type: DELETING_POST,
		deleting: post,
	}
}

export function isAddingPostAction(action) {
	return {
		type: IS_ADDING,
		isAdding: action
	}
}

export function isEditingPostAction(action) {
	return {
		type: IS_EDITING,
		isEditing: action
	}
}

export function isDeletingPostAction(action) {
	return {
		type: IS_DELETING,
		isDeleting: action
	}
}