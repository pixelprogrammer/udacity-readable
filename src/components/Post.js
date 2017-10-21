import React, {Component} from 'react'
import FaEdit from 'react-icons/lib/fa/edit'
import FaEye from 'react-icons/lib/fa/eye'
import FaTrashO from 'react-icons/lib/fa/trash-o'
import {displayDate} from '../utils/helpers'
import {Link} from 'react-router-dom'
import PostVoter from './PostVoter'
import {isDeletingPostAction, deletingPostAction, isEditingPostAction, editingPostAction} from '../actions/posts'
import {connect} from 'react-redux'

class Post extends Component {

	onEdit = (post) => () => {
		console.log('trying to edit post: ', post)
		const {isEditingPostAction, editingPostAction} = this.props

		isEditingPostAction(true)
		editingPostAction(post)
	}

	onDelete = (post) => () => {
		console.log('trying to delete post: ', post)
		const {isDeletingPostAction, deletingPostAction} = this.props

		isDeletingPostAction(true)
		deletingPostAction(post)
	}
	render() {
		const {post, onDelete, onEdit, onVoteHandler} = this.props
		let {showDetails} = this.props
		
		if( typeof showDetails === 'undefined' ) {
			showDetails = false
		}

		return (
			<div className="post-item">
				<div className="post-box">
					<h2 className="post-title">{post.title}</h2>
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
						<button className="button-icon" title="Delete Post" onClick={() => {
							onDelete(post.id);
						}}>
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

function mapDispatchToProps(dispatch) {
	return {
		isEditingPostAction: (data) => dispatch(isEditingPostAction(data)),
		editingPostAction: (data) => dispatch(editingPostAction(data)),
		isDeletingPostAction: (data) => dispatch(isDeletingPostAction(data)),
		deletingPostAction: (data) => dispatch(deletingPostAction(data)),
	}
}
export default connect(null, mapDispatchToProps)(Post)