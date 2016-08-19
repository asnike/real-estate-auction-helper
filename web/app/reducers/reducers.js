import {combineReducers} from 'redux';
import { 
	REQUEST_REPORTS, 
	RECEIVE_REPORTS,
	RECEIVE_REPORTS_ERROR,
	REQUEST_RATING,
	RECEIVE_RATING,
	RECEIVE_RATING_ERROR,
	REQUEST_ADD,
	RECEIVE_ADD_SUCCESS,
	RECEIVE_ADD_ERROR,
	REQUEST_EDIT,
	RECEIVE_EDIT_SUCCESS,
	RECEIVE_EDIT_ERROR,
	REQUEST_DEL,
	RECEIVE_DEL_SUCCESS,
	RECEIVE_DEL_ERROR,
	REQUEST_REPORT,
	RECEIVE_REPORT_SUCCESS,
	RECEIVE_REPORT_ERROR,
 } from '../actions/report';
 
 import { 
	REQUEST_ADD_EARNING_RATE,
	RECEIVE_ADD_EARNING_RATE_SUCCESS,
	RECEIVE_ADD_EARNING_RATE_ERROR,
	
	REQUEST_EARNINGRATESHEET,
	RECEIVE_EARNINGRATESHEET_SUCCESS,
	RECEIVE_EARNINGRATESHEET_ERROR,
	
	REQUEST_EDIT_EARNINGRATESHEET,
	RECEIVE_EDIT_EARNINGRATESHEET_SUCCESS,
	RECEIVE_EDIT_EARNINGRATESHEET_ERROR,
	
	REQUEST_DEL_EARNINGRATESHEET,
	RECEIVE_DEL_EARNINGRATESHEET_SUCCESS,
	RECEIVE_DEL_EARNINGRATESHEET_ERROR,
	
 } from '../actions/earning';
 
  import { 
	HAMBURGER_MENU_CLICK,
	
 } from '../actions/hamburger';
 
 import {
	REQUEST_SIGNUP,
	RECEIVE_SIGNUP_SUCCESS,
	RECEIVE_SIGNUP_ERROR,
 } from '../actions/member';
 
 import {
	MODAL_SHOW,
	MODAL_HIDE,
	
 } from '../actions/modal';
 
  import {
	REQUEST_LOGIN,
	RECEIVE_LOGIN_SUCCESS,
	RECEIVE_LOGIN_ERROR,
	
	REQUEST_PUBLICKEY,
	RECEIVE_PUBLICKEY_SUCCESS,
	RECEIVE_PUBLICKEY_ERROR,
	
	LOAD_TOKEN,
	REMOVE_AUTH,
	LOGOUT,
 } from '../actions/auth';

import update from 'react-addons-update';
import {browserHistory} from 'react-router';

function reports(state={needReloading:false, isFetching:false, reports:[], report:null, result:0, reportId:null, error:null}, action){
	switch(action.type){
	case REQUEST_REPORTS:
		return Object.assign({}, state, {
			isFetching:true,
		});
	case RECEIVE_REPORTS:
		return Object.assign({}, state, {
			error:null,
			isFetching:false,
			needReloading:false,
			reports:action.reports,
		});
	case RECEIVE_REPORTS_ERROR:
		return Object.assign({}, state, {
			isFetching:false,
			error:action.error,
		});
	case REQUEST_REPORT:
		return Object.assign({}, state, {
			isFetching:true,
		});
	case RECEIVE_REPORT_SUCCESS:
		return Object.assign({}, state, {
			isFetching:false,
			report:action.report,
		});
	case RECEIVE_ADD_ERROR:
		return Object.assign({}, state, {
			isFetching:false,
		});
	
	case REQUEST_RATING:
		return Object.assign({}, state, {
			reportId:action._id,
		});
	case RECEIVE_RATING:
		console.log('rating state : ', state);
		var idx = state.reports.findIndex((report) => report._id == action._id);
		return Object.assign({}, state, {
			result:1,
			reportId:action._id,
			reports:update(state.reports, {[idx]:{rating:{$set:action.rating}}})
		});
	case REQUEST_ADD:
		return Object.assign({}, state, {
			isFetching:true,
		});
	case RECEIVE_ADD_SUCCESS:
		browserHistory.pushState(null, '/my');
		return Object.assign({}, state, {
			result:1,
			isFetching:false,
			needReloading:true,
		});	
	case REQUEST_EDIT:
		return Object.assign({}, state, {
			isFetching:true,
		});
	case RECEIVE_EDIT_SUCCESS:
		browserHistory.pushState(null, '/my');
		return Object.assign({}, state, {
			result:1,
			isFetching:false,
			needReloading:true,
		});	
	case REQUEST_DEL:
		return Object.assign({}, state, {
			isFetching:true,
		});
	case RECEIVE_DEL_SUCCESS:
		var idx = state.reports.findIndex((report) => report._id == action._id);
		return Object.assign({}, state, {
			result:1,
			isFetching:false,
			reports:update(state.reports, {$splice:[[idx, 1]]}),
		});
	default :
		return state;
	}	
}

