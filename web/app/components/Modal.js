import React, { Component, PropTypes } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ModalActions from '../actions/modal';

class Modal extends Component{
	constructor(){
		super(...arguments);
		this.state = this.props.data;
	}
	componentWillReceiveProps(nextProps){
		this.setState(nextProps.data);
	}
	handleClose(e){
		e.preventDefault();
		this.setState({isShowing:false});
		this.props.hideModal(this.state.index);
		if(this.state.callback) this.state.callback();
	}
	render(){
		if(this.state.isShowing){
			return(
				<div className="modal-container">
					<div className="modal-backdrop fade in"></div>
					<div className="modal fade" tabindex="-1" role="dialog">
						<div className="modal-dialog">
							<div className="modal-content">
								<div className="modal-header">
									<button type="button" className="close">
										<span aria-hidden="true" onClick={this.handleClose.bind(this)}>&times;</span>
									</button>	
									<h5 className="modal-title">{this.state.title}</h5>
								</div>
								<div className="modal-body">
									<p>{this.state.contents}</p>
								</div>
								<div className="modal-footer">
									<button type="button" className="btn btn-primary" onClick={this.handleClose.bind(this)}>확인</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			);
		}
		return <div/>;
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators(ModalActions, dispatch);
}

export default connect(null, mapDispatchToProps)(Modal);