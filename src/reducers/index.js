import {FETCHED_ARTICLE} from 'actions/types'


export default function (state = [],action) {

	switch(action.type) {
		case FETCHED_ARTICLE:
			return action.payload.data;
		default:
			return state;
	}
	return state;
}