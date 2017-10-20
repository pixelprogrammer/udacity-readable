import React from 'react'
import FaArrowDown from 'react-icons/lib/fa/arrow-down';
import FaArrowUp from 'react-icons/lib/fa/arrow-up';
import VoteScore from './VoteScore';

export default function VoteSystem({voteScore,upvoteHandler,downvoteHandler}) {

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