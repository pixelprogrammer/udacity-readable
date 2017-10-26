import uuid from 'uuid/v4'

const API_TOKEN = process.env.AUTHORIZATION_TOKEN
const API_URL = process.env.API_URL || 'http://localhost:3001'
const headers = {
	'Authorization': API_TOKEN,
	'Accept': 'application/json',
	'Content-Type': 'application/json'
}

function apiFetch(url, options={}) {
	options = {
		...options,
		headers 
	}

	return fetch(url, options);
}

export function getPost(id, onComplete, onError) {
	apiFetch(API_URL + '/posts/' + id)
	.then(function(res) {
		if( res.ok ) {
			return res.json();
		}

		console.error('Error could not get post details for id' + id);
	})
	.then(onComplete)
	.catch(onError)
}

export function getPosts(onComplete, onError) {
	apiFetch(API_URL + '/posts')
	.then(function(res) {
		if(res.ok) {
			return res.json();
		}
		console.error('Error Adding post');
	})
	.then(onComplete)
	.catch(onError);
}

export function addPost(data, onComplete, onError) {
	apiFetch('http://localhost:3001/posts', {
		method: 'POST',
		body: JSON.stringify(data)
	})
	.then(function(res) {
		if(res.ok) {
			return res.json();
		}
		console.error('Error Adding post');
	})
	.then(onComplete)
	.catch(onError);
}

export function editPost(data, onComplete, onError) {
	apiFetch('http://localhost:3001/posts/' + data.id, {
		method: 'PUT',
		body: JSON.stringify(data)
	})
	.then(function(res) {
		if(res.ok) {
			return res.json();
		}
		console.error('Error Adding post');
	})
	.then(onComplete)
	.catch(onError);
}

export function deletePost(id, onComplete, onError) {
	apiFetch(API_URL + '/posts/' + id, {
		method: "DELETE"
	})
	.then(function(res) {
		if(res.ok) {
			return res.json();
		}
		console.error('Error deleting post');
	})
	.then(onComplete)
	.catch(onError);
}

export function upvotePost(id, onComplete, onError) {
	apiFetch(API_URL + '/posts/' + id, {
		method: "POST",
		body: JSON.stringify({option: 'upVote'})
	})
	.then(function(res) {
		if(res.ok) {
			return res.json();
		}
		console.error('Error upvoting post with id: ' + id);
	})
	.then(onComplete)
	.catch(onError)
}

export function downvotePost(id, onComplete, onError) {
	return apiFetch(API_URL + '/posts/' + id, {
		method: "POST",
		body: JSON.stringify({option: 'downVote'})
	}).then(function(res) {
		if(res.ok) {
			return res.json();
		}
		console.error('Error deleting post with id: ' + id);
	})
	.then(onComplete)
	.catch(onError)
}
export function getCategories(onComplete, onError) {
	apiFetch(API_URL + '/categories')
	.then(function(res) {
		if(res.ok) {
			return res.json();
		}
		console.error('Error retrieving categories');
	})
	.then(onComplete)
	.catch(onError);
}

export function getComments(postId, onComplete, onError) {
	return apiFetch(API_URL + '/posts/' + postId + '/comments')
	.then(function(res) {
		if(res.ok) {
			return res.json();
		}
		console.error('Error retrieving comments');
	})
	.then(onComplete)
	.catch(onError);
}

export function deleteComment(id, onComplete, onError) {
	apiFetch(API_URL + '/comments/' + id, {
		method: 'delete'
	})
	.then(function(res) {
		if(res.ok) {
			return res.json();
		}

		console.error("Error with request: Deleting comment " + id)
	})
	.then(onComplete)
	.catch(onError)
}
export function addComment(comment, onComplete, onError) {

	// id is default so set a default value if one is not set
	if( typeof comment.id === 'undefined' || comment.id === '' ) {
		comment.id = uuid();
	}

	apiFetch(API_URL + '/comments', {
		method: 'post',
		body: JSON.stringify(comment)
	})
	.then(function(res) {
		if(res.ok) {
			return res.json();
		}

		console.error("Error adding a comment");
	})
	.then(onComplete)
	.catch(onError)
}

export function updateComment(data, onComplete, onError) {
	apiFetch(API_URL + '/comments/' + data.id, {
		method: 'PUT',
		body: JSON.stringify(data)
	} )
	.then(function(res) {
		if(res.ok) {
			return res.json()
		}

		console.error("Error with server when updating comment")
	})
	.then(onComplete)
	.catch(onError)
}
export function upvoteComment(id, onComplete, onError) {
	apiFetch(API_URL + '/comments/' + id, {
		method: "POST",
		body: JSON.stringify({option: 'upVote'})
	})
	.then(function(res) {
		if(res.ok) {
			return res.json();
		}
		console.error('Error upvoting comment with id: ' + id);
	})
	.then(onComplete)
	.catch(onError)
}

export function downvoteComment(id, onComplete, onError) {
	return apiFetch(API_URL + '/comments/' + id, {
		method: "POST",
		body: JSON.stringify({option: 'downVote'})
	}).then(function(res) {
		if(res.ok) {
			return res.json();
		}
		console.error('Error downvoting comment with id: ' + id);
	})
	.then(onComplete)
	.catch(onError)
}