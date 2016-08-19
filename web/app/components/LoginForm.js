import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as AuthActions from '../actions/auth';

import { Form } from 'formsy-react';
import ValiInput from './ValiInput';

import cookie from 'react-cookie';

class LoginForm extends Component{
	constructor(){
		super(...arguments);
		this.state = {
				
		}
	}
	handleSubmit(data){
		this.props.login(this.state, () => (this.props.history.pushState(null, '/my')));
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
	componentWillMount(){
		if(cookie.load('token')) this.props.history.pushState(null, '/my');
	}
	render(){
		return (
			<div className="container-fluid">
				<div className="panel panel-primary login-form">
					<div className="panel-heading">
						<h3 className="panel-title">
							Login
						</h3>
					</div>
					<div className="panel-body">
						<Form onSubmit={this.handleSubmit.bind(this)} onValid={this.enableButton.bind(this)} onInvalid={this.disableButton.bind(this)}>
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
								<button type="submit" className="btn btn-default" disabled={!this.state.canSubmit}>Sign in</button>
								<Link to="/signup" className="btn btn-success pull-right">Sign up</Link>
							</div>
						</Form>
					</div>					
				</div>
			</div>
		);	
	}
}


function mapDispatchToProps(dispatch){
	return bindActionCreators(AuthActions, dispatch);
}

export default connect(null, mapDispatchToProps)(LoginForm);