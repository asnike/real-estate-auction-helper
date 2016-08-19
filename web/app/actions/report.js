import fetch from 'isomorphic-fetch';
import constants from '../constants';
//import update from 'react-addons-update';
import cookie from 'react-cookie';

export const REQUEST_REPORTS = 'REQUEST_REPORTS';
export const RECEIVE_REPORTS = 'RECEIVE_REPORTS';
export const RECEIVE_REPORTS_ERROR = 'RECEIVE_REPORTS_ERROR';

function requestReports(){
	return { 
		type:REQUEST_REPORTS,
	}
}
function receiveReports(reports){
	return {
		type:RECEIVE_REPORTS,
		reports, 
	}
}
function receiveReportsError(error){
	return {
		type:RECEIVE_REPORTS_ERROR,
		error,
	}
}

export function fetchReports(searchText){
	return dispatch => {
		dispatch(requestReports());
		let search =  searchText ? '?search=' + searchText : '';
		return fetch(`${constants.API_URL}/reportitems${search}`, {
				method:'GET',
				headers:Object.assign({}, constants.HEADERS, {
					authorization:cookie.load('token')	
				}),
				
			})
			.then((response) => response.json())
			.then((response) => {
				if(response.error) dispatch(receiveReportsError(response))
				else dispatch(receiveReports(response))
			})
			.catch(error => dispatch(receiveReportsError(error)));
	}
}



export const REQUEST_RATING = 'REQUEST_RATING';
export const RECEIVE_RATING = 'RECEIVE_RATING';
export const RECEIVE_RATING_ERROR = 'RECEIVE_RATING_ERROR';


function requestRating(_id){
	return {
		type:REQUEST_RATING,
	}
}
function receiveRating(_id, rating, result){
	return {
		type:RECEIVE_RATING,
		result,
		_id,
		rating,
	}
}
function receiveRatingError(){
	return {
		type:RECEIVE_RATING_ERROR,
	}
}

export function rateReport(_id, rating){
	return dispatch => {
		dispatch(requestRating());
		return fetch(`${constants.API_URL}/reportitem/${_id}/rating`, {
			method:'PUT',
			headers:Object.assign({}, constants.HEADERS, {
					authorization:cookie.load('token')	
				}),
			mode:'cors',
			cache:'default',
			body:JSON.stringify({rating}),
		})
		.then((response) => response.json())
		.then((response) => {
			if(response.error) dispatch(receiveRatingError());
			else dispatch(receiveRating(_id, rating, response));
		})
		.catch(error => dispatch(receiveRatingError()));
	}
}

export const REQUEST_ADD = 'REQUEST_ADD';
export const RECEIVE_ADD_SUCCESS = 'RECEIVE_ADD_SUCCESS';
export const RECEIVE_ADD_ERROR = 'RECEIVE_ADD_ERROR';

function requestAdd(report){
	return {
		type:REQUEST_ADD,
		report,
	}
}
function requestAddSuccess(response){ 
	return {
		type:RECEIVE_ADD_SUCCESS,
		report:response,
	}
}
function requestAddError(id){
	return {
		type:RECEIVE_ADD_ERROR,
		id,
	}
}

export function addReport(report){
	return dispatch => {
		let id = report._id;
		dispatch(requestAdd(report));
		report._id = null;
		fetch(`${constants.API_URL}/reportitem`, {
			method:'POST',
			headers:Object.assign({}, constants.HEADERS, {
				authorization:cookie.load('token')	
			}),
			mode:'cors',
			cache:'default',
			body:JSON.stringify(report)
		})
		.then((response) => response.json())
		.then((response) => {
			if(response.error) dispatch(requestAddError(id));
			else dispatch(requestAddSuccess(response));
		})
		.catch(error => dispatch(requestAddError(id)));
	}
}

export const REQUEST_DEL = 'REQUEST_DEL';
export const RECEIVE_DEL_SUCCESS = 'RECEIVE_DEL_SUCCESS';
export const RECEIVE_DEL_ERROR = 'RECEIVE_DEL_ERROR';

function requestDel(report){
	return {
		type:REQUEST_DEL,
		report,
	}
}
function requestDelSuccess(response){
	return {
		type:RECEIVE_DEL_SUCCESS,
		report:response,
	}
}
function requestDelError(id){
	return {
		type:RECEIVE_DEL_ERROR,
		id,
	}
}

export function delReport(_id){
	return dispatch => {
		dispatch(requestDel(_id));
		fetch(`${constants.API_URL}/reportitem/${_id}`, {
			method:'DELETE',
			headers:Object.assign({}, constants.HEADERS, {
				authorization:cookie.load('token')	
			}),
			mode:'cors',
			cache:'default',	
		})
		.then((response) => response.json())
		.then((response) => {
			if(response.error) dispatch(requestDelError(id));
			else dispatch(requestDelSuccess(response));
		})
		.catch(error => dispatch(requestDelError(id)));
	}
}

export const REQUEST_EDIT = 'REQUEST_EDIT';
export const RECEIVE_EDIT_SUCCESS = 'RECEIVE_EDIT_SUCCESS';
export const RECEIVE_EDIT_ERROR = 'RECEIVE_EDIT_ERROR';

function requestEdit(report){
	return {
		type:REQUEST_EDIT,
		report,
	}
}
function requestEditSuccess(response){
	return {
		type:RECEIVE_EDIT_SUCCESS,
		report:response,
	}
}
function requestEditError(id){
	return {
		type:RECEIVE_EDIT_ERROR,
		id,
	}
}

export function editReport(report){
	return dispatch => {
		dispatch(requestEdit(report));
		fetch(`${constants.API_URL}/reportitem/${report._id}`, {
			method:'PUT',
			headers:Object.assign({}, constants.HEADERS, {
				authorization:cookie.load('token')	
			}),
			mode:'cors',
			cache:'default',
			body:JSON.stringify(report)
		})
		.then((response) => response.json())
		.then((response) => {
			if(response.error) dispatch(requestEditError(report._id));
			else dispatch(requestEditSuccess(response));
		})
		.catch(error => dispatch(requestEditError(report._id)));
	}
}

export const REQUEST_REPORT = 'REQUEST_REPORT';
export const RECEIVE_REPORT_SUCCESS = 'RECEIVE_REPORT_SUCCESS';
export const RECEIVE_REPORT_ERROR = 'RECEIVE_REPORT_ERROR';

function requestReport(report){
	return {
		type:REQUEST_REPORT,
		report,
	}
}
function requestReportSuccess(response){
	return {
		type:RECEIVE_REPORT_SUCCESS,
		report:response,
	}
}
function requestReportError(id){
	return {
		type:RECEIVE_REPORT_ERROR,
		id,
	}
}
export function getReport(_id){
	return dispatch => {
		dispatch(requestReport());
		fetch(`${constants.API_URL}/reportitem/${_id}`)
		.then((response) => response.json())
		.then((response) => dispatch(requestReportSuccess(response)))
		.catch(error => dispatch(requestReportError(_id)));
	}
}
