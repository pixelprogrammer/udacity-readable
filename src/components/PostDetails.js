import React, {Component} from 'react'
import {addComment} from '../utils/blogAPI'
import CommentsList from './CommentsList'
import CommentForm from './CommentForm'
import Post from './Post'
import {addCommentAction} from '../actions/comments'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

class PostDetails extends Component {

	static propTypes = {
		post: PropTypes.object.isRequired,
		comments: PropTypes.array.isRequired,
	}

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

	render() {
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
						<CommentsList comments={comments} />

					</div>
				</div>
			) : (
				<p className="message align-center">Post Not Found</p>
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