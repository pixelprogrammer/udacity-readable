import React, {Component} from 'react'
import {getPost, getComments, addComment} from '../utils/blogAPI'
import CommentsList from './CommentsList'
import CommentForm from './CommentForm'
import uuid from 'uuid/v4'
import Post from './Post'
import {addCommentAction} from '../actions/comments'
import {connect} from 'react-redux'

class PostDetails extends Component {

	onCommentAddHandler = (e) => {
		e.preventDefault()
		// get all the input fields from the form
		const formData = {
			body: document.getElementById('add-comment-content').value,
			author: document.getElementById('add-comment-author').value,
			parentId: document.getElementById('add-comment-post-id').value,
			timestamp: Date.now(),
		}
		
		const {addCommentAction} = this.props;
		const clearForm = this.clearCommentForm

		addComment(formData, function(data) {
			clearForm()
			addCommentAction(data)
		}, function(err) {
			console.error(err)
		});
	}

	clearCommentForm = () => {
		let content = document.getElementById('add-comment-content')
		let author = document.getElementById('add-comment-author')

		if(content) {
			content.value = ''
		}

		if(author) {
			author.value = ''
		}
	}

	state = {
		commentsLoading: true,
		loading: true,
		post: null,
		comments: [],
	}

	render() {
		// const {post, loading, comments} = this.state
		const {onDelete, onEdit, onVoteHandler, onCommentAddHandler, onCommentVoteHandler, onCommentDeleteHandler} = this.props
		const {post, comments} = this.props

		return (
			<div className="container">
			{post ? (
				<div>
					<Post 
						post={post} 
						showDetails={true}
					/>
					<div className="comments-section">
						<h2>Comments</h2>
						<h3>Add a comment</h3>
						<div className="comment-form-container">
							<CommentForm
								onSubmitHandler={this.onCommentAddHandler}
								comment={{}}
								postId={post.id}
								actionPrefix="add"
							/>
						</div>
						<CommentsList comments={comments} onCommentVoteHandler={onCommentVoteHandler} onCommentDeleteHandler={onCommentDeleteHandler} />

					</div>
				</div>
			) : (
				<div className="message">Post Not Found</div>
			)}
				
			</div>
		)
	}
}

function mapDispatchToProps(dispatch) {
	return {
		addCommentAction: (data) => dispatch(addCommentAction(data)),
	}
}

export default connect(null, mapDispatchToProps)(PostDetails)