import fetch from 'isomorphic-fetch';
import constants from '../constants';

import cookie from 'react-cookie';


export const REQUEST_LOGIN = 'REQUEST_LOGIN';
export const RECEIVE_LOGIN_SUCCESS = 'RECEIVE_LOGIN_SUCCESS';
export const RECEIVE_LOGIN_ERROR = 'RECEIVE_LOGIN_ERROR';

function requestLogin(){
	return {
		type:REQUEST_LOGIN,
	}
}
function receiveLoginSuccess(result, callback){
	return {
		type:RECEIVE_LOGIN_SUCCESS,
		result,
		callback,
	}
}
function receiveLoginError(error){
	return {
		type:RECEIVE_LOGIN_ERROR,
		error,
	}
}
export function login(member, callback){
	delete member.canSubmit;
	return dispatch => {
		dispatch(requestLogin());
		fetch(`${constants.API_URL}/login`, {
			method:'POST',
			headers:constants.HEADERS,
			mode:'cors',
			cache:'default',
			body:JSON.stringify(member)
		})
		.then((response) => response.json())
		.then((response) => {
			if(response.error) dispatch(receiveLoginError(response))
			else dispatch(receiveLoginSuccess(response, callback));
		})
		.catch(error => dispatch(receiveLoginError(error)));
	}
}

export const LOAD_TOKEN = 'LOAD_TOKEN';


function token(token, email, username, _id){
	return {
		type:LOAD_TOKEN,
		token,
		email,
		username, 
		_id
	}
}

export function loadToken(){
	return dispatch => {
		let _token = cookie.load('token');
		let email = cookie.load('email');
		let username = cookie.load('username');
		let _id = cookie.load('_id');
		dispatch(token(_token, email, username, _id));
	}
}


export const REMOVE_AUTH = 'REMOVE_AUTH';


function removeAuth(){
	return {
		type:REMOVE_AUTH,
	}
}

export function remove(){
	return dispatch => {
		let _token = cookie.remove('token');
		dispatch(removeAuth());
	}
}


export const LOGOUT = 'LOGOUT';


function _logout(){
	return {
		type:LOGOUT,
	}
}

export function logout(){
	return dispatch => {
		cookie.remove('token');
		cookie.remove('email');
		dispatch(_logout());
	}
}