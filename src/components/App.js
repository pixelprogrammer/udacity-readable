import React, { Component } from 'react';
import { connect } from 'react-redux'
import {Route, Link} from 'react-router-dom';
import logo from '../logo.svg';
import '../App.css';
import PostsList from './PostsList';
import {addPostAction, editPostAction, deletePostAction, queryPostsAction} from '../actions/posts';
import {queryCategories} from '../actions/categories';
import FaPlus from 'react-icons/lib/fa/plus';
import Modal from 'react-modal'
import uuid from 'uuid/v4'
import {getPosts, getCategories, addPost} from '../utils/blogAPI'

class App extends Component {

	state = {
		editorOpen: false,
		deleteModalOpen: false,
		deletePostId: null,
		editPostId: 0,
		addPostId: "",
	}

	componentDidMount() {
		this.getAllPosts();
		this.getAllCategories();
	}

	openDeleteModal = (postId) => {
		this.setState({
			deleteModalOpen: true,
			deletePostId: postId
		})
	}

	closeDeleteModal = () => {
		this.setState({
			deleteModalOpen: false,
			deletePostId: null,
		})
	}
	openPostEditModal = () => {
		this.setState({
			addPostId: uuid(),
			editorOpen: true
		});
	}

	closePostEditModal = () => {
		document.getElementById('add-post-id').value = uuid();
		this.setState({editorOpen: false});
	}

	addPost = () => {
		// get all the input fields from the form
		const formData = {
			id: document.getElementById('add-post-id').value,
			title: document.getElementById('add-post-title').value,
			body: document.getElementById('add-post-content').value,
			author: document.getElementById('add-post-author').value,
			category: document.getElementById('add-post-category').value,
			timestamp: Date.now(),
		}
		// var form = document.getElementById('add-post-form');
		// console.log(form);
		// var formData = new FormData(form);
		console.log(formData);

		const query = addPost(formData);
		query.then(function(res) {
			if( res.ok ) {
				console.log('post added');
				return res.json();
			}

			console.log(res);
			console.error("Ok post was not added");
		}).then(function(data) {
			console.log(data);
			// this.props.addPostAction(data);
		}).catch(function(err) {
			console.error(err);
		});
	}

	deletePost = (id) => {
		// open modal with two options
		// if option cancel close modal
		// if option ok delete post and close modal
	}
	getAllPosts = () => {
		const {queryPostsAction} = this.props;

		const query = getPosts();
		query.then(function(res) {
			if(res.ok) {
				return res.json();
			}

			console.error('Could not retrieve the posts');
		}).then(function(data) {
			queryPostsAction({posts:data});

		}).catch(function(err) {
			console.log('There was an error');
			console.error(err);
		});
	}


	getAllCategories = () => {
		const {queryCategories} = this.props;

		const query = getCategories();
		query.then(function(res) {
			if(res.ok) {
				return res.json();
			}

			console.error('Unable to retrieve categories');
		}).then(function(data) {
			queryCategories(data);
		}).catch(function(err) {
			console.error(err);
		})
	}
	render() {
		let postToBeDeleted = ""
		if( this.state.deletePostId ) {
			const deleteP = this.props.posts.find((post) => {
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

				<Route path="/:category/:post_id" render={() => (
					<div className="post-details">Hello</div>
				)}/>
				<Route path="/" exact render={() => (
					<div className="main-page">
						<div className="container">
							<h2 className="title">The Main page</h2>
							<PostsList posts={this.props.posts} onDelete={this.openDeleteModal} />
						</div>
					</div>
				)}/>

				<Modal
					className='modal'
					overlayClassName='overlay'
					isOpen={this.state.editorOpen}
					onRequestClose={this.closePostEditModal}
					contentLabel='Modal'
				>
					<h2 className="modal-header">Add Post</h2>
					<div className="modal-body">
						<form id="add-post-form" className="post-add-form">
							<input type="hidden" id="add-post-id" name="id" value={this.state.addPostId} />
							<div className="form-group">
								<input id="add-post-title" className="input-full" type="text" name="title" placeholder="Post Title"/>
							</div>
							<div className="form-group">
								<textarea id="add-post-content" className="input-full"  name="body" placeholder="Post Content"></textarea>
							</div>
							<div className="form-group">
								<input id="add-post-author" type="text" name="author" placeholder="Author"/>
							</div>
							<div className="form-group">
								<select id="add-post-category" name="category">
									<option value="">--Category--</option>
									{this.props.categories.map((category) => (

										<option key={uuid()} value={category.path}>{category.name}</option>
									))}
								</select>
							</div>
						</form>
					</div>
					<div className="modal-footer">
						<button className="button" onClick={this.closePostEditModal}>Close</button>
						<button className="button button-primary" onClick={this.addPost}>Save</button>
					</div>
				</Modal>
				<Modal
					className="modal"
					overlayClassName="overlay"
					isOpen={this.state.deleteModalOpen}
					onRequestClose={this.closeDeleteModal}
					contentLabel="Modal"
				>
					<h2 className="modal-header">Delete Post</h2>
					<div className="modal-body">Are you sure you want to delete this post? <strong>{postToBeDeleted}</strong></div>
					<div className="modal-footer">
						<button className="button button-danger" onClick={this.deletePost}>Delete Post</button>
						<button className="button" onClick={this.closeDeleteModal}>Cancel</button>
					</div>
				</Modal>
				<div className="actions-bar">
					<button className="action-item" onClick={this.openPostEditModal}>
						<FaPlus /> Add Post
					</button>
				</div>
			</div>
		);
	}
}

function mapStateToProps ({posts, categories}) {
	
	return {
		posts,
		categories
	}
}

function mapDispatchToProps (dispatch) {
	return {
		addPostAction: (data) => dispatch(addPostAction(data)),
		editPostAction: (data) => dispatch(editPostAction(data)),
		deletePostAction: (data) => dispatch(deletePostAction(data)),
		queryPostsAction: (data) => dispatch(queryPostsAction(data)),
		queryCategories: (data) => dispatch(queryCategories(data))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App)
