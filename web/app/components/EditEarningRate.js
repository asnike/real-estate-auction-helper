import React, { Component, PropTypes } from 'react';
import EarningRateSheetForm from './EarningRateSheetForm';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as EarningActions from '../actions/earning';

class EditEarningRate extends EarningRateSheetForm{
	componentWillMount(){
		this.setState({});
		this.props.getEarningRateSheet(this.props.params.earningratesheet_id);
	}
	componentWillReceiveProps(nextProps){
		console.log('earningrate receive props :', nextProps);
		if(nextProps.sheet){
			this.setState(nextProps.sheet);
		}
	}
	
	handleChange(field, value){
		this.setState({[field]:value});
	}
	handleSubmit(e){
		e.preventDefault();
		this.props.editEarningRateSheet(this.state);
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

function mapStateToProps(state){
	return {
		isFetch:state.earningRateSheet.isFetch,
		sheet:state.earningRateSheet.sheet,
	};
}
function mapDispatchToProps(dispatch){
	return bindActionCreators(EarningActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EditEarningRate);