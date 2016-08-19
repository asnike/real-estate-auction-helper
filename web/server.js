import express from 'express';
import session from 'express-session';

import cookieParser from 'cookie-parser';

import React from 'react';
import { renderToString } from 'react-dom/server';
import bodyParser from 'body-parser';

import ReportItem from './app/models/ReportItem';
import EarningRateSheet from './app/models/EarningRateSheet';
import Member from './app/models/Member';
import mongoose from 'mongoose';

const db = mongoose.connection;
db.on('error', console.error);
db.once('open', ()=>{
	console.log('Connected to mongodb server');
});
//mongoose.connect('mongodb://admin:Gch8feCFXPQj@test.testurl1.net:27017');
//mongoose.connect('mongodb://auctionAdmin:test5825@test.testurl1.net/auction');
//mongoose.connect('mongodb://auction:10904a@ec2-52-78-94-134.ap-northeast-2.compute.amazonaws.com/auction');

mongoose.connect('mongodb://auction:10904a@104.238.181.94:27017/auction');

import AuctionVisitReportApp from './app/components/AuctionVisitReportApp';

import fetch from 'isomorphic-fetch';
import { match, RouterContext } from 'react-router'


import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';

import { Provider } from 'react-redux';
import configureStore from './app/stores/configureStore';

if(process.env.NODE_ENV == 'development') {
    console.log('Server is running on development mode');
 
    const config = require('./webpack.dev.config');
    let compiler = webpack(config);
    let devServer = new WebpackDevServer(compiler, config.devServer);
    devServer.listen(3001, () => {
        console.log('webpack-dev-server is listening on port', 3001);
    });
}

import routes from './app/routes';
import passport from 'passport';
import auth from './auth';
import constants from './app/constants';



var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({usernameField:'email', passwordField:'password'}, function(email, password, done){
	Member.findOne({email}, (error, member) => {
		if(error) return done(error);	
		if(!member) return done(null, false, constants.LOGIN_RESULT.NO_MEMBER);
		if(!member.verifyPasswordSync(password)) return done(null, false, constants.LOGIN_RESULT.DIFFERENT_PASSWORD);
		
		return done(null, member);
	})
}));
passport.serializeUser((member, done) => {
	console.log('serialize :: ', member.email);
	done(null, member.email);
});

passport.deserializeUser((id, done) => {
	Member.findById(id, function (error, member) {
		if (error) { return done(error); }
		
		console.log('deserialize :: ', member.email);
		done(null, member);
	});
});


const app = express();
app.set('views', './');
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({
	secret:'keyboard cat',
	resave:false,
	saveUninitialized: false,
}));


app.use(passport.initialize());
app.use(passport.session());


//app.use('/api/member/', auth.checkAuthenticate);
app.use('/api/reportitems', auth.checkAuthenticate);
app.use('/api/reportitem', auth.checkAuthenticate);
app.use('/api/earning_rate', auth.checkAuthenticate);
app.use('/api/earning', auth.checkAuthenticate);

const factory = React.createFactory(AuctionVisitReportApp);

app.post('/api/login', 
	(request, response, next) => {
		console.log('login');
		passport.authenticate('local', (error, member, info) => { 
			console.log('username :: ', member.username);
			if(member){
				response.json({result:1, token:auth.signToken(member), email:member.email, username:member.username, _id:member._id});	
			}else{
				response.json({result:0, error:{serverMsg:info}});
			}
		})(request, response, next);
	}
);

app.get('/api/member', (request, response, next) => {
	response.json({member:response.member});
});

app.post('/api/member', (request, response, next) => {
	var member = new Member();
	member.email = request.body.email;
	member.username = request.body.username;
	member.password = request.body.password;
	
	member.save((error) => {
		if(error){
			if(error.name === 'MongoError' && error.code === 11000){
				return next(response.json({error, serverMsg:'Already exist an Email'}));
			}
			return next(error);
		}
		response.json({result:1});
	})
});

