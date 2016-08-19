import React, { Component, PropTypes } from 'react';
import EarningRateSheetForm from './EarningRateSheetForm';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as EarningActions from '../actions/earning';

class NewEarningRate extends EarningRateSheetForm{
	componentWillMount(){
		this.setState({
			_id:Date.now(),
			report_id:this.props.params.report_id,
			bid:100000000,
			realestatemove:1000000,
			repair:1000000,
			acquisitiontax:1000000,
			judicialfee:300000,
			etc:100000,
			
			loanrate:70,
			loaninterestrate:3.5,
			securitydeposit:10000000,
			monthlyrent:300000,
			
		});
		
		
	}
	handleChange(field, value){
		this.setState({[field]:value});
	}
	handleSubmit(e){
		e.preventDefault();
		this.props.addEarningRateSheet(this.state);
	}
	handleClose(e){
		this.props.history.pushState(null, '/');
	}
	render(){
		return(
			<EarningRateSheetForm draft={this.state} 
				formTitle="수익률 시트 등록"
				buttonLabel="전송" 
				handleChange={this.handleChange.bind(this)} 
				handleSubmit={this.handleSubmit.bind(this)} 
				handleClose={this.handleClose.bind(this)} 
			/>
		)
	}
}
function mapDispatchToProps(dispatch){
	return bindActionCreators(EarningActions, dispatch);
}

export default connect(null, mapDispatchToProps)(NewEarningRate);