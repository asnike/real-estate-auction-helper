import mongoose,{Schema} from 'mongoose';
import bcrypt from 'mongoose-bcrypt';

const Member = new Schema({
	email:{type:String, reuquired:true, unique:true},
	username:{type:String, reuquired:true},
	password:{type:String, bcrypt:true, reuquired:true},
	
	logindate:{type:Date, default:Date.now},
	regdate:{type:Date, default:Date.now}
});
Member.plugin(bcrypt);

export default mongoose.model('member', Member);