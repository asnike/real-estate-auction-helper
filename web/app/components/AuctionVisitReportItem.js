import React, {Component} from 'react';
import { Link } from 'react-router';
import {Rating} from 'belle';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ReportActions from '../actions/report';
import EarningRateList from './EarningRateList';



class AuctionVisitReportItem extends Component{
	handleRemove(){
		if(confirm('정말 삭제하시겠습니까?')){
			this.props.delReport(this.props._id);
		}
	}
	hadnleEdit(){
		this.props.handleEdit(this.props._id);
	}
	handleRate(rating){
		this.props.rateReport(this.props._id, rating.value);
	}
	render(){
		let ratingOptions = {
			onSet:this.handleRate.bind(this)
		}
		return(
			<div key={this.props._id}  className="panel panel-success auction-visit-item clearfix">
				<div className="panel-heading">
					<h3 className="panel-title">
						{this.props.title}
						<div className="tools">
							<Link className="glyphicon glyphicon-pencil" to={"/my/edit/"+ this.props._id}></Link>&nbsp;&nbsp;
							<span className="glyphicon glyphicon-remove" onClick={this.handleRemove.bind(this)}></span>
						</div>
					</h3>
				</div>
				<div className="panel-body">
					<ul>
						<li>건물면적 : {this.props.size}</li>
						<li>주소 : {this.props.addr}</li>
						<li>층수 : {this.props.floor}</li>
						<li>건물 외관 상태 : {this.props.appearance}</li>
						<li>건물 내관 상태 : {this.props.interior}</li>
						<li>체납관리비 여부 : {this.props.mainfee}</li>
						<li>방향 : {this.props.direction}</li>
						<li>채광 및 조망권 : {this.props.lightview}</li>
						<li>전입세대 열람 및 점유자조사 : {this.props.possessor}</li>
						<li>지하철 노선 : {this.props.subway}</li>
					</ul>
					
					<hr style={{margin:'10px -15px'}} />
					<Rating value={this.props.rating} onUpdate={this.handleRate.bind(this)} />
					<div>작성일:{new Date(this.props.regdate).toLocaleString()}</div>
					
					<hr style={{margin:'10px -15px'}} />
					<div className="earning-rate-title"><i className="glyphicon glyphicon-usd"></i>수익률 <div className="tools"><Link className="glyphicon glyphicon-plus" to={"/my/new_earning/"+ this.props._id}></Link>&nbsp;&nbsp;</div></div>
					<EarningRateList earningRateList={this.props.earningratelist} />
				</div>
				
			</div>
		);
	}
}



function mapDispatchToProps(dispatch){
	return bindActionCreators(ReportActions, dispatch);
}

export default connect(null, mapDispatchToProps)(AuctionVisitReportItem);
