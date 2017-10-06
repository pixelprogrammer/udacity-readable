const monthNames = [
	"January", "February", "March","April", "May", "June", "July", "August", "September", "October", "November", "December"
]


// format should be [month name] [day], [year]
export function displayDate(timestamp) {
	const date = new Date(timestamp);
	return monthNames[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
}