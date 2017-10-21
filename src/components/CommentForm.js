import React, {Component} from 'react'
import uuid from 'uuid/v4'

/**
 * CommentForm can be used to both add/edit a content
 */
class CommentForm extends Component {

	render() {

		const {comment, onSubmitHandler, postId, actionPrefix} = this.props

		return (
			<form id="add-comment-form" className="comment-add-form">
				<input type="hidden" id="add-comment-post-id" name="parent-id" value={postId} />
				<div className="form-group">
					<textarea id="add-comment-content" className="input-full"  name="body" placeholder="Comment Content" defaultValue={comment.body}></textarea>
				</div>
				<div className="form-group">
					<input id="add-comment-author" type="text" name="author" placeholder="Author" defaultValue={comment.author} />
				</div>
				{onSubmitHandler !== false && (
					<input type="submit" className="button button-primary" name="add_comment" value={comment ? "Update Comment" : "Add Comment"} onClick={onSubmitHandler} />
				)}
			</form>
		)
	}
}

export default CommentForm