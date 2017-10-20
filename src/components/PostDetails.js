import React, {Component} from 'react'
import {getPost, getComments} from '../utils/blogAPI'
import CommentsList from './CommentsList'
import CommentForm from './CommentForm'
import uuid from 'uuid/v4'
import Post from './Post'

class PostDetails extends Component {


	state = {
		commentsLoading: true,
		loading: true,
		post: null,
		comments: [],
	}

	componentDidMount() {

		// // const {post_id, category} = this.props.match.params;
		// // const self = this
		// const {post} = this.props

		// if( post ) {
		// 	getPost(post_id,
		// 		function(data) {
					
		// 			self.setState({
		// 				loading:false,
		// 				post: data
		// 			})

		// 			getComments(post_id, function(data){
		// 				self.setState({
		// 					commentsLoading: false,
		// 					comments: data
		// 				});
		// 			}, function(err) {
		// 				console.error(err)
		// 			})
		// 		},
		// 		function(err) {
		// 			console.error(err);
		// 		}
		// 	)
		// }
	}

	render() {
		// const {post, loading, comments} = this.state
		const {onDelete, onVoteHandler, onCommentAddHandler, onCommentVoteHandler, onCommentDeleteHandler} = this.props
		const {post, comments} = this.props

		return (
			<div className="container">
			{post ? (
				<div>
					<Post 
						post={post} 
						onDelete={() => {onDelete(post.id)}}
						onVoteHandler={onVoteHandler}
						showDetails={true}
					/>
					<div className="comments-section">
						<h2>Comments</h2>
						<h3>Add a comment</h3>
						<div className="comment-form-container">
							<CommentForm
								onSubmitHandler={onCommentAddHandler}
								comment={null}
								postId={post.id}
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

export default PostDetails