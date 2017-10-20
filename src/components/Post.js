import React from 'react'
import FaEdit from 'react-icons/lib/fa/edit';
import FaEye from 'react-icons/lib/fa/eye';
import FaTrashO from 'react-icons/lib/fa/trash-o';
import {displayDate} from '../utils/helpers';
import {Link} from 'react-router-dom';
import VoteSystem from './VoteSystem';

export default function Post({post, onDelete, onVoteHandler, showDetails}) {
	
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
					<button className="button-icon" title="Edit Post"><FaEdit /></button>
					<button className="button-icon" title="Delete Post" onClick={() => {
						onDelete(post.id);
					}}>
						<FaTrashO className="danger" />
					</button>
				</div>
			</div>
			<div className="post-box-sidebar">
				<VoteSystem voteScore={post.voteScore} upvoteHandler={onVoteHandler('upvote', post.id)} downvoteHandler={onVoteHandler('downvote', post.id)} />
			</div>
		</div>
	)
}