import fetch from 'isomorphic-fetch';
import constants from '../constants';

export const REQUEST_SIGNUP = 'REQUEST_SIGNUP';
export const RECEIVE_SIGNUP_SUCCESS = 'RECEIVE_SIGNUP_SUCCESS';
export const RECEIVE_SIGNUP_ERROR = 'RECEIVE_SIGNUP_ERROR';

function requestSignup(){
	return {
		type:REQUEST_SIGNUP,
	}
}
function receiveSignupSuccess(result, callback){
	return {
		type:RECEIVE_SIGNUP_SUCCESS,
		result,
		callback,
	}
}
function receiveSignupError(error){
	return {
		type:RECEIVE_SIGNUP_ERROR,
		error,
	}
}
export function signup(member, callback){
	return dispatch => {
		dispatch(requestSignup());
		fetch(`${constants.API_URL}/member`, {
			method:'POST',
			headers:constants.HEADERS,
			mode:'cors',
			cache:'default',
			body:JSON.stringify(member)
		})
		.then((response) => response.json())
		.then((response) => {
			if(response.error) dispatch(receiveSignupError(response))
			else dispatch(receiveSignupSuccess(response, callback));
		})
		.catch(error => dispatch(receiveSignupError(error)));
	}
}