app.post('/api/earning_rate', (request, response) => {
	var earningSheet = new EarningRateSheet();
	console.log('body :: ', request.body);
	earningSheet.bid = request.body.bid;
	earningSheet.realestatemove = request.body.realestatemove;
	earningSheet.repair = request.body.repair;
	earningSheet.acquisitiontax = request.body.acquisitiontax;
	earningSheet.judicialfee = request.body.judicialfee;
	earningSheet.etc = request.body.etc;
	earningSheet.loanrate = request.body.loanrate;
	earningSheet.loaninterestrate = request.body.loaninterestrate;
	earningSheet.securitydeposit = request.body.securitydeposit;
	earningSheet.monthlyrent = request.body.monthlyrent;
	earningSheet.earningrate = request.body.earningrate;
	earningSheet._report = request.body.report_id;

	
	earningSheet.save((error)=>{
		if(error){
			console.error(error);
			response.json({result:0});
			return;
		}
		ReportItem.findById(request.body.report_id, (error, report) => {
			report.earningratelist.push(earningSheet._id);
			report.save((error)=>{
				if(error){
					console.error(error);
					response.json({result:0});
					return;
				}
				response.json({result:1});
			})
		});
	})
});
app.put('/api/earning/:earningratesheet_id', (request, response) => {
	EarningRateSheet.findById(request.params.earningratesheet_id, (error, earningSheet) => {
		earningSheet.bid = request.body.bid;
		earningSheet.realestatemove = request.body.realestatemove;
		earningSheet.repair = request.body.repair;
		earningSheet.acquisitiontax = request.body.acquisitiontax;
		earningSheet.judicialfee = request.body.judicialfee;
		earningSheet.etc = request.body.etc;
		earningSheet.loanrate = request.body.loanrate;
		earningSheet.loaninterestrate = request.body.loaninterestrate;
		earningSheet.securitydeposit = request.body.securitydeposit;
		earningSheet.monthlyrent = request.body.monthlyrent;
		earningSheet.earningrate = request.body.earningrate;
		earningSheet._report = request.body.report_id;

		earningSheet.save((error)=>{
			if(error){
				console.error(error);
				response.json({result:0});
				return;
			}
			response.json({result:1});
		})
	})
});
app.get('/api/earning/:earningratesheet_id', (request, response) => {
	EarningRateSheet.findOne({_id:request.params.earningratesheet_id}, (error, items) => {
		if(error) return response.status(500).send({error:'database failure'});
		response.json(items);
	})
});
app.delete('/api/earning/:earningratesheet_id', (request, response) => {
	EarningRateSheet.findOneAndRemove({_id:request.params.earningratesheet_id}, (error, sheet)=>{
		if(error){
			console.error(error);
			response.json({result:0});
			return;
		}
		console.log('reportid :: ', sheet, ' / ', sheet._report);
		ReportItem.update({_id:sheet._report}, {$pull:{earningratelist:request.params.earningratesheet_id}}, (error, report) => {
			if(error) return response.status(500).send({error:'database failure'});
			response.json({result:1});
		})
	})
});

app.post('/api/reportitem', (request, response) => {
	var item = new ReportItem();
	console.log('body :: ', request.body);
	item.title = request.body.title;
	item.addr = request.body.addr;
	item.size = request.body.size;
	item.builddate = request.body.builddate;
	item.floor = request.body.floor;
	item.appearance = request.body.appearance;
	item.interior = request.body.interior;
	item.mail = request.body.mail;
	item.mainfee = request.body.mainfee;
	item.electricgaswater = request.body.electricgaswater;
	item.direction = request.body.direction;
	item.garage = request.body.garage;
	item.lightview = request.body.lightview;
	item.possessor = request.body.possessor;
	item.slopeangle = request.body.slopeangle;
	item.subway = request.body.subway;
	item.busstop = request.body.busstop;
	item.convenience = request.body.convenience;
	item.downtowndistance = request.body.downtowndistance;
	item.schooldistrict = request.body.schooldistrict;
	item.car = request.body.car;
	item.harmfularea = request.body.harmfularea;
	item.developplan = request.body.developplan;
	item.marketprice0 = request.body.marketprice0;
	item.marketprice1 = request.body.marketprice1;
	item.sellprice = request.body.sellprice;
	item.bidprice = request.body.bidprice;
	item.rentalprice = request.body.rentalprice
	item.demandnsupply = request.body.demandnsupply
	item.earningrate = request.body.earningrate;
	item.note = request.body.note;
	item._member = response.member._id;
	
	console.log('after middleware member :: ', response.member._id);

	item.save((error)=>{
		if(error){
			console.error(error);
			response.json({result:0});
			return;
		}
		response.json({result:1});
	})
});

