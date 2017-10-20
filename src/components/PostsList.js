import React, {Component} from 'react'
import Post from './Post';
import uuid from 'uuid/v4';

class PostsList extends Component {

	render() {
		const {posts, onVoteHandler, onDelete, category} = this.props

		const showPost = typeof category === 'undefined'
		const postList = posts.filter((post) => showPost || post.category === category);

		if(posts.length === 0 ) {
			return <p className="message notification">No Posts were added yet. What are you waiting for.....go add some.</p>
		}
		return (

			<ul className="post-list">
				{postList.map(post => (
					<li key={uuid()} className="post-list-item">
						<Post 
							post={post} 
							onDelete={() => {onDelete(post.id)}}
							onVoteHandler={onVoteHandler}
							showDetails={false}
						/>
					</li>
				))}
			</ul>
		)
		
	}
}

export default PostsList