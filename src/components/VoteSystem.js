import React, {Component} from 'react'
import FaArrowDown from 'react-icons/lib/fa/arrow-down';
import FaArrowUp from 'react-icons/lib/fa/arrow-up';
import VoteScore from './VoteScore';
import PropTypes from 'prop-types'

class VoteSystem extends Component {

	static propTypes = {
		voteScore: PropTypes.number.isRequired,
		downvoteHandler: PropTypes.func.isRequired,
		upvoteHandler: PropTypes.func.isRequired,
	}
	
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