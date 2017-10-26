import React, {Component} from 'react'
import Modal from 'react-modal'
import {connect} from 'react-redux'
import {isEditingCommentAction, editingCommentAction, editCommentAction} from '../../actions/comments'
import {updateComment} from '../../utils/blogAPI'
import CommentForm from '../CommentForm'

class CommentEditModal extends Component {

	closeModal = () => {
		this.props.isEditingCommentAction(false)
		this.props.editingCommentAction(null)
	}

	updateComment = () => {
		// get all the input fields from the form
		const formData = {
			body: document.getElementById('edit-comment-content').value,
			author: document.getElementById('edit-comment-author').value,
			parentId: document.getElementById('edit-comment-post-id').value,
			id: document.getElementById('edit-comment-id').value,
		}

		const {editCommentAction} = this.props;
		const closeModal = this.closeModal

		updateComment(formData, function(comment) {
			editCommentAction(comment)
			closeModal()
		}, function(err) {
			console.error(err)
		})

	}

	render() {

		const {isEditing, editingComment} = this.props

		return (

			<Modal
				className="modal"
				overlayClassName="overlay"
				isOpen={isEditing}
				onRequestClose={this.closeModal}
				contentLabel="Modal"
			>
				<h2 className="modal-header">Edit Comment</h2>
				{editingComment !== null && (
					<CommentForm 
						comment={editingComment}
						onSubmitHandler={false}
						postId={editingComment.parentId}
						actionPrefix={"edit"}
					/>
				)}
				<div className="modal-footer">
					<button className="button button-primary" onClick={this.updateComment}>Update</button>
					<button className="button" onClick={this.closeModal}>Cancel</button>
				</div>
			</Modal>
		)
	}
}

function mapStateToProps({comments}) {
	return {
		isEditing: comments.isEditing,
		editingComment: comments.editingComment,
	}
}

function mapDispatchToProps(dispatch) {
	return {
		isEditingCommentAction: (data) => dispatch(isEditingCommentAction(data)),
		editingCommentAction: (data) => dispatch(editingCommentAction(data)),
		editCommentAction: (data) => dispatch(editCommentAction(data)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentEditModal)