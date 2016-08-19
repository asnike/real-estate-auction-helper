import React from 'react';
import { Router, Route, Link, browserHistory, IndexRedirect } from 'react-router';
import AuctionVisitReportApp from './components/AuctionVisitReportApp';
import AuctionVisitReportItemList from './components/AuctionVisitReportItemList';
import ReportManager from './components/ReportManager';
import LoginForm from './components/LoginForm';
import JoinForm from './components/JoinForm';
import NewReport from './components/NewReport';
import EditReport from './components/EditReport';
import NewEarningRate from './components/NewEarningRate';
import EditEarningRate from './components/EditEarningRate';

export default (
	<Route path="/" component={AuctionVisitReportApp}>
		<IndexRedirect to="/login" />
		<Route path="login" component={LoginForm} />
		<Route path="signup" component={JoinForm} />
		<Route path="/my" component={ReportManager}>
			<Route path="new" component={NewReport} />
			<Route path="edit/:report_id" component={EditReport} />
			
			<Route path="new_earning/:report_id" component={NewEarningRate} />
			<Route path="edit_earning/:earningratesheet_id" component={EditEarningRate} />
		</Route>
	</Route>
	
)