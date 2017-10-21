import React, { Component } from 'react';
import { connect } from 'react-redux'
import {Route, Link, withRouter} from 'react-router-dom';
import logo from '../logo.svg';
import '../App.css';
import PostsList from './PostsList';
import {addPostAction, editPostAction, deletePostAction, queryPostsAction, upvotePostAction, downvotePostAction, isAddingPostAction} from '../actions/posts';
import {queryCategories} from '../actions/categories';
import {addCommentAction, addCommentsAction, upvoteCommentAction, downvoteCommentAction, deleteCommentAction} from '../actions/comments';
import FaPlus from 'react-icons/lib/fa/plus';
import Modal from 'react-modal'
import uuid from 'uuid/v4'
import {getPosts, getCategories, addPost, editPost, deletePost, upvotePost, downvotePost, addComment, updateComment, upvoteComment, downvoteComment, getComments, deleteComment} from '../utils/blogAPI'
import PostDetails from './PostDetails'
import CategoryList from './CategoryList'
import PostForm from './PostForm'
import PostEditModal from './modals/PostEditModal'
import PostAddModal from './modals/PostAddModal'

class App extends Component {

	state = {
		loadedPosts: false,
		loadedCategories: false,
	}

	componentDidMount() {
		this.getAllPosts();
		this.getAllCategories();
	}

	addPostButton = () => {
		const {isAddingPostAction} = this.props

		console.log('Clicked on the add post button')
		isAddingPostAction(true)
	}

	editPost = () => {
		// get all the input fields from the form
		const formData = {
			id: document.getElementById('edit-post-id').value,
			title: document.getElementById('edit-post-title').value,
			body: document.getElementById('edit-post-content').value,
			author: document.getElementById('edit-post-author').value,
			category: document.getElementById('edit-post-category').value,
			timestamp: parseInt(document.getElementById('edit-post-timestamp').value),
		}
		

		const {editPostAction} = this.props;
		const closePostEditModal = this.closePostEditModal;

		editPost(formData, function(data) {
			editPostAction(data);
			closePostEditModal();
		}, function(err) {
			console.error(err);
		});
	}
	onDeletePost = () => {
		const {deletePostAction} = this.props;
		const closeDeleteModal = this.closeDeleteModal;
		const postId = this.state.deletePostId;

		deletePost(postId, function(data) {
			closeDeleteModal();
			deletePostAction(postId);
		}, function(err) {
			console.error(err);
		});

	}

	getAllPosts = () => {
		const {queryPostsAction, addCommentsAction} = this.props;
		let self = this;

		getPosts(function(data) {
			queryPostsAction({posts:data});
			let requests = [];
			for(let post of data) {
				var q = getComments(post.id, function(comments) {
					addCommentsAction({postId: post.id, comments})
				}, function(err) {
					console.error(err);
				})

				requests.push(q);
			}
			Promise.all(requests)
				.then(values => {
					self.setState({loadedPosts: true})
				})
		}, function(err) {
			console.error(err);
		});
		
	}

	filterComments = (comments, postId) => {
		if( comments && comments.hasOwnProperty(postId) && Array.isArray(comments[postId]) ) {
			return comments[postId].filter(comment => !comment.deleted)
		}

		return []
	}

	getAllCategories = () => {
		const {queryCategories} = this.props;
		let self = this
		getCategories(function(data) {
			queryCategories(data);
			self.setState({loadedCategories:true})
			console.log('loaded categories: ', data)
		}, function(err) {
			console.error(err);
		});
	}

	onVoteHandler = (voteType, id) => {

		const {upvotePostAction, downvotePostAction} = this.props

		return function() {

			const onComplete = function(data) {
				if( voteType === 'upvote' ) {
					upvotePostAction(id);
				} else {
					downvotePostAction(id);
				}
			}

			const onError = function(err) {
				console.error(err);
			}

			if( voteType === "upvote" ) {
				upvotePost(id, onComplete, onError);
			} else {
				downvotePost(id, onComplete, onError);
			}
		}
	}

	onCommentVoteHandler = (voteType, id) => {
		const {upvoteCommentAction, downvoteCommentAction} = this.props

		return function() {

			const onComplete = function(data) {
				console.log(data)
				if( voteType === 'upvote' ) {
					upvoteCommentAction(data);
				} else {
					downvoteCommentAction(data);
				}
			}

			const onError = function(err) {
				console.error(err);
			}

			if( voteType === "upvote" ) {
				upvoteComment(id, onComplete, onError);
			} else {
				downvoteComment(id, onComplete, onError);
			}
		}
	}

