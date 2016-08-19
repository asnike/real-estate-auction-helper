import jwt from 'jsonwebtoken';
import constants from './app/constants';


function signToken(member){
	return jwt.sign({_id:member._id, username:member.username, email:member.email}, constants.SECRET_KEY, {expiresIn:constants.KEY_EXPIRE_IN});
}
function isAuthenticated(token){
	return jwt.verify(token.replace('Bearer ', ''), constants.SECRET_KEY);
}
function checkAuthenticate(request, response, next){
	let token = request.headers.authorization;
	if(!token){
		//response.sendStatus(401);	
		response.json({result:0, error:{serverMsg:'Not authenticated request. Please log in.'}});
	}else{
		try{
			let decoded = isAuthenticated(token);
			response.member = decoded;
			console.log('auth member : ', response.member);
			next();
		}catch(error){
			console.log('error :: ', error);
			response.json({result:0, error, serverMsg:'Token parsing error.'});
		}
	}
}

exports.signToken = signToken;
exports.isAuthenticated = isAuthenticated;
exports.checkAuthenticate = checkAuthenticate;