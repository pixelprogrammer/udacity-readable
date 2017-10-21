import React, {Component} from 'react'
import Modal from 'react-modal'
import {connect} from 'react-redux'
import {editPost, deletePost} from '../../utils/blogAPI'
import PostForm from '../PostForm'
import {editPostAction, isEditingPostAction, editingPostAction, deletePostAction} from '../../actions/posts'

class PostEditModal extends Component {

	onDelete = () => {
		const {deletePostAction} = this.props;
		const closeDeletePostModal = this.closeDeletePostModal;
		const post = this.state.postToDelete;

		deletePost(post.id, function(data) {
			closeDeletePostModal();
			deletePostAction(post.id);
		}, function(err) {
			console.error(err);
		});
	}

	closeModal = () => {
		this.props.isEditingPostAction(false)
		this.props.editingPostAction({})
	}

	onUpdate = () => {
		// get all the input fields from the form
		const formData = {
			id: document.getElementById('edit-post-id').value,
			title: document.getElementById('edit-post-title').value,
			body: document.getElementById('edit-post-content').value,
			author: document.getElementById('edit-post-author').value,
			category: document.getElementById('edit-post-category').value,
			timestamp: parseInt(document.getElementById('edit-post-timestamp').value),
		}
		
		const {editPostAction} = this.props;
		const closeModal = this.closeModal;

		editPost(formData, function(data) {
			editPostAction(data);
			closeModal();
		}, function(err) {
			console.error(err);
		});
	}

	render() {
		
		const {isEditing, categories, editingPost} = this.props

		console.log('Is editing: ', isEditing)

		return (

			<Modal
				className='modal'
				overlayClassName='overlay'
				isOpen={isEditing}
				onRequestClose={this.closeModal}
				contentLabel='Modal'
			>
				<h2 className="modal-header">Edit Post</h2>
				<div className="modal-body">
					<PostForm
						post={editingPost}
						categories={categories}
						hasSubmit={false}
					/>
				</div>
				<div className="modal-footer">
					<button className="button" onClick={this.closeModal}>Close</button>
					<button className="button button-primary" onClick={this.onUpdate}>Update</button>
				</div>
			</Modal>
		)
	}
}

function mapStateToProps({blogPosts, categories}) {
	return {
		isEditing: blogPosts.isEditing,
		editingPost: blogPosts.editingPost,
		isDeleting: blogPosts.isDeleting,
		deletingPost: blogPosts.deletingPost,
		categories
	}
}

function mapDispatchToProps(dispatch) {
	return {
		editPostAction: (data) => dispatch(editPostAction(data)),
		isEditingPostAction: (data) => dispatch(isEditingPostAction(data)),
		editingPostAction: (data) => dispatch(editingPostAction(data)),
		deletePostAction: (data) => dispatch(deletePostAction(data)),

	}
}

export default connect(mapStateToProps, mapDispatchToProps)(PostEditModal)