function earningRateSheet(state={needReloading:false, isFetching:false, result:0, sheet:null}, action){
	switch(action.type){
	case RECEIVE_REPORTS:
		return Object.assign({}, state, {
			needReloading:false,
		});
	case REQUEST_ADD_EARNING_RATE:
		return Object.assign({}, state, {
			isFetching:true,
		});
	case RECEIVE_ADD_EARNING_RATE_SUCCESS:
		browserHistory.pushState(null, '/my');
		return Object.assign({}, state, {
			result:1,
			isFetching:false,
			needReloading:true,
		});	
	case RECEIVE_ADD_EARNING_RATE_ERROR:
		return Object.assign({}, state, {
			isFetching:false,
		});
	case REQUEST_EARNINGRATESHEET:
		return Object.assign({}, state, {
			isFetching:true,
		});
	case RECEIVE_EARNINGRATESHEET_SUCCESS:
		return Object.assign({}, state, {
			isFetching:false,
			sheet:action.sheet,
		});
	case REQUEST_EDIT_EARNINGRATESHEET:
		return Object.assign({}, state, {
			isFetching:true,
		});
	case RECEIVE_EDIT_EARNINGRATESHEET_SUCCESS:
		browserHistory.pushState(null, '/my');
		return Object.assign({}, state, {
			result:1,
			isFetching:false,
			needReloading:true,
		});	
	case REQUEST_DEL_EARNINGRATESHEET:
		return Object.assign({}, state, {
			isFetching:true,
		});
	case RECEIVE_DEL_EARNINGRATESHEET_SUCCESS:
		return Object.assign({}, state, {
			result:1,
			isFetching:false,
			needReloading:true,
		});
	default :
		return state;	
	}
}

function hamburgerMenu(state={isOpened:true}, action){
	switch(action.type){
	case HAMBURGER_MENU_CLICK:
		return Object.assign({}, state, {
			isOpened:!state.isOpened,
		});
	default :
		return state;	
	}
}

function member(state={isFetching:false, result:0, member:null}, action){
	switch(action.type){
	case REQUEST_SIGNUP:
		return Object.assign({}, state, {
			isFetching:true,
		});
	case RECEIVE_SIGNUP_SUCCESS:
		return Object.assign({}, state, {
			isFetching:false,
			result:1,
		});
	case RECEIVE_SIGNUP_ERROR:
		return Object.assign({}, state, {
			isFetching:false,
			error:action.error,
			result:0,
		});
	default :
		return state;	
	}
}
function modal(state={list:[]}, action){
	switch(action.type){
	case RECEIVE_SIGNUP_SUCCESS:
		return Object.assign({}, state, {
			list:update(state.list, {$push:[{isShowing:true, contents:'가입됐습니다.', callback:action.callback}]})
		});
	case RECEIVE_SIGNUP_ERROR:
		return Object.assign({}, state, {
			list:update(state.list, {$push:[{isShowing:true, contents:action.error.serverMsg}]})
		});
	case RECEIVE_LOGIN_SUCCESS:
		return Object.assign({}, state, {
			list:update(state.list, {$push:[{isShowing:true, contents:'로그인 성공습니다.', callback:action.callback}]})
		});
	case MODAL_SHOW:
		return Object.assign({}, state, {
			list:update(state.list, {$push:[{isShowing:true, contents:action.contents, callback:action.callback}]})
		});
	case MODAL_HIDE:
		return Object.assign({}, state, {
			list:update(state.list, {$splice:[[action.index, 1]]})
		});
		
	default :
		return state;	
	}
}

function auth(state={token:null, isAuthenticated:false, statusTetx:null}, action){
	switch(action.type){
	case REQUEST_LOGIN:
		return Object.assign({}, state, {
			statusTetx:'login pregress....'
		});
	case LOGOUT:
		browserHistory.pushState(null, '/login');
		return Object.assign({}, state, {
			isAuthenticated:false,
			email:null,
			token:null,
			username:null,
			_id:null,
		});
	case RECEIVE_LOGIN_SUCCESS:
		return Object.assign({}, state, {
			email:action.result.email,
			token:action.result.token,
			username:action.result.username,
			_id:action.result._id,
			isAuthenticated:true,
			statusTetx:'login success!'
		});
	case RECEIVE_LOGIN_ERROR:
		return Object.assign({}, state, {
			statusTetx:'login failure.'
		});
	case RECEIVE_PUBLICKEY_SUCCESS:
		return Object.assign({}, state, {
			publicKey:action.result.publicKey
		});
	case LOAD_TOKEN:
		return Object.assign({}, state, {
			token:action.token,
			email:action.email,
			username:action.username,
			_id:action._id,
			isAuthenticated:true,
		});
	case REMOVE_AUTH:
		return Object.assign({}, state, {
			isAuthenticated:false,
		});
	case RECEIVE_REPORTS_ERROR:
		return Object.assign({}, state, {
			isAuthenticated:false,
			token:null,
		});
	

	default :
		return state;	
	}
}

const rootReducer = combineReducers({
	reports,
	earningRateSheet,
	hamburgerMenu,
	member,
	modal,
	auth,
})

export default rootReducer;