app.get('/api/reportitem/:report_id', (request, response) => {
	ReportItem.findOne({_id:request.params.report_id}, (error, items) => {
		if(error) return response.status(500).send({error:'database failure'});
		response.json(items);
	})
});
app.delete('/api/reportitem/:report_id', (request, response) => {
	ReportItem.remove({_id:request.params.report_id}, (error, output)=>{
		if(error){
			console.error(error);
			response.json({result:0});
			return;
		}
		response.json({result:1});
	})
});
app.put('/api/reportitem/:report_id/rating', (request, response) => {
	console.log('params :: ', request.params);
	ReportItem.findById(request.params.report_id, (error, report) => {
		report.rating = request.body.rating;
		report.save((error)=>{
			if(error){
				console.error(error);
				response.json({result:0});
				return;
			}
			response.json({result:1});
		})
	});
});
app.put('/api/reportitem/:report_id', (request, response) => {
	ReportItem.findById(request.params.report_id, (error, report) => {
		console.log('body :: ', request.body);
		report.title = request.body.title;
		report.addr = request.body.addr;
		report.size = request.body.size;
		report.builddate = request.body.builddate;
		report.floor = request.body.floor;
		report.appearance = request.body.appearance;
		report.interior = request.body.interior;
		report.mail = request.body.mail;
		report.mainfee = request.body.mainfee;
		report.electricgaswater = request.body.electricgaswater;
		report.direction = request.body.direction;
		report.garage = request.body.garage;
		report.lightview = request.body.lightview;
		report.possessor = request.body.possessor;
		report.slopeangle = request.body.slopeangle;
		report.subway = request.body.subway;
		report.busstop = request.body.busstop;
		report.convenience = request.body.convenience;
		report.downtowndistance = request.body.downtowndistance;
		report.schooldistrict = request.body.schooldistrict;
		report.car = request.body.car;
		report.harmfularea = request.body.harmfularea;
		report.developplan = request.body.developplan;
		report.marketprice0 = request.body.marketprice0;
		report.marketprice1 = request.body.marketprice1;
		report.sellprice = request.body.sellprice;
		report.bidprice = request.body.bidprice;
		report.rentalprice = request.body.rentalprice
		report.demandnsupply = request.body.demandnsupply
		report.earningrate = request.body.earningrate;
		report.note = request.body.note;

		report.save((error)=>{
			if(error){
				console.error(error);
				response.json({result:0});
				return;
			}
			response.json({result:1});
		})
	})
});
app.get('/api/reportitems', (request, response) => {
	
	ReportItem.find().and([{_member:response.member._id},{title:new RegExp(request.query.search, 'i')}]).populate('earningratelist').exec((error, items) => {
		if(error) return response.status(500).send({error:'database failure'});
		response.json(items);
	});
});

app.get('*', (request, response) => {
	let store = configureStore();
	let renderRoute = (response, renderProps) => {
		let handleCreateElement = (Component, props) =>(
			<Component {...props} />
		);
		response.render('index', {
			content:renderToString(
				<Provider store={store}>
					<RouterContext createElement={handleCreateElement} {...renderProps} />
				</Provider>
			)
		});
	}
	
	
	match({routes, location:request.url}, (error, redirectLocation, renderProps) => {
    if(error){
		response.status(500).send(error.message)
    }else if(redirectLocation) {
    	response.redirect(302, redirectLocation.pathname + redirectLocation.search)
    }else if(renderProps){
    	console.log('url : ', request.url);
		renderRoute(response, renderProps);
    }else{
		response.status(404).send(request.url)
    }
  })
});






app.listen(3000, ()=>{
	console.log('Express app listening on port 3000');
});

