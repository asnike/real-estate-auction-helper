'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _server = require('react-dom/server');

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _ReportItem = require('./app/models/ReportItem');

var _ReportItem2 = _interopRequireDefault(_ReportItem);

var _EarningRateSheet = require('./app/models/EarningRateSheet');

var _EarningRateSheet2 = _interopRequireDefault(_EarningRateSheet);

var _Member = require('./app/models/Member');

var _Member2 = _interopRequireDefault(_Member);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _AuctionVisitReportApp = require('./app/components/AuctionVisitReportApp');

var _AuctionVisitReportApp2 = _interopRequireDefault(_AuctionVisitReportApp);

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _reactRouter = require('react-router');

var _webpackDevServer = require('webpack-dev-server');

var _webpackDevServer2 = _interopRequireDefault(_webpackDevServer);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _reactRedux = require('react-redux');

var _configureStore = require('./app/stores/configureStore');

var _configureStore2 = _interopRequireDefault(_configureStore);

var _routes = require('./app/routes');

var _routes2 = _interopRequireDefault(_routes);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _auth = require('./auth');

var _auth2 = _interopRequireDefault(_auth);

var _constants = require('./app/constants');

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var db = _mongoose2.default.connection;
db.on('error', console.error);
db.once('open', function () {
	console.log('Connected to mongodb server');
});
//mongoose.connect('mongodb://admin:Gch8feCFXPQj@test.testurl1.net:27017');
//mongoose.connect('mongodb://auctionAdmin:test5825@test.testurl1.net/auction');
//mongoose.connect('mongodb://auction:10904a@ec2-52-78-94-134.ap-northeast-2.compute.amazonaws.com/auction');

_mongoose2.default.connect('mongodb://auction:10904a@104.238.181.94:27017/auction');

if (process.env.NODE_ENV == 'development') {
	console.log('Server is running on development mode');

	var config = require('./webpack.dev.config');
	var compiler = (0, _webpack2.default)(config);
	var devServer = new _webpackDevServer2.default(compiler, config.devServer);
	devServer.listen(3001, function () {
		console.log('webpack-dev-server is listening on port', 3001);
	});
}

var LocalStrategy = require('passport-local').Strategy;

_passport2.default.use(new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, function (email, password, done) {
	_Member2.default.findOne({ email: email }, function (error, member) {
		if (error) return done(error);
		if (!member) return done(null, false, _constants2.default.LOGIN_RESULT.NO_MEMBER);
		if (!member.verifyPasswordSync(password)) return done(null, false, _constants2.default.LOGIN_RESULT.DIFFERENT_PASSWORD);

		return done(null, member);
	});
}));
_passport2.default.serializeUser(function (member, done) {
	console.log('serialize :: ', member.email);
	done(null, member.email);
});

_passport2.default.deserializeUser(function (id, done) {
	_Member2.default.findById(id, function (error, member) {
		if (error) {
			return done(error);
		}

		console.log('deserialize :: ', member.email);
		done(null, member);
	});
});

var app = (0, _express2.default)();
app.set('views', './');
app.set('view engine', 'ejs');

app.use(_express2.default.static(__dirname + '/public'));
app.use((0, _cookieParser2.default)());
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use((0, _expressSession2.default)({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: false
}));

app.use(_passport2.default.initialize());
app.use(_passport2.default.session());

//app.use('/api/member/', auth.checkAuthenticate);
app.use('/api/reportitems', _auth2.default.checkAuthenticate);
app.use('/api/reportitem', _auth2.default.checkAuthenticate);
app.use('/api/earning_rate', _auth2.default.checkAuthenticate);
app.use('/api/earning', _auth2.default.checkAuthenticate);

var factory = _react2.default.createFactory(_AuctionVisitReportApp2.default);

app.post('/api/login', function (request, response, next) {
	console.log('login');
	_passport2.default.authenticate('local', function (error, member, info) {
		console.log('username :: ', member.username);
		if (member) {
			response.json({ result: 1, token: _auth2.default.signToken(member), email: member.email, username: member.username, _id: member._id });
		} else {
			response.json({ result: 0, error: { serverMsg: info } });
		}
	})(request, response, next);
});

app.get('/api/member', function (request, response, next) {
	response.json({ member: response.member });
});

app.post('/api/member', function (request, response, next) {
	var member = new _Member2.default();
	member.email = request.body.email;
	member.username = request.body.username;
	member.password = request.body.password;

	member.save(function (error) {
		if (error) {
			if (error.name === 'MongoError' && error.code === 11000) {
				return next(response.json({ error: error, serverMsg: 'Already exist an Email' }));
			}
			return next(error);
		}
		response.json({ result: 1 });
	});
});

