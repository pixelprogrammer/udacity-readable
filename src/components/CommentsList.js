import React, {Component} from 'react'
import Comment from './Comment'
import uuid from 'uuid/v4'
import {sortingOptions} from '../utils/helpers'
import PropTypes from 'prop-types'

class CommentsList extends Component {
	
	static propTypes = {
		comments: PropTypes.array.isRequired,
	}

	state = {
		sortby: "best",
	}

	sortChangeHandler(self) {
		return function(e) {
			const sort = e.currentTarget.value;
			self.setState({sortby:sort})
		}
	}

	openDeleteCommentModal = (comment) => {
		this.setState({
			deleteModalIsOpen: true,
			commentToDelete: comment,
		});
	}

	buttonDeleteHandler = (comment) => {
		return function(e) {
			this.openDeleteCommentModal(comment)
		}.bind(this)
	}
	closeDeleteCommentModal() {
		this.setState({
			deleteModalIsOpen: false
		})
	}
	onCommentEditHandler = (comment) => (e) => {
		this.setState({
			editModalIsOpen: true,
			commentToEdit: comment,
		})
	}
	closeEditCommentModal = () => {

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
		this.closeEditCommentModal()
	}
	render() {

		const {comments} = this.props

		return (
			<div className="comments-list-component">

				{comments.length > 0 ? (
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
						<div className="comments-list">
							{comments.sort(sortingOptions[this.state.sortby].callback).map((comment) => (
								<Comment 
									key={uuid()} 
									comment={comment} 
								/>
							))}
						</div>
						
					</div>
				) : (
					<div className="message">No Comments</div>
				)}
			</div>
		)
	}
}

export default CommentsList