import React, {Component} from 'react'
import VoteSystem from './VoteSystem'
import {displayDate} from '../utils/helpers';
import FaEdit from 'react-icons/lib/fa/edit';
import FaTrashO from 'react-icons/lib/fa/trash-o';

class Comment extends Component {

	render() {
		const {comment, onVoteHandler, onDeleteHandler, onEditHandler} = this.props
		console.log(onVoteHandler);

		return (
			<div className="container">
				<div className="post-item">
					<div className="post-box">
						<h2 className="post-title">{comment.author}</h2>
						<p className="post-details">
							Date: {displayDate(comment.timestamp)}
						</p>
						<div className="post-content">
							{comment.body}
						</div>
						<div className="post-options">
							<button className="button-icon" title="Edit Post" onClick={onEditHandler(comment)}><FaEdit /></button>
							<button className="button-icon" title="Delete Post" onClick={onDeleteHandler(comment)}>
								<FaTrashO className="danger" />
							</button>
						</div>
					</div>
					<div className="post-box-sidebar">
						<VoteSystem 
							voteScore={comment.voteScore}
							upvoteHandler={onVoteHandler('upvote', comment.id)}
							downvoteHandler={onVoteHandler('downvote', comment.id)}
						/>
					</div>
				</div>	
			</div>
		)
	}
}

export default Comment