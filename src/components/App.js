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
import {getPosts, getCategories, getComments} from '../utils/blogAPI'
import PostDetails from './PostDetails'
import CategoryList from './CategoryList'
import PostEditModal from './modals/PostEditModal'
import PostAddModal from './modals/PostAddModal'
import PostDeleteModal from './modals/PostDeleteModal'
import CommentEditModal from './modals/CommentEditModal'
import CommentDeleteModal from './modals/CommentDeleteModal'

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

		isAddingPostAction(true)
	}
	
	getAllPosts = () => {
		const {queryPostsAction, addCommentsAction} = this.props;
		let self = this;

		getPosts(function(data) {
			queryPostsAction({posts:data});
			let requests = [];
			for(let post of data) {
				var q = getComments(post.id, function(comments) {
					if(comments && comments.length > 0) {
						addCommentsAction({postId: post.id, comments})
					}
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
		}, function(err) {
			console.error(err);
		});
	}

	render() {
		const {loadedPosts, loadedCategories} = this.state;
		const {categories, comments, blogPosts} = this.props;
		const {posts} = blogPosts

		return (
			<div className="App">

				<div className="header clearfix">
					<div className="company-title"><img className="App-logo" src={logo} alt="logo"/>Readable</div>
					<nav className="main-nav nav-right">
						<li className="menu-item"><Link className="item" to="/">Home</Link></li>
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
										category={props.match.params.category} 
									/>
								</div>
							</div>
						)}
					/>
					<Route exact path="/:category/:post_id" render={(props) => (
						!loadedPosts ? (
							<div className="loading">Loading...</div>
						) : (
							<PostDetails 
								post={posts.find(post => (post.id === props.match.params.post_id))}
								comments={this.filterComments(comments.comments, props.match.params.post_id)}
							/>

						)
					)}/>

				<PostAddModal />
				<PostEditModal />
				<PostDeleteModal />
				<CommentEditModal />
				<CommentDeleteModal />		
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
