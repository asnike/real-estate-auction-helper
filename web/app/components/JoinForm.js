import React, {Component, PropTypes} from 'react';
import { Form } from 'formsy-react';

import ValiInput from './ValiInput';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as MemberActions from '../actions/member';

class JoinForm extends Component{
	constructor(){
		super(...arguments);
		this.state = {
			
		}
	}
	handleSubmit(data){
		console.log(data, this.state);
		
		this.props.signup(this.state, () => (this.props.history.pushState(null, '/login')));
	}
	
	enableButton(){
		this.setState({canSubmit:true});	
	}
	disableButton(){
		this.setState({canSubmit:false});	
	}
	handleChange(field, e){
		this.setState({[field]:e.target.value});
	}
	render(){
		return (
			<div className="container-fluid">
				<div className="panel panel-success join-form">
					<div className="panel-heading">
						<h3 className="panel-title">
							Sign up
						</h3>
					</div>
					<div className="panel-body">
						<Form onSubmit={this.handleSubmit.bind(this)} onValid={this.enableButton.bind(this)} onInvalid={this.disableButton.bind(this)}>
							<div className="form-group">
								<label className="control-label">Name</label>
								<input type="text" className="form-control" name="username" 
									autoFocus={true} required={true} 
									onChange={this.handleChange.bind(this, 'username')} 
								/>
							</div>
							
							<ValiInput title="Email" containerClass="form-group" name="email"
								required={true} 
								validations="isEmail" validationError="This is not a valid email"
								onChange={this.handleChange.bind(this, 'email')} 
							/>
							
							<div className="form-group">
								<label className="control-label">Password</label>
								<input type="password" className="form-control" name="password" 
									required={true} 
									onChange={this.handleChange.bind(this, 'password')} 
								/>
							</div>
							<div className="form-group">
								<button type="submit" className="btn btn-success" disabled={!this.state.canSubmit}>Sign up</button>
							</div>
						</Form>
					</div>					
				</div>
			</div>
		);	
	}
}



function mapDispatchToProps(dispatch){
	return bindActionCreators(MemberActions, dispatch);
}

export default connect(null, mapDispatchToProps)(JoinForm);