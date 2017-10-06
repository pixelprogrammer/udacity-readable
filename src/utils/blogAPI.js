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

export function getPosts() {
	return apiFetch(API_URL + '/posts');
}

export function addPost(data) {
	console.log("adding post");
	return apiFetch('http://localhost:3001/posts', {
		method: 'POST',
		body: JSON.stringify(data)
	})
}

export function deletePost(id) {
	console.log('deleting post');
}

export function updatePost(data) {
	console.log('updating post');
}

export function getCategories() {
	return apiFetch(API_URL + '/categories');
}