import React, {Component} from 'react'
import {displayDate} from '../utils/helpers'
import FaEdit from 'react-icons/lib/fa/edit'
import FaTrashO from 'react-icons/lib/fa/trash-o'
import CommentVoter from './CommentVoter'
import {connect} from 'react-redux'
import {isEditingCommentAction, editingCommentAction, isDeletingCommentAction, deletingCommentAction} from '../actions/comments'

class Comment extends Component {
	onEditHandler = (comment) => () => {
		this.props.isEditingCommentAction(true)
		this.props.editingCommentAction(comment)
	}
	onDeleteHandler = (comment) => () =>  {
		this.props.isDeletingCommentAction(true)
		this.props.deletingCommentAction(comment)
	}

	render() {
		const {comment} = this.props

		return (
			<div className="container">
				<div className="post-item">
					<div className="post-box">
						<h2 className="post-title">{comment.author}</h2>
						<p className="post-details">
							Date: {displayDate(comment.timestamp)}
						</p>
						<div className="post-content">
							{comment.body}
						</div>
						<div className="post-options">
							<button className="button-icon" title="Edit Post" onClick={this.onEditHandler(comment)}><FaEdit /></button>
							<button className="button-icon" title="Delete Post" onClick={this.onDeleteHandler(comment)}>
								<FaTrashO className="danger" />
							</button>
						</div>
					</div>
					<div className="post-box-sidebar">
						<CommentVoter comment={comment} />
					</div>
				</div>	
			</div>
		)
	}
}

function mapDispatchToProps(dispatch) {
	return {
		isEditingCommentAction: (data) => dispatch(isEditingCommentAction(data)),
		editingCommentAction: (data) => dispatch(editingCommentAction(data)),
		isDeletingCommentAction: (data) => dispatch(isDeletingCommentAction(data)),
		deletingCommentAction: (data) => dispatch(deletingCommentAction(data)),
	}
}
export default connect(null, mapDispatchToProps)(Comment)