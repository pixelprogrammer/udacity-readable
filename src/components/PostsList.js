import React from 'react'
import FaEdit from 'react-icons/lib/fa/edit';
import FaEye from 'react-icons/lib/fa/eye';
import FaTrashO from 'react-icons/lib/fa/trash-o';
import FaArrowDown from 'react-icons/lib/fa/arrow-down';
import FaArrowUp from 'react-icons/lib/fa/arrow-up';
import {displayDate} from '../utils/helpers';
import {Link} from 'react-router-dom';
import VoteScore from './PostScore';
import uuid from 'uuid/v4';

export default function PostsList({posts, onDelete, onVoteHandler}) {
	if(posts.length === 0 ) {
		return <p className="message notification">No Posts were added yet. What are you waiting for.....go add some.</p>
	}
	return (

		<ul className="post-list">
			{posts.map(post => (
				<li key={uuid()} className="post-item">
					<div className="post-box">
						<h2 className="post-title">{post.title}</h2>
						<p>Date: {displayDate(post.timestamp)}</p>
						<p>
							<span>Author: {post.author}</span>
						</p>
						<div className="post-options">
							<Link to={"/" + post.category + "/" + post.id} className="button-icon" title="View Post"><FaEye /></Link>
							<button className="button-icon" title="Edit Post"><FaEdit /></button>
							<button className="button-icon" title="Delete Post" onClick={() => {
								onDelete(post.id);
							}}>
								<FaTrashO className="danger" />
							</button>
						</div>
					</div>
					<div className="post-box-sidebar">
						<button className="button-icon" onClick={onVoteHandler('upvote', post.id)}>
								<FaArrowUp />
						</button>
						<VoteScore voteScore={post.voteScore} />
						<button className="button-icon" onClick={onVoteHandler('downvote', post.id)}>
								<FaArrowDown />
						</button>
					</div>
				</li>
			))}
		</ul>
	)
}