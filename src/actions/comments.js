import {
	ADD_COMMENT,
	EDIT_COMMENT,
	ADD_COMMENTS,
	DELETE_COMMENT,
	UPVOTE_COMMENT,
	DOWNVOTE_COMMENT,
	EDITING_COMMENT,
	DELETING_COMMENT,
	IS_ADDING_COMMENT,
	IS_EDITING_COMMENT,
	IS_DELETING_COMMENT,
} from '../constants/CommentsConstants'

export function addCommentAction(comment) {
	return {
		type: ADD_COMMENT,
		comment
	}
}

export function editCommentAction(comment) {
	return {
		type: EDIT_COMMENT,
		comment
	}
}

export function deleteCommentAction(comment) {
	return {
		type: DELETE_COMMENT,
		comment
	}
}

export function addCommentsAction({postId, comments}) {
	return {
		type: ADD_COMMENTS,
		comments,
		postId
	}
}

export function upvoteCommentAction(comment) {
	return {
		type: UPVOTE_COMMENT,
		comment
	}
}

export function downvoteCommentAction(comment) {
	return {
		type: DOWNVOTE_COMMENT,
		comment
	}
}

export function editingCommentAction(comment) {
	return {
		type: EDITING_COMMENT,
		comment
	}
}

export function deletingCommentAction(comment) {
	return {
		type: DELETING_COMMENT,
		comment
	}
}

export function isAddingCommentAction(action) {
	return {
		type: IS_ADDING_COMMENT,
		isAdding: action,
	}
}

export function isEditingCommentAction(action) {
	return {
		type: IS_EDITING_COMMENT,
		isEditing: action,
	}
}

export function isDeletingCommentAction(action) {
	return {
		type: IS_DELETING_COMMENT,
		isDeleting: action,
	}
}