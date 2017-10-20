import {
	ADD_COMMENT,
	EDIT_COMMENT,
	ADD_COMMENTS,
	DELETE_COMMENT,
	UPVOTE_COMMENT,
	DOWNVOTE_COMMENT,
} from '../constants/CommentsConstants'

export function addCommentAction(comment) {
	return {
		type: ADD_COMMENT,
		comment
	}
}

export function editCommentAction({comment}) {
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