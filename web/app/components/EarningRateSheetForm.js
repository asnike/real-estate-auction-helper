import React, { Component, PropTypes } from 'react';
import NumberInput from 'react-number-input';
import PercentInput from './PercentInput';

class EarningRateSheetForm extends Component{
	handleChange(field, e){
		if(isNaN(parseInt(e.target.value))) return;
		this.props.handleChange(field, e.target.value);
	}
	componentWillReceiveProps(nextProps, nextState){
		let total = this.calcTotalCost(nextProps);
		if(nextProps.draft && nextProps.draft.total != total) this.props.handleChange('total', total);
		let loan = this.calcLoan(nextProps);
		if(nextProps.draft && nextProps.draft.loan != loan) this.props.handleChange('loan', loan);
		let loaninterest = this.calcLoanInterest(nextProps);
		if(nextProps.draft && nextProps.draft.loaninterest != loaninterest) this.props.handleChange('loaninterest', loaninterest);
		let investment = this.calcInvestment(nextProps);
		if(nextProps.draft && nextProps.draft.investment != investment) this.props.handleChange('investment', investment);
		let netgain = this.calcNetgain(nextProps);
		if(nextProps.draft && nextProps.draft.netgain != netgain) this.props.handleChange('netgain', netgain);
		let earningrate = this.calcEarningRate(nextProps);
		console.log(earningrate);
		if(nextProps.draft && nextProps.draft.earningrate != earningrate) this.props.handleChange('earningrate', earningrate);
	}
	calcTotalCost(nextProps){
		if(!nextProps.draft) return 0;
		return (nextProps.draft.bid ? parseInt(nextProps.draft.bid) : 0) + 
				(nextProps.draft.realestatemove ? parseInt(nextProps.draft.realestatemove) : 0) + 
				(nextProps.draft.repair ? parseInt(nextProps.draft.repair) : 0) + 
				(nextProps.draft.acquisitiontax ? parseInt(nextProps.draft.acquisitiontax) : 0) + 
				(nextProps.draft.judicialfee ? parseInt(nextProps.draft.judicialfee) : 0) + 
				(nextProps.draft.etc ? parseInt(nextProps.draft.etc) : 0);
	}
	calcLoan(nextProps){
		if(!nextProps.draft) return 0;	
		return ((nextProps.draft.bid ? parseInt(nextProps.draft.bid) : 0)*(nextProps.draft.loanrate ? parseFloat(nextProps.draft.loanrate) : 0))/100;
	}
	calcLoanInterest(nextProps){
		if(!nextProps.draft) return 0;	
		return parseFloat(((nextProps.draft.loan ? parseInt(nextProps.draft.loan) : 0)*(nextProps.draft.loaninterestrate ? parseFloat(nextProps.draft.loaninterestrate) : 0))/100/12, 2).toFixed(0);
	}
	calcInvestment(nextProps){
		if(!nextProps.draft) return 0;	
		return ((nextProps.draft.total ? parseInt(nextProps.draft.total) : 0)-(nextProps.draft.loan ? parseInt(nextProps.draft.loan) : 0)-(nextProps.draft.securitydeposit ? parseInt(nextProps.draft.securitydeposit) : 0));
	}
	calcNetgain(nextProps){
		if(!nextProps.draft) return 0;	
		return ((nextProps.draft.monthlyrent ? parseInt(nextProps.draft.monthlyrent) : 0)-(nextProps.draft.loaninterest ? parseInt(nextProps.draft.loaninterest) : 0));
	}
	calcEarningRate(nextProps){
		if(!nextProps.draft) return 0;	
		let rate = ((((nextProps.draft.netgain ? parseInt(nextProps.draft.netgain) : 0)*12)/(nextProps.draft.investment ? parseInt(nextProps.draft.investment) : 0))*100);
		return isNaN(rate) ? 0 : rate;
	}
	onBlur(field, e){
		this.props.handleChange(field, e.target.value.replace(/,/g, ''));
	}
	handleClose(e){
		e.preventDefault();
		this.props.handleClose();
	}
	render(){
		return(
			<div>
				<div className="earning-sheet-form panel panel-default">
					<form className="form-horizontal" onSubmit={this.props.handleSubmit.bind(this)}>
						<div className="panel-heading">{this.props.formTitle}</div>
						<div className="panel-body">
						
							<div className="col-md-6">
								<div className="form-group">
									<label className="control-label col-md-4">입찰가</label>
									<div className="col-md-8">
										<NumberInput className="form-control" required={true} 
											onChange={this.handleChange.bind(this, 'bid')}
											onBlur={this.onBlur.bind(this, 'bid')}
											value={this.props.draft.bid}
										/>
									</div>
								</div>
								<div className="form-group">
									<label className="control-label col-md-4">명도</label>
									<div className="col-md-8">
										<NumberInput className="form-control" required={true} 
											onChange={this.handleChange.bind(this, 'realestatemove')}
											onBlur={this.onBlur.bind(this, 'realestatemove')}
											placeholder=""
											value={this.props.draft.realestatemove}
										/>
									</div>
								</div>
								<div className="form-group">
									<label className="control-label col-md-4">수리</label>
									<div className="col-md-8">
										<NumberInput className="form-control" 
											onChange={this.handleChange.bind(this, 'repair')}
											onBlur={this.onBlur.bind(this, 'repair')}
											placeholder=""
											value={this.props.draft.repair}
										/>
									</div>
								</div>
								<div className="form-group">
									<label className="control-label col-md-4">취등록세</label>
									<div className="col-md-8">
										<NumberInput className="form-control" 
											onChange={this.handleChange.bind(this, 'acquisitiontax')}
											onBlur={this.onBlur.bind(this, 'acquisitiontax')}
											placeholder=""
											value={this.props.draft.acquisitiontax}
										/>
									</div>
								</div>
								<div className="form-group">
									<label className="control-label col-md-4">법무사비</label>
									<div className="col-md-8">
										<NumberInput className="form-control"
											onChange={this.handleChange.bind(this, 'judicialfee')}
											onBlur={this.onBlur.bind(this, 'judicialfee')}
											placeholder=""
											value={this.props.draft.judicialfee}
										/>
									</div>
								</div>
	
								<div className="form-group">
									<label className="control-label col-md-4">기타비용</label>
									<div className="col-md-8">
										<NumberInput className="form-control"
											onChange={this.handleChange.bind(this, 'etc')}
											onBlur={this.onBlur.bind(this, 'etc')}
											placeholder=""
											value={this.props.draft.etc}
										/>
									</div>
								</div>
								<div className="form-group">
									<label className="control-label col-md-4">합계</label>
									<div className="col-md-8">
										<NumberInput className="form-control" readOnly={true}
											
											placeholder=""
											value={this.props.draft.total}
										/>
									</div>
								</div>
							</div>
							
							<div className="col-md-6">
								<div className="form-group">
									<label className="control-label col-md-4">실투자금</label>
									<div className="col-md-8">
										<NumberInput className="form-control" readOnly={true}
											placeholder=""
											value={this.props.draft.investment}
										/>
									</div>
								</div>
	
								<div className="form-group">
									<label className="control-label col-md-4">대출 비율</label>
									<div className="col-md-8">
										<input text="number" className="form-control" 
											onChange={this.handleChange.bind(this, 'loanrate')}
											onBlur={this.onBlur.bind(this, 'loanrate')}
											placeholder="%"
											value={this.props.draft.loanrate}
										/>
									</div>
								</div>
								
								<div className="form-group">
									<label className="control-label col-md-4">대출금</label>
									<div className="col-md-8">
										<NumberInput className="form-control" readOnly={true}
											placeholder=""
											value={this.props.draft.loan}
										/>
									</div>
								</div>
	
								<div className="form-group">
									<label className="control-label col-md-4">대출금리</label>
									<div className="col-md-8">
										<input type="number" className="form-control"
											onChange={this.handleChange.bind(this, 'loaninterestrate')}
											onBlur={this.onBlur.bind(this, 'loaninterestrate')}
											placeholder=""
											value={this.props.draft.loaninterestrate}
										/>
									</div>
								</div>
								
								<div className="form-group">
									<label className="control-label col-md-4">보증금</label>
									<div className="col-md-8">
										<NumberInput type="text" className="form-control"
											onChange={this.handleChange.bind(this, 'securitydeposit')}
											onBlur={this.onBlur.bind(this, 'securitydeposit')}
											placeholder=""
											value={this.props.draft.securitydeposit}
										/>
									</div>
								</div>
								
								<div className="form-group">
									<label className="control-label col-md-4">월세</label>
									<div className="col-md-8">
										<NumberInput type="text" className="form-control"
											onChange={this.handleChange.bind(this, 'monthlyrent')}
											onBlur={this.onBlur.bind(this, 'monthlyrent')}
											placeholder=""
											value={this.props.draft.monthlyrent}
										/>
									</div>
								</div>
								
								<div className="form-group">
									<label className="control-label col-md-4">월대출이자</label>
									<div className="col-md-8">
										<NumberInput className="form-control" readOnly={true}
											placeholder=""
											value={this.props.draft.loaninterest}
										/>
									</div>
								</div>
								<div className="form-group">
									<label className="control-label col-md-4">월순수익</label>
									<div className="col-md-8">
										<NumberInput className="form-control" readOnly={true}
											placeholder=""
											value={this.props.draft.netgain}
										/>
									</div>
								</div>
								<div className="form-group">
									<label className="control-label col-md-4">수익률</label>
									<div className="col-md-8">
										<input type="text" className="form-control" readOnly={true}
											placeholder=""
											value={parseFloat(this.props.draft.earningrate).toFixed(2)}
										/>
									</div>
								</div>
							</div>
						</div>
						<div className="panel-footer">
							<input type="submit" className="btn btn-success" value={this.props.buttonLabel} />
						</div>
					</form>
				</div>
				<div className="overlay" onClick={this.handleClose.bind(this)}></div>
			</div>
		);
	}
}

export default EarningRateSheetForm;