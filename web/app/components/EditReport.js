import React, { Component, PropTypes } from 'react';
import ReportForm from './ReportForm';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ReportActions from '../actions/report';

class EditReport extends ReportForm{
	setReport(reports){
		let report = reports.find((report) => report._id === this.props.params.report_id);
		this.setState(report);
	}
	componentWillMount(){
		this.setState({});
		if(this.props.reports && this.props.reports.length > 0){
			this.setReport(this.props.reports);
		}
	}
	componentWillReceiveProps(nextProps){
		console.log('ReceiveProps');
		if(nextProps.reports && nextProps.reports.length > 0){
			this.setReport(nextProps.reports);
		}
	}
	handleChange(field, value){
		this.setState({[field]:value});
	}
	handleSubmit(e){
		e.preventDefault();
		this.props.editReport(this.state);
	}
	handleClose(e){
		this.props.history.pushState(null, '/');
	}
	render(){
		return(
			<ReportForm draft={this.state} 
				formTitle="보고서 수정"
				buttonLabel="수정" 
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

export default connect(null, mapDispatchToProps)(EditReport);