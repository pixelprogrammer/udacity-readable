import React, {Component} from 'react'
import Post from './Post';
import uuid from 'uuid/v4';
import {sortingOptions} from '../utils/helpers'
import {connect} from 'react-redux'
import {deletePostAction, editPostAction} from '../actions/posts'
import PropTypes from 'prop-types'

class PostsList extends Component {
	
	static propTypes = {
		posts: PropTypes.array.isRequired,
		category: PropTypes.string
	}

	state = {
		sortby: "best"
	}

	sortChangeHandler = (self) => {
		return function(e) {
			const sort = e.currentTarget.value;
			self.setState({sortby:sort})
		}
	}
	
	render() {
		const {posts,category} = this.props

		const showPosts = typeof category === 'undefined'
		const postList = posts.filter((post) => showPosts || post.category === category);

		if(posts.length === 0 ) {
			return <p className="message notification">No Posts were added yet. What are you waiting for.....go add some.</p>
		}

		if(postList.length === 0 && category) {
			return <p className="message notification">No Posts for {category} category</p> 
		}
		return (
			<div>
				<div className="clearfix comment-sorting">
					<form className="comment-sorting-form">
						<label htmlFor="comment-sorter">Sort By: </label>
						<select name="comment-sorter" id="comment-sorter" value={this.state.sortby} onChange={this.sortChangeHandler(this)}>
							{Object.keys(sortingOptions).map((key) => {
								return (
									<option key={uuid()} value={key}>{sortingOptions[key].name}</option>
								)
							})}
						</select>
					</form>
				</div>
				<ul className="post-list">
					{postList.sort(sortingOptions[this.state.sortby].callback).map(post => (
						<li key={uuid()} className="post-list-item">
							<Post 
								post={post} 
								showDetails={false}
							/>
						</li>
					))}
				</ul>
			</div>
		)
		
	}
}

function mapStateToProps({categories}) {
	return {
		categories
	}
}
function mapDispatchToProps(dispatch) {
	return {
		deletePostAction: (data) => dispatch(deletePostAction(data)),
		editPostAction: (data) => dispatch(editPostAction(data)),
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(PostsList)