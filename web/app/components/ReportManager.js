import React, {Component, PropTypes} from 'react';
import AuctionVisitReportItemList from './AuctionVisitReportItemList';


import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { pushState } from 'react-router';

import * as ReportActions from '../actions/report';
import * as ModalActions from '../actions/modal';
import * as AuthActions from '../actions/auth';
import Navigator from './Navigator';

import cookie from 'react-cookie';

let reload = () => {
	window.location.reload();
}
class ReportManager extends Component{
	constructor(){
		super(...arguments);
	}
	checkAuth(){
		if(!this.props.auth.isAuthenticated){
			//let redirectAfterLogin = this.props.location.pathname;
			this.props.history.pushState(null, '/login');
		}
	}
	componentWillMount(){
		this.checkAuth();	
	}
	componentDidMount(){
		this.props.actions.report.fetchReports();
	}
	componentWillReceiveProps(nextProps){
		this.checkAuth();
		if(nextProps.needReloading){
			nextProps.actions.report.fetchReports();
		}
		if(nextProps.error && (nextProps.error.error.name == 'TokenExpiredError' ||
			nextProps.error.error.name == 'JsonWebTokenError'
		)){
			this.props.actions.modal.showAlert('Please log in and retry.', ()=>{
				cookie.remove('token');
				cookie.remove('email');
				cookie.remove('username');
				cookie.remove('_id');
				this.props.history.pushState(null, '/login');
			});
		}
	}
	render(){
		let reportModal = this.props.children && React.cloneElement(this.props.children, {
			reports:this.props.reports,
		});
		return(
			<div className="report-manager">
				<Navigator  username={cookie.load('username')} />
				<AuctionVisitReportItemList items={this.props.reports} />
				{reportModal}
			</div>
		);
	}
}

function mapStateToProps(state){
	return {
		isFetch:state.reports.isFetch || state.earningRateSheet.isFetch,
		reports:state.reports.reports,
		needReloading:state.reports.needReloading || state.earningRateSheet.needReloading,
		sheet:null,
		error:state.reports.error,
		auth:state.auth,
	};
}
function mapDispatchToProps(dispatch){
	return {
		actions:{
			modal:bindActionCreators(ModalActions, dispatch),
			report:bindActionCreators(ReportActions, dispatch),
			auth:bindActionCreators(AuthActions, dispatch),
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportManager);