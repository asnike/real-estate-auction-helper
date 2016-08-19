import mongoose,{Schema} from 'mongoose';

const ReportItemSchema = new Schema({
	title:{type:String, reuquired:true},
	addr:{type:String, reuquired:true},
	builddate:{type:Date, default:null},
	size:String,
	floor:String,
	appearance:String,
	interior:String,
	mail:String,
	mainfee:String,
	electricgaswater:String,
	direction:String,
	garage:String,
	lightview:String,
	possessor:String,
	slopeangle:String,
	subway:String,
	busstop:String,
	convenience:String,
	downtowndistance:String,
	schooldistrict:String,
	car:String,
	harfularea:String,
	developplan:String,
	marketprice:String,
	sellprice:String,
	bidprice:String,
	rentalprice:String,
	demandnsupply:String,
	earningrate:String,
	note:String,
	rating:Number,
	
	earningratelist:[{type:Schema.Types.ObjectId, ref:'earningratesheet'}],
	_member:{type:Schema.Types.ObjectId, ref:'member'},

	regdate:{type:Date, default:Date.now}
});

export default mongoose.model('reportitem', ReportItemSchema);