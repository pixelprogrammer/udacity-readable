import React, {Component} from 'react'
import Post from './Post';
import uuid from 'uuid/v4';
import {sortingOptions} from '../utils/helpers'
import Modal from 'react-modal'
import {connect} from 'react-redux'
import {deletePostAction, editPostAction} from '../actions/posts'
import {deletePost, editPost} from '../utils/blogAPI'
import PostForm from './PostForm'

class PostsList extends Component {

	state = {
		sortby: "best",
		postToDelete: {},
		deleteModalOpen: false,
		postToEdit: {},
		editModalOpen: false,
	}

	sortChangeHandler = (self) => {
		return function(e) {
			console.log(e.currentTarget.value);
			const sort = e.currentTarget.value;
			self.setState({sortby:sort})
		}
	}

	

	render() {
		const {posts, onVoteHandler, onDelete, onEdit, category, categories, showDetails} = this.props

		const showPost = typeof category === 'undefined'
		const postList = posts.filter((post) => showPost || post.category === category);

		if(posts.length === 0 ) {
			return <p className="message notification">No Posts were added yet. What are you waiting for.....go add some.</p>
		}
		return (
			<div>
				<div className="clearfix comment-sorting">
					<form className="comment-sorting-form">
						<label htmlFor="comment-sorter">Sort By: </label>
						<select name="comment-sorter" id="comment-sorter" onChange={this.sortChangeHandler(this)}>
							<option value="best">Best</option>
							<option value="newest">Newest</option>
						</select>
					</form>
				</div>
				<ul className="post-list">
					{postList.sort(sortingOptions[this.state.sortby].callback).map(post => (
						<li key={uuid()} className="post-list-item">
							<Post 
								post={post} 
								showDetails={showDetails}
							/>
						</li>
					))}
				</ul>
				<Modal
					className="modal"
					overlayClassName="overlay"
					isOpen={this.state.deleteModalOpen}
					onRequestClose={this.closeDeletePostModal}
					contentLabel="Modal"
				>
					<h2 className="modal-header">Delete Post</h2>
					<div className="modal-body">Are you sure you want to delete this post? <strong>{this.state.postToDelete.title}</strong></div>
					<div className="modal-footer">
						<button className="button button-danger" onClick={this.onDelete}>Delete Post</button>
						<button className="button" onClick={this.closeDeletePostModal}>Cancel</button>
					</div>
				</Modal>
				<Modal
					className='modal'
					overlayClassName='overlay'
					isOpen={this.state.editModalOpen}
					onRequestClose={this.closeEditPostModal}
					contentLabel='Modal'
				>
					<h2 className="modal-header">Edit Post</h2>
					<div className="modal-body">
						<PostForm
							post={this.state.postToEdit}
							categories={categories}
							hasSubmit={false}
						/>
					</div>
					<div className="modal-footer">
						<button className="button" onClick={this.closeEditPostModal}>Close</button>
						<button className="button button-primary" onClick={this.onEdit}>Update</button>
					</div>
				</Modal>
			</div>
		)
		
	}
}

function mapStateToProps({categories}) {
	return {
		categories
	}
}
function mapDispatchToProps(dispatch) {
	return {
		deletePostAction: (data) => dispatch(deletePostAction(data)),
		editPostAction: (data) => dispatch(editPostAction(data)),
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(PostsList)