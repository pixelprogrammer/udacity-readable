import React, {Component} from 'react'
import FaEdit from 'react-icons/lib/fa/edit'
import FaEye from 'react-icons/lib/fa/eye'
import FaCommentO from 'react-icons/lib/fa/comment-o'
import FaTrashO from 'react-icons/lib/fa/trash-o'
import {displayDate} from '../utils/helpers'
import {Link} from 'react-router-dom'
import PostVoter from './PostVoter'
import {isDeletingPostAction, deletingPostAction, isEditingPostAction, editingPostAction} from '../actions/posts'
import {connect} from 'react-redux'

class Post extends Component {

	onEdit = (post) => () => {
		const {isEditingPostAction, editingPostAction} = this.props

		isEditingPostAction(true)
		editingPostAction(post)
	}

	onDelete = (post) => () => {
		const {isDeletingPostAction, deletingPostAction} = this.props

		isDeletingPostAction(true)
		deletingPostAction(post)
	}

	filterPostComments = (comments) => {
		const {post} = this.props
		return comments[post.id] ? comments[post.id].length : 0
	}

	render() {
		const {post, comments} = this.props
		let {showDetails} = this.props
		const postComments = this.filterPostComments(comments)

		if( typeof showDetails === 'undefined' ) {
			showDetails = false
		}

		return (
			<div className="post-item">
				<div className="post-box">
					<h2 className="post-title">{post.title}</h2>
					<p>
						<FaCommentO /> {postComments}
					</p>
					<p>Date: {displayDate(post.timestamp)}</p>
					<p>
						<span>Author: {post.author}</span>
					</p>
					{showDetails && (
						<div className="post-content">
							{post.body}
						</div>
					)}
					<div className="post-options">
						{!showDetails && (
							<Link to={"/" + post.category + "/" + post.id} className="button-icon" title="View Post"><FaEye /></Link>
						)}
						<button className="button-icon" title="Edit Post" onClick={this.onEdit(post)}><FaEdit /></button>
						<button className="button-icon" title="Delete Post" onClick={this.onDelete(post)}>
							<FaTrashO className="danger" />
						</button>
					</div>
				</div>
				<div className="post-box-sidebar">
					<PostVoter post={post}/>
				</div>
			</div>
		)
	}
}

function mapStateToProps({comments}) {
	return {
		comments: comments.comments,
	}
}

function mapDispatchToProps(dispatch) {
	return {
		isEditingPostAction: (data) => dispatch(isEditingPostAction(data)),
		editingPostAction: (data) => dispatch(editingPostAction(data)),
		isDeletingPostAction: (data) => dispatch(isDeletingPostAction(data)),
		deletingPostAction: (data) => dispatch(deletingPostAction(data)),
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Post)