	onCommentDeleteHandler = (comment) => (onComplete) => {
		const {deleteCommentAction} = this.props
		console.log(comment)
		// return a function so we can pass in a callback 
		return function(e) {
			deleteComment(comment.id, function(data) {
				deleteCommentAction(comment)
				onComplete()
			}, function(err) {
				console.log(err)
				onComplete()
			})
		}
	}

	onCommentAddHandler = (e) => {
		e.preventDefault();

		// get all the input fields from the form
		const formData = {
			body: document.getElementById('add-comment-content').value,
			author: document.getElementById('add-comment-author').value,
			parentId: document.getElementById('add-comment-post-id').value,
			timestamp: Date.now(),
		}
		
		const {addCommentAction} = this.props;

		addComment(formData, function(data) {
			addCommentAction(data);
		}, function(err) {
			console.error(err);
		});
	}

	onCommentUpdateHandler = (e) => {
		e.preventDefault();

		// get all the input fields from the form
		const formData = {
			body: document.getElementById('edit-comment-content').value,
			author: document.getElementById('edit-comment-author').value,
			parentId: document.getElementById('edit-comment-post-id').value,
			id: document.getElementById('edit-comment-id').value,
		}

		const {editCommentAction} = this.props;

		console.log(formData);

		// updateComment(formData)
	}
	render() {
		let postToBeDeleted = ""
		const {loadedPosts, loadedCategories} = this.state;
		const {categories, comments, blogPosts} = this.props;
		const {posts} = blogPosts

		if( this.state.deletePostId ) {
			const deleteP = posts.find((post) => {
				return post.id === this.state.deletePostId
			})

			postToBeDeleted = deleteP.title
		}


		return (
			<div className="App">

				<div className="header clearfix">
					<div className="company-title"><img className="App-logo" src={logo} alt="logo"/>Readable</div>
					<nav className="main-nav nav-right">
						<li className="menu-item"><Link className="item" to="/">Home</Link></li>

						<li className="menu-item"><Link className="item" to="/categories">Categories</Link></li>
						<li className="menu-item"></li>
					</nav>

				</div>
					<Route path="/" exact render={() => (
						<div className="main-page">
							<div className="container">
								<h2 className="title">The Main page</h2>
								<div className="row clearfix">
									<div className="left-column">
										{loadedCategories ?
											<div>
												<h2>Categories</h2> 
												<CategoryList categories={categories} />
											</div>
											: (
												<div className="loading">Loading Categories...</div>
											)
										}
										
									</div>
									<div className="right-column">
										<PostsList 
											posts={posts}
										/>
									</div>
								</div>
							</div>
						</div>
					)}/>
					<Route 
						path="/:category"
						exact
						render={(props) => (
							<div className="category-page">
								<h2 className="title">The category Page</h2>
								<PostsList 
									posts={this.props.posts} 
									category={props.match.params.category} 
								/>
							</div>
						)}
					/>
					<Route exact path="/:category/:post_id" render={(props) => (
						!loadedPosts ? (
							<div className="loading">Loading...</div>
						) : (
							<PostDetails 
								post={posts.find(post => (post.id === props.match.params.post_id))}
								comments={this.filterComments(comments, props.match.params.post_id)}
							/>

						)
					)}/>

				<PostAddModal />
				<PostEditModal />				
				<div className="actions-bar">
					<button className="action-item" onClick={this.addPostButton}>
						<FaPlus /> Add Post
					</button>
				</div>
			</div>
		);
	}
}

function mapStateToProps ({blogPosts, categories, comments}) {
	
	return {
		blogPosts,
		categories,
		comments
	}
}

function mapDispatchToProps (dispatch) {
	return {
		addPostAction: (data) => dispatch(addPostAction(data)),
		isAddingPostAction: (data) => dispatch(isAddingPostAction(data)),
		editPostAction: (data) => dispatch(editPostAction(data)),
		deletePostAction: (data) => dispatch(deletePostAction(data)),
		queryPostsAction: (data) => dispatch(queryPostsAction(data)),
		upvotePostAction: (data) => dispatch(upvotePostAction(data)),
		downvotePostAction: (data) => dispatch(downvotePostAction(data)),
		queryCategories: (data) => dispatch(queryCategories(data)),
		addCommentAction: (data) => dispatch(addCommentAction(data)),
		addCommentsAction: (data) => dispatch(addCommentsAction(data)),
		upvoteCommentAction: (data) => dispatch(upvoteCommentAction(data)),
		downvoteCommentAction: (data) => dispatch(downvoteCommentAction(data)),
		deleteCommentAction: (data) => dispatch(deleteCommentAction(data))
	}
}

export default withRouter(connect(
	mapStateToProps,
	mapDispatchToProps
)(App))
