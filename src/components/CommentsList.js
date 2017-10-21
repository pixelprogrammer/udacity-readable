import React, {Component} from 'react'
import Comment from './Comment'
import uuid from 'uuid/v4'
import Modal from 'react-modal'
import {sortingOptions} from '../utils/helpers'
import CommentForm from './CommentForm'


class CommentsList extends Component {
	state = {
		sortby: "best",
		deleteModalIsOpen: false,
		commentToDelete: null,
		deleting: false,
		commentToEdit: {},
		editModalIsOpen: false,
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
	onCommentEditHandler = (comment) => (e) => {
		console.log(comment)
		this.setState({
			editModalIsOpen: true,
			commentToEdit: comment,
		})
	}
	closeEditCommentModal = () => {
		console.log('closing modal')

		this.setState({
			editModalIsOpen: false,
		})
	}
	completeDelete() {
		this.setState({
			deleting: false,
			deleteModalIsOpen: false,
			commentToDelete: null,
		})
	}

	updateCommentHandler() {
		const {onCommentUpdateHandler} = this.props
		console.log('updating comment')

		this.closeEditCommentModal()
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
								<Comment 
									key={uuid()} 
									comment={comment} 
									onVoteHandler={onCommentVoteHandler} 
									onDeleteHandler={this.buttonDeleteHandler} 
									onEditHandler={this.onCommentEditHandler}
								/>
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
						<Modal
							className="modal"
							overlayClassName="overlay"
							isOpen={this.state.editModalIsOpen}
							onRequestClose={this.onEditModalClose}
							contentLabel="Modal"
						>
							<h2 className="modal-header">Edit Comment</h2>
							<CommentForm 
								comment={this.state.commentToEdit}
								onSubmitHandler={false}
								postId={this.state.commentToEdit.postId}
								actionPrefix={"edit"}
							/>
							<div className="modal-footer">
								<button className="button button-primary" onClick={this.updateCommentHandler.bind(this)}>Update</button>
								<button className="button" onClick={this.closeEditCommentModal}>Cancel</button>
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