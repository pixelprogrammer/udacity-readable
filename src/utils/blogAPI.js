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
	console.log("adding post");
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

export function deletePost(id, onComplete, onError) {
	console.log('deleting post');
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

export function updatePost(data) {
	console.log('updating post');
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