import React, {Component} from 'react'
import PropTypes from 'prop-types'

/**
 * CommentForm can be used to both add/edit a content
 */
class CommentForm extends Component {

	static propTypes = {
		comment: PropTypes.object,
		postId: PropTypes.string.isRequired,
		actionPrefix: PropTypes.string.isRequired,
		onSubmitHandler: PropTypes.oneOfType([
			PropTypes.bool,
			PropTypes.func
		]),
	}

	render() {

		const {comment, onSubmitHandler, postId, actionPrefix} = this.props

		return (
			<form id={actionPrefix + "-comment-form"} className="comment-add-form" onSubmit={onSubmitHandler}>
				<input type="hidden" id={actionPrefix + "-comment-post-id"} name="parent-id" value={postId} />
				<input type="hidden" id={actionPrefix + "-comment-id"} name="comment-id" value={comment.id} />
				<div className="form-group">
					<textarea id={actionPrefix + "-comment-content"} className="input-full"  name="body" placeholder="Comment Content" defaultValue={comment.body}></textarea>
				</div>
				<div className="form-group">
					<input id={actionPrefix + "-comment-author"} type="text" name="author" placeholder="Author" defaultValue={comment.author} />
				</div>
				{onSubmitHandler !== false && (
					<input type="submit" className="button button-primary" name="add_comment" value={comment ? "Update Comment" : "Add Comment"} />
				)}
			</form>
		)
	}
}

export default CommentForm