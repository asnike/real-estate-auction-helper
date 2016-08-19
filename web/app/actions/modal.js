import fetch from 'isomorphic-fetch';
import constants from '../constants';

export const MODAL_SHOW = 'MODAL_SHOW';
export const MODAL_HIDE = 'MODAL_HIDE';


function requestShow(contents, callback, title){
	return {
		type:MODAL_SHOW,
		contents, callback, title,
	}
}
function requestHide(index){
	return {
		type:MODAL_HIDE,
		index,
	}
}

export function showAlert(contents, callback, title){
	return dispatch => {
		dispatch(requestShow(contents, callback, title));
	}
}
export function hideModal(index){
	return dispatch => {
		dispatch(requestHide(index));
	}
}