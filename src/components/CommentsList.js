import React, {Component} from 'react'
import Comment from './Comment'
import uuid from 'uuid/v4'
import Modal from 'react-modal'

const sortingOptions = {
	best:{
		name: "Best",
		callback: sortByBest
	},
	newest:{
		name: "Newest",
		callback: sortByNewest
	}
}

function sortByBest(a,b) {
	if( a.voteScore < b.voteScore) {
		return 1
	}

	if( a.voteScore > b.voteScore ) {
		return -1
	}

	return 0
}

function sortByNewest(a,b) {
	if( a.timestamp < b.timestamp) {
		return 1
	}

	if( a.timestamp > b.timestamp ) {
		return -1
	}

	return 0
}


class CommentsList extends Component {
	state = {
		sortby: "best",
		deleteModalIsOpen: false,
		commentToDelete: null,
		deleting: false,
	}

	sortChangeHandler(self) {
		return function(e) {
			console.log(e.currentTarget.value);
			const sort = e.currentTarget.value;
			self.setState({sortby:sort})
		}
	}

	openDeleteCommentModal = (comment) => {
		console.log('open comment modal', comment)
		this.setState({
			deleteModalIsOpen: true,
			commentToDelete: comment,
		});
	}

	buttonDeleteHandler = (comment) => {
		return function(e) {
			this.openDeleteCommentModal(comment)
			console.log(this.state.deleteModalIsOpen)
		}.bind(this)
	}
	closeDeleteCommentModal() {
		this.setState({
			deleteModalIsOpen: false
		})
	}
	
	completeDelete() {
		this.setState({
			deleting: false,
			deleteModalIsOpen: false,
			commentToDelete: null,
		})
	}
	render() {

		const {comments, onCommentVoteHandler, onCommentDeleteHandler} = this.props
		// let sortedComments = sortingOptions[this.state.sortby].callback(comments)

		return (
			<div className="comments-list-component">

				{comments.length > 0 ? (
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
						<div className="comments-list">
							{comments.sort(sortingOptions[this.state.sortby].callback).map((comment) => (
								<Comment key={uuid()} comment={comment} onVoteHandler={onCommentVoteHandler} onDeleteHandler={this.buttonDeleteHandler}/>
							))}
						</div>
						<Modal
							className="modal"
							overlayClassName="overlay"
							isOpen={this.state.deleteModalIsOpen}
							onRequestClose={this.closeDeleteCommentModal}
							contentLabel="Modal"
						>
							<h2 className="modal-header">Delete Comment</h2>
							<div className="modal-body">Are you sure you want to delete this comment? <strong>{this.state.commentToDelete ? this.state.commentToDelete.body : ''}</strong></div>
							<div className="modal-footer">
								<button className="button button-danger" onClick={onCommentDeleteHandler(this.state.commentToDelete)(this.completeDelete.bind(this))}>Delete Comment</button>
								<button className="button" onClick={this.closeDeleteCommentModal.bind(this)}>Cancel</button>
							</div>
						</Modal>
					</div>
				) : (
					<div className="message">No Comments</div>
				)}
			</div>
		)
	}
}

export default CommentsList