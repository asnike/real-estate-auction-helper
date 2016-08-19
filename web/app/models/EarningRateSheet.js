import mongoose,{Schema} from 'mongoose';

const EarningRateSheet = new Schema({
	_report:{type:Schema.Types.ObjectId, ref:'ReportItem'},
	
	bid:{type:Number, reuquired:true},
	realestatemove:{type:Number, reuquired:true},
	repair:{type:Number, reuquired:true},
	acquisitiontax:{type:Number, reuquired:true},
	judicialfee:{type:Number, reuquired:true},
	etc:{type:Number},
	
	loanrate:{type:Number, reuquired:true},
	loaninterestrate:{type:Number, reuquired:true},
	securitydeposit:{type:Number, reuquired:true},
	monthlyrent:{type:Number, reuquired:true},
	
	earningrate:{type:Number, reuquired:true},
	
	regdate:{type:Date, default:Date.now}
});

export default mongoose.model('earningratesheet', EarningRateSheet);