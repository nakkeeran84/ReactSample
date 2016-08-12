import axios from 'axios'
import {FETCHED_ARTICLE} from 'actions/types'

export function fetchArticles() {
	const request = axios.get('http://localhost:8080/post.json');

	return {
		type:FETCHED_ARTICLE,
		payload: request
	};
}