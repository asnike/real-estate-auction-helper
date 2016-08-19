import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as EarningActions from '../actions/earning';

class EarningRateList extends Component{
	handleRemove(_id, e){
		if(confirm('정말 삭제하시겠습니까?')){
			this.props.delEarningRateSheet(_id);
		}
	}
	render(){
		let itemClass = (val) => ( val > 10 ? ( val > 20 ? 'list-group-item-success' : 'list-group-item-default' ) : 'list-group-item-warning');
		let earningRateList;
		
		if(this.props.earningRateList.length > 0){
			earningRateList = this.props.earningRateList.map((earningRate) => <li key={earningRate._id} className={'earning-rate-list-item list-group-item ' + itemClass(parseInt(earningRate.earningrate))}>{earningRate.earningrate.toFixed(2) +'%'}
				<div className="tools">
						<Link className="glyphicon glyphicon-pencil" to={"/my/edit_earning/"+ earningRate._id}></Link>&nbsp;&nbsp;
						<span className="glyphicon glyphicon-remove" onClick={this.handleRemove.bind(this, earningRate._id)}></span>
					</div>
			</li>);	
		}else earningRateList = <li style={{color:'red'}}>등록된 수익률이 없습니다.</li>
		return (
			<ul className="list-group">
				{earningRateList}
			</ul>
		);	
	}
}



function mapDispatchToProps(dispatch){
	return bindActionCreators(EarningActions, dispatch);
}

export default connect(null, mapDispatchToProps)(EarningRateList);