import fetch from 'isomorphic-fetch';
import constants from '../constants';

export const MAP_DATA_FETCH_REQUEST = 'MAP_DATA_FETCH_REQUEST';
export const MAP_DATA_FETCH_RESPONSE_SUCCESS = 'MAP_DATA_FETCH_RESPONSE_SUCCESS';
export const MAP_DATA_FETCH_RESPONSE_ERROR = 'MAP_DATA_FETCH_RESPONSE_ERROR';


function mapDataFetchRequest(){
	return {
		type:MAP_DATA_FETCH_REQUEST,		
	}
}
function mapDataFetchReponseSuccess(items){
	return {
		type:MAP_DATA_FETCH_RESPONSE_SUCCESS,
		items,
	}
}
function mapDataFetchReponseError(){
	return {
		type:MAP_DATA_FETCH_RESPONSE_ERROR,
	}
}

export function fetchMapData(){
	return dispatch => {
		dispatch(mapDataFetchRequest());
		fetch(`${constants.API_URL}/map`, {
			method:'GET',
			headers:constants.HEADERS,
		})
		.then((response) => response.json())
		.then((response) => {
			if(response.error) dispatch(mapDataFetchReponseError())
			else dispatch(mapDataFetchReponseSuccess(response));
		})
		.catch(error => dispatch(mapDataFetchReponseError()));
	}
}