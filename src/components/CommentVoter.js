import React, {Component} from 'react'
import VoteSystem from './VoteSystem'
import {upvoteComment, downvoteComment} from '../utils/blogAPI'
import {connect} from 'react-redux'
import {upvoteCommentAction, downvoteCommentAction} from '../actions/comments'
import PropTypes from 'prop-types'

class CommentVoter extends Component {
	
	static propTypes = {
		comment: PropTypes.object.isRequired,
	}

	onVoteHandler = (voteType, comment) => {

		const {upvoteCommentAction, downvoteCommentAction} = this.props

		return function() {

			const onComplete = function(data) {
				if( voteType === 'upvote' ) {
					upvoteCommentAction(comment);
				} else {
					downvoteCommentAction(comment);
				}
			}

			const onError = function(err) {
				console.error(err);
			}

			if( voteType === "upvote" ) {
				upvoteComment(comment.id, onComplete, onError);
			} else {
				downvoteComment(comment.id, onComplete, onError);
			}
		}
	}

	render() {

		const {comment} = this.props
		return (
			<VoteSystem voteScore={comment.voteScore} upvoteHandler={this.onVoteHandler('upvote', comment).bind(this)} downvoteHandler={this.onVoteHandler('downvote', comment).bind(this)} />
		)
	}
}

function mapDispatchToProps(dispatch) {
	return {
		upvoteCommentAction: (data) => dispatch(upvoteCommentAction(data)),
		downvoteCommentAction: (data) => dispatch(downvoteCommentAction(data)),
	}
}
export default connect(null, mapDispatchToProps)(CommentVoter)