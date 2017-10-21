import React, {Component} from 'react'
import Modal from 'react-modal'
import {connect} from 'react-redux'
import {deletePost} from '../../utils/blogAPI'
import {isDeletingPostAction, deletePostAction, deletingPostAction} from '../../actions/posts'

class PostDeleteModal extends Component {
	
	closeModal = () => {
		const {isDeletingPostAction} = this.props

		isDeletingPostAction(false)
		deletePostAction({})
	}

	deletePost = () => {
		const {deletePostAction, deletingPost} = this.props;
		const closeModal = this.closeModal;
		const post = deletingPost;

		deletePost(post.id, function(data) {
			deletePostAction(post.id);
			closeModal();
		}, function(err) {
			console.error(err);
		});
	}

	render() {

		const {isDeleting, deletingPost} = this.props

		return (
			<Modal
				className="modal"
				overlayClassName="overlay"
				isOpen={isDeleting}
				onRequestClose={this.closeModal}
				contentLabel="Modal"
			>	
				{deletingPost && (
					<div>
						<h2 className="modal-header">Delete Post</h2>
						<div className="modal-body">Are you sure you want to delete this post? <strong>{deletingPost.title}</strong></div>
						<div className="modal-footer">
							<button className="button button-danger" onClick={this.deletePost}>Delete Post</button>
							<button className="button" onClick={this.closeModal}>Cancel</button>
						</div>
					</div>
				)}
			</Modal>
		)
	}
}

function mapStateToProps({blogPosts}) {
	return {
		isDeleting: blogPosts.isDeleting,
		deletingPost: blogPosts.deletingPost,
	}
}

function mapDispatchToProps(dispatch) {
	return {
		isDeletingPostAction: (data) => dispatch(isDeletingPostAction(data)),
		deletingPostAction: (data) => dispatch(deletingPostAction(data)),
		deletePostAction: (data) => dispatch(deletePostAction(data)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDeleteModal)