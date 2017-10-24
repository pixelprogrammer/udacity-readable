import React, {Component} from 'react'
import Modal from 'react-modal'
import {connect} from 'react-redux'
import {isDeletingCommentAction, deletingCommentAction, deleteCommentAction} from '../../actions/comments'
import {deleteComment} from '../../utils/blogAPI'

class CommentDeleteModal extends Component {

	closeModal = () => {
		this.props.isDeletingCommentAction(false)
		this.props.deletingCommentAction(null)
	}

	deleteComment = () => {
		const {deletingComment, deletingCommentAction, deleteCommentAction} = this.props
		const closeModal = this.closeModal

		deleteComment(deletingComment.id, function(data) {
			deleteCommentAction(deletingComment)
			closeModal()
		}, function(err) {
			console.error("Failed to delete comment. Error with server")
		})
	}
	render() {

		const {isDeleting, deletingComment} = this.props

		return (
			<Modal
				className="modal"
				overlayClassName="overlay"
				isOpen={isDeleting}
				onRequestClose={this.closeModal}
				contentLabel="Modal"
			>
				{deletingComment !== null && (
					<div>
						<h2 className="modal-header">Delete Comment</h2>
						<div className="modal-body">Are you sure you want to delete this comment? <br/><strong>{deletingComment.body}</strong></div>
						<div className="modal-footer">
							<button className="button button-danger" onClick={this.deleteComment}>Delete Comment</button>
							<button className="button" onClick={this.closeModal}>Cancel</button>
						</div>
					</div>
				)}
			</Modal>
		)
	}
}

function mapStateToProps({comments}) {
	return {
		isDeleting: comments.isDeleting,
		deletingComment: comments.deletingComment,
	}
}

function mapDispatchToProps(dispatch) {
	return {
		isDeletingCommentAction: (data) => dispatch(isDeletingCommentAction(data)),
		deletingCommentAction: (data) => dispatch(deletingCommentAction(data)),
		deleteCommentAction: (data) => dispatch(deleteCommentAction(data)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentDeleteModal)