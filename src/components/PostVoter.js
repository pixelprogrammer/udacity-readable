import React, {Component} from 'react'
import VoteSystem from './VoteSystem'
import {upvotePost, downvotePost} from '../utils/blogAPI'
import {connect} from 'react-redux'
import {upvotePostAction, downvotePostAction} from '../actions/posts'

class PostVoter extends Component {
	
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

	render() {

		const {post} = this.props
		return (
			<VoteSystem 
				voteScore={post.voteScore} 
				upvoteHandler={this.onVoteHandler('upvote', post.id)} 
				downvoteHandler={this.onVoteHandler('downvote', post.id)} 
			/>
		)
	}
}

function mapDispatchToProps(dispatch) {
	return {
		upvotePostAction: (data) => dispatch(upvotePostAction(data)),
		downvotePostAction: (data) => dispatch(downvotePostAction(data)),
	}
}
export default connect(null, mapDispatchToProps)(PostVoter)