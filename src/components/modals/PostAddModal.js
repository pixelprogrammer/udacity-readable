import React, {Component} from 'react'
import Modal from 'react-modal'
import {addPost} from '../../utils/blogAPI'
import {isAddingPostAction, addPostAction} from '../../actions/posts'
import {connect} from 'react-redux'
import PostForm from '../PostForm'

class PostAddModal extends Component {

	closeModal = () => {
		const {isAddingPostAction} = this.props

		isAddingPostAction(false)
	}

	addPost = () => {
		// get all the input fields from the form
		const formData = {
			id: document.getElementById('add-post-id').value,
			title: document.getElementById('add-post-title').value,
			body: document.getElementById('add-post-content').value,
			author: document.getElementById('add-post-author').value,
			category: document.getElementById('add-post-category').value,
			timestamp: Date.now(),
		}
		
		const {addPostAction} = this.props;
		const closeModal = this.closeModal;

		addPost(formData, function(data) {
			const post = {
				...formData,
				...data,
			}
			addPostAction(post);
			closeModal();
		}, function(err) {
			console.error(err);
		});
	}

	render() {

		const {categories, isAddingPost} = this.props

		return (
			<Modal
				className='modal'
				overlayClassName='overlay'
				isOpen={isAddingPost}
				onRequestClose={this.closeModal}
				contentLabel='Modal'
			>
				<h2 className="modal-header">Add Post</h2>
				<div className="modal-body">
					<PostForm
						post={{}}
						categories={categories}
						hasSubmit={false}
					/>
				</div>
				<div className="modal-footer">
					<button className="button" onClick={this.closeModal}>Close</button>
					<button className="button button-primary" onClick={this.addPost}>Publish</button>
				</div>
			</Modal>
			
		)
	}
}

function mapStateToProps({blogPosts, categories}) {
	return {
		isAddingPost: blogPosts.isAdding,
		categories
	}
}

function mapDispatchToProps(dispatch) {
	return {
		addPostAction: (data) => dispatch(addPostAction(data)),
		isAddingPostAction: (data) => dispatch (isAddingPostAction(data)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(PostAddModal)