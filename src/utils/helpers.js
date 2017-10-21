const monthNames = [
	"January", "February", "March","April", "May", "June", "July", "August", "September", "October", "November", "December"
]
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


// format should be [month name] [day], [year]
export function displayDate(timestamp) {
	const date = new Date(timestamp);
	return monthNames[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
}

export {sortingOptions}

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