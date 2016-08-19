import React, {Component} from 'react';
import AuctionVisitReportItem from './AuctionVisitReportItem';
import {Link} from 'react-router';



class AuctionVisitReportItemList extends Component{
	
	render(){
		let items = this.props.items.map((item) => (
			<AuctionVisitReportItem key={Date.now()+Math.random()*1000} {...item} />
		));
		
		console.log('render!!!');
		return(
			<div className="scroll-container">
				
				<Link to="/my/new" className="float-button">+</Link>
				<div className="auction-visit-itemlist">
					{items}
				</div>
				
			</div>
		);
	}
}

export default AuctionVisitReportItemList;