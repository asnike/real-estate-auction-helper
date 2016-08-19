import React, {Component, PropTypes} from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as HamburgerActions from '../actions/hamburger';
import * as AuthActions from '../actions/auth';
import * as ReportActions from '../actions/report';


class Navigator extends Component{
	constructor(){
		super(...arguments);
		this.state = {
			searchText:''	
		}
	}
	handleHamburgerMenu(){
		this.props.actions.ham.hamburgerMenuClick();
	}
	handleChange(e){
		this.setState({searchText:e.target.value});
	}
	handleSearch(){
		this.props.actions.report.fetchReports(this.state.searchText);
	}
	handleLogout(){
		if(confirm('로그아웃하시겠습니까?')){
			this.props.actions.auth.logout();
		}
	}
	componentWillReceiveProps(nextProps){
		
	}
	render(){
		return (
			<div className={'menu' + (this.props.isOpened ? '' : ' closed')}>
				<ul className="menu-items setting">
					<li className="menu-item user-info">
						<span className="user-icon"></span>
						<span className="user-name">{this.props.username}</span>
						<span className="logout-btn" onClick={this.handleLogout.bind(this)}><i className="glyphicon glyphicon-off"></i></span>
					</li>
					<li className="menu-item">
						<span className="hamburger-btn" onClick={this.handleHamburgerMenu.bind(this)}>
							<i className="glyphicon glyphicon-menu-hamburger"></i>
						</span>
						<div className="search-input">
							<input type="text" className="form-control" required={true} value={this.state.searchText} onChange={this.handleChange.bind(this)} />								
						</div>
						<span className="search-btn" onClick={this.handleSearch.bind(this)}><i className="glyphicon glyphicon-search icon"></i></span>
					</li>
				</ul>
				<ul className="menu-items category">
					<li className="menu-item">
						<span className="menu-icon">
							<i className="glyphicon glyphicon-list-alt"></i>
						</span><span className="menu-text">Total</span>
					</li>
				</ul>
			</div>
		);	
	}
}

function mapStateToProps(state){
	return {
		isOpened:state.hamburgerMenu.isOpened,
	};
}
function mapDispatchToProps(dispatch){
	return {
		actions:{
			ham:bindActionCreators(HamburgerActions, dispatch),
			auth:bindActionCreators(AuthActions, dispatch),
			report:bindActionCreators(ReportActions, dispatch)
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigator);