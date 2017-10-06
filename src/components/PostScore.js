import React from 'react'

export default function VoteScore({voteScore}) {
	
	const score = parseInt(voteScore, 10);
	let voteClass = "vote-score";
	if( score > 0 ) {
		voteClass += " positive";
		voteScore = "+" + voteScore;
	} else if( score < 0) {
		voteClass += " negative";
	}

	return (
		<div className={voteClass}>{voteScore}</div>			
	)
}