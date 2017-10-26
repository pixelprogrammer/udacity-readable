import React, {Component} from 'react'
import FaArrowDown from 'react-icons/lib/fa/arrow-down';
import FaArrowUp from 'react-icons/lib/fa/arrow-up';
import VoteScore from './VoteScore';

class VoteSystem extends Component {

	
	render() {

		const {voteScore,upvoteHandler,downvoteHandler} = this.props

		return (
			<div>
				<button className="button-icon" onClick={upvoteHandler}>
					<FaArrowUp />
				</button>
				<VoteScore voteScore={voteScore} />
				<button className="button-icon" onClick={downvoteHandler}>
					<FaArrowDown />
				</button>
				
			</div>		
		)
	}
}
export default VoteSystem