import fetch from 'isomorphic-fetch';
import constants from '../constants';

import cookie from 'react-cookie';

export const REQUEST_ADD_EARNING_RATE = 'REQUEST_ADD_EARNING_RATE';
export const RECEIVE_ADD_EARNING_RATE_SUCCESS = 'RECEIVE_ADD_EARNING_RATE_SUCCESS';
export const RECEIVE_ADD_EARNING_RATE_ERROR = 'RECEIVE_ADD_EARNING_RATE_ERROR';

function requestEarningRate(){
	return {
		type:REQUEST_ADD_EARNING_RATE,
	}
}
function requestEarningRateSuccess(response){
	return {
		type:RECEIVE_ADD_EARNING_RATE_SUCCESS,
		report:response,
	}
}
function requestEarningRateError(id){
	return {
		type:RECEIVE_ADD_EARNING_RATE_ERROR,
		id,
	}
}

export function addEarningRateSheet(sheet){
	return dispatch => {
		let id = sheet._id;
		dispatch(requestEarningRate());
		sheet._id = null;
		fetch(`${constants.API_URL}/earning_rate`, {
			method:'POST',
			headers:Object.assign({}, constants.HEADERS, {
				authorization:cookie.load('token')	
			}),
			mode:'cors',
			cache:'default',
			body:JSON.stringify(sheet)
		})
		.then((response) => response.json())
		.then((response) =>{ 
			if(response.error) dispatch(requestEarningRateError(id));
			else dispatch(requestEarningRateSuccess(response));
		})
		.catch(error => dispatch(requestEarningRateError(id)));
	}
}

export const REQUEST_EARNINGRATESHEET = 'REQUEST_EARNINGRATESHEET';
export const RECEIVE_EARNINGRATESHEET_SUCCESS = 'RECEIVE_EARNINGRATESHEET_SUCCESS';
export const RECEIVE_EARNINGRATESHEET_ERROR = 'RECEIVE_EARNINGRATESHEET_ERROR';

function requestEarningRateSheet(){
	return {
		type:REQUEST_EARNINGRATESHEET,
	}
}
function requestReportSuccess(response){
	return {
		type:RECEIVE_EARNINGRATESHEET_SUCCESS,
		sheet:response,
	}
}
function requestReportError(id){
	return {
		type:RECEIVE_EARNINGRATESHEET_ERROR,
		id,
	}
}
export function getEarningRateSheet(_id){
	return dispatch => {
		dispatch(requestEarningRateSheet());
		fetch(`${constants.API_URL}/earning/${_id}`,{
			method:'GET',
			headers:Object.assign({}, constants.HEADERS, {
				authorization:cookie.load('token')	
			}),	
		})
		.then((response) => response.json())
		.then((response) => {
			if(response.error) dispatch(requestReportError(_id));
			else dispatch(requestReportSuccess(response));
		})
		.catch(error => dispatch(requestReportError(_id)));
	}
}

export const REQUEST_EDIT_EARNINGRATESHEET = 'REQUEST_EDIT_EARNINGRATESHEET';
export const RECEIVE_EDIT_EARNINGRATESHEET_SUCCESS = 'RECEIVE_EDIT_EARNINGRATESHEET_SUCCESS';
export const RECEIVE_EDIT_EARNINGRATESHEET_ERROR = 'RECEIVE_EDIT_EARNINGRATESHEET_ERROR';

function requestEditEarningRateSheet(sheet){
	return {
		type:REQUEST_EDIT_EARNINGRATESHEET,
		sheet,
	}
}
function requestEditEarningRateSheetSuccess(response){
	return {
		type:RECEIVE_EDIT_EARNINGRATESHEET_SUCCESS,
		report:response,
	}
}
function requestEditEarningRateSheetError(id){
	return {
		type:RECEIVE_EDIT_EARNINGRATESHEET_ERROR,
		id,
	}
}

export function editEarningRateSheet(sheet){
	return dispatch => {
		dispatch(requestEditEarningRateSheet(sheet));
		fetch(`${constants.API_URL}/earning/${sheet._id}`, {
			method:'PUT',
			headers:Object.assign({}, constants.HEADERS, {
				authorization:cookie.load('token')	
			}),	
			mode:'cors',
			cache:'default',
			body:JSON.stringify(sheet)
		})
		.then((response) => response.json())
		.then((response) => {
			if(response.error) dispatch(requestEditEarningRateSheetError(sheet._id));
			else dispatch(requestEditEarningRateSheetSuccess(response));
		})
		.catch(error => dispatch(requestEditEarningRateSheetError(sheet._id)));
	}
}

export const REQUEST_DEL_EARNINGRATESHEET = 'REQUEST_DEL_EARNINGRATESHEET';
export const RECEIVE_DEL_EARNINGRATESHEET_SUCCESS = 'RECEIVE_DEL_EARNINGRATESHEET_SUCCESS';
export const RECEIVE_DEL_EARNINGRATESHEET_ERROR = 'RECEIVE_DEL_EARNINGRATESHEET_ERROR';

function requestDelEarningRateSheet(_id){
	return {
		type:REQUEST_DEL_EARNINGRATESHEET,
		_id,
	}
}
function requestDelEarningRateSheetSuccess(response){
	return {
		type:RECEIVE_DEL_EARNINGRATESHEET_SUCCESS,
		report:response,
	}
}
function requestDelEarningRateSheetError(id){
	return {
		type:RECEIVE_DEL_EARNINGRATESHEET_ERROR,
		id,
	}
}

export function delEarningRateSheet(_id){
	return dispatch => {
		dispatch(requestDelEarningRateSheet(_id));
		fetch(`${constants.API_URL}/earning/${_id}`, {
			method:'DELETE',
			headers:Object.assign({}, constants.HEADERS, {
				authorization:cookie.load('token')	
			}),			
		})
		.then((response) => response.json())
		.then((response) => {
			if(response.error) dispatch(requestDelEarningRateSheetError(_id));
			else dispatch(requestDelEarningRateSheetSuccess(response));
		})
		.catch(error => dispatch(requestDelEarningRateSheetError(_id)));
	}
}