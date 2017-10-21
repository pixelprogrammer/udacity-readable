import React, {Component} from 'react'
import Post from './Post';
import uuid from 'uuid/v4';
import {sortingOptions} from '../utils/helpers'

class PostsList extends Component {

	state = {
		sortby: "best"
	}

	sortChangeHandler = (self) => {
		return function(e) {
			console.log(e.currentTarget.value);
			const sort = e.currentTarget.value;
			self.setState({sortby:sort})
		}
	}
	render() {
		const {posts, onVoteHandler, onDelete, onEdit, category} = this.props

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
								onDelete={() => {onDelete(post.id)}}
								onEdit={onEdit(post)}
								onVoteHandler={onVoteHandler}
								showDetails={false}
							/>
						</li>
					))}
				</ul>
			</div>
		)
		
	}
}

export default PostsList