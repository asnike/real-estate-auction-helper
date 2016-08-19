import React, { Component, PropTypes } from 'react';
import ReportForm from './ReportForm';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ReportActions from '../actions/report';

class NewReport extends ReportForm{
	componentWillMount(){
		console.log('new report will mount');
		this.setState({
			_id:Date.now(),
			title:'',
		})
		
	}
	handleChange(field, value){
		this.setState({[field]:value});
	}
	handleSubmit(e){
		e.preventDefault();
		this.props.addReport(this.state);
	}
	handleClose(e){
		this.props.history.pushState(null, '/');
	}
	render(){
		return(
			<ReportForm draft={this.state} 
				formTitle="보고서 등록"
				buttonLabel="전송" 
				handleChange={this.handleChange.bind(this)} 
				handleSubmit={this.handleSubmit.bind(this)} 
				handleClose={this.handleClose.bind(this)} 
			/>
		)
	}
}
function mapDispatchToProps(dispatch){
	return bindActionCreators(ReportActions, dispatch);
}

export default connect(null, mapDispatchToProps)(NewReport);