app.post('/api/earning_rate', function (request, response) {
	var earningSheet = new _EarningRateSheet2.default();
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

	earningSheet.save(function (error) {
		if (error) {
			console.error(error);
			response.json({ result: 0 });
			return;
		}
		_ReportItem2.default.findById(request.body.report_id, function (error, report) {
			report.earningratelist.push(earningSheet._id);
			report.save(function (error) {
				if (error) {
					console.error(error);
					response.json({ result: 0 });
					return;
				}
				response.json({ result: 1 });
			});
		});
	});
});
app.put('/api/earning/:earningratesheet_id', function (request, response) {
	_EarningRateSheet2.default.findById(request.params.earningratesheet_id, function (error, earningSheet) {
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

		earningSheet.save(function (error) {
			if (error) {
				console.error(error);
				response.json({ result: 0 });
				return;
			}
			response.json({ result: 1 });
		});
	});
});
app.get('/api/earning/:earningratesheet_id', function (request, response) {
	_EarningRateSheet2.default.findOne({ _id: request.params.earningratesheet_id }, function (error, items) {
		if (error) return response.status(500).send({ error: 'database failure' });
		response.json(items);
	});
});
app.delete('/api/earning/:earningratesheet_id', function (request, response) {
	_EarningRateSheet2.default.findOneAndRemove({ _id: request.params.earningratesheet_id }, function (error, sheet) {
		if (error) {
			console.error(error);
			response.json({ result: 0 });
			return;
		}
		console.log('reportid :: ', sheet, ' / ', sheet._report);
		_ReportItem2.default.update({ _id: sheet._report }, { $pull: { earningratelist: request.params.earningratesheet_id } }, function (error, report) {
			if (error) return response.status(500).send({ error: 'database failure' });
			response.json({ result: 1 });
		});
	});
});

app.post('/api/reportitem', function (request, response) {
	var item = new _ReportItem2.default();
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
	item.rentalprice = request.body.rentalprice;
	item.demandnsupply = request.body.demandnsupply;
	item.earningrate = request.body.earningrate;
	item.note = request.body.note;
	item._member = response.member._id;

	console.log('after middleware member :: ', response.member._id);

	item.save(function (error) {
		if (error) {
			console.error(error);
			response.json({ result: 0 });
			return;
		}
		response.json({ result: 1 });
	});
});

app.get('/api/reportitem/:report_id', function (request, response) {
	_ReportItem2.default.findOne({ _id: request.params.report_id }, function (error, items) {
		if (error) return response.status(500).send({ error: 'database failure' });
		response.json(items);
	});
});
app.delete('/api/reportitem/:report_id', function (request, response) {
	_ReportItem2.default.remove({ _id: request.params.report_id }, function (error, output) {
		if (error) {
			console.error(error);
			response.json({ result: 0 });
			return;
		}
		response.json({ result: 1 });
	});
});
app.put('/api/reportitem/:report_id/rating', function (request, response) {
	console.log('params :: ', request.params);
	_ReportItem2.default.findById(request.params.report_id, function (error, report) {
		report.rating = request.body.rating;
		report.save(function (error) {
			if (error) {
				console.error(error);
				response.json({ result: 0 });
				return;
			}
			response.json({ result: 1 });
		});
	});
});
app.put('/api/reportitem/:report_id', function (request, response) {
	_ReportItem2.default.findById(request.params.report_id, function (error, report) {
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
		report.rentalprice = request.body.rentalprice;
		report.demandnsupply = request.body.demandnsupply;
		report.earningrate = request.body.earningrate;
		report.note = request.body.note;

		report.save(function (error) {
			if (error) {
				console.error(error);
				response.json({ result: 0 });
				return;
			}
			response.json({ result: 1 });
		});
	});
});
app.get('/api/reportitems', function (request, response) {

	_ReportItem2.default.find().and([{ _member: response.member._id }, { title: new RegExp(request.query.search, 'i') }]).populate('earningratelist').exec(function (error, items) {
		if (error) return response.status(500).send({ error: 'database failure' });
		response.json(items);
	});
});

app.get('*', function (request, response) {
	var store = (0, _configureStore2.default)();
	var renderRoute = function renderRoute(response, renderProps) {
		var handleCreateElement = function handleCreateElement(Component, props) {
			return _react2.default.createElement(Component, props);
		};
		response.render('index', {
			content: (0, _server.renderToString)(_react2.default.createElement(
				_reactRedux.Provider,
				{ store: store },
				_react2.default.createElement(_reactRouter.RouterContext, _extends({ createElement: handleCreateElement }, renderProps))
			))
		});
	};

	(0, _reactRouter.match)({ routes: _routes2.default, location: request.url }, function (error, redirectLocation, renderProps) {
		if (error) {
			response.status(500).send(error.message);
		} else if (redirectLocation) {
			response.redirect(302, redirectLocation.pathname + redirectLocation.search);
		} else if (renderProps) {
			console.log('url : ', request.url);
			renderRoute(response, renderProps);
		} else {
			response.status(404).send(request.url);
		}
	});
});

app.listen(3000, function () {
	console.log('Express app listening on port 3000');
});
