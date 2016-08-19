import React, {Component, PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ModalActions from '../actions/modal';
import * as AuthActions from '../actions/auth';


import Modal from '../components/Modal';
import constants from '../constants';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import cookie from 'react-cookie';



class AuctionVisitReportApp extends Component{
	constructor(){
		super(...arguments);
	}
	componentWillMount(){
		console.log('pathname ::: ', this.props.location.pathname);
		this.props.actions.auth.loadToken();
	}
	componentDidMount(){
		console.log('app did mount!!');	
	}
	componentWillReceiveProps(nextProps){
		if(nextProps.auth.token){
			cookie.save('token', nextProps.auth.token);
			cookie.save('email', nextProps.auth.email);
			cookie.save('username', nextProps.auth.username);
			cookie.save('_id', nextProps.auth._id);
		}
	}
	handleClose(){
		
	}
	render(){ 
		let modals = this.props.modal.map((modal, modalIndex) => {
			modal.index = modalIndex;
			return <Modal data={modal} />;
		});
		return(
			<div>
				{this.props.children}
				<ReactCSSTransitionGroup transitionName="alert" transitionEnterTimeout={200} transitionLeaveTimeout={100}>
					{modals}
				</ReactCSSTransitionGroup>
			</div>
		);
	}
}

function mapStateToProps(state){
	return {
		isFetch:state.reports.isFetch || state.earningRateSheet.isFetch,
		modal:state.modal.list,
		auth:state.auth,
	};
}
function mapDispatchToProps(dispatch){
	return {
		actions:{
			modal:bindActionCreators(ModalActions, dispatch),
			auth:bindActionCreators(AuthActions, dispatch)
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AuctionVisitReportApp);