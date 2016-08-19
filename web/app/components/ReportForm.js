import React, { Component, PropTypes } from 'react';
import { DateField } from 'react-date-picker';

class ReportForm extends Component{
	handleChange(field, e){
		this.props.handleChange(field, e.target.value);
	}
	handleClose(e){
		e.preventDefault();
		this.props.handleClose();
	}
	handleCalendar(value, date){
		this.props.handleChange('builddate', value);
	}
	render(){
		return(
			<div>
				<div className="report-form panel panel-default">
					<form className="form-horizontal" onSubmit={this.props.handleSubmit.bind(this)}>
						<div className="panel-heading">{this.props.formTitle}</div>
						<div className="panel-body">
						
							<div className="col-md-4 row">
								<div className="form-group">
									<label className="control-label col-md-4">제목</label>
									<div className="col-md-8">
										<input type="text" className="form-control" required={true} 
											onChange={this.handleChange.bind(this, 'title')}
											autoFocus={true} placeholder=""
											value={this.props.draft.title}
										/>
									</div>
								</div>
								<div className="form-group">
									<label className="control-label col-md-4">주소</label>
									<div className="col-md-8">
										<input type="text" className="form-control" required={true} 
											onChange={this.handleChange.bind(this, 'addr')}
											 placeholder=""
											 value={this.props.draft.addr}
										/>
									</div>
								</div>
								<div className="form-group">
									<label className="control-label col-md-4">건물면적</label>
									<div className="col-md-8">
										<input type="text" className="form-control" 
											onChange={this.handleChange.bind(this, 'size')}
											 placeholder=""
											 value={this.props.draft.size}
										/>
									</div>
								</div>
								<div className="form-group">
									<label className="control-label col-md-4">보존등기</label>
									<div className="col-md-8">
										<DateField
											collapseOnDateClick={true} 
											updateOnDateClick={true} 
											dateFormat="YYYY-MM-DD"
											value={this.props.draft.builddate ? this.props.draft.builddate.split('T')[0] : ''}
											onChange={this.handleCalendar.bind(this)}
										  />
									</div>
								</div>
								<div className="form-group">
									<label className="control-label col-md-4">층수</label>
									<div className="col-md-8">
										<input type="text" className="form-control"
											onChange={this.handleChange.bind(this, 'floor')}
											placeholder="(예: 몇 층 건물 중 몇층"
											value={this.props.draft.floor}
										/>
									</div>
								</div>
	
								<div className="form-group">
									<label className="control-label col-md-4">건물 외관 상태</label>
									<div className="col-md-8">
										<input type="text" className="form-control"
											onChange={this.handleChange.bind(this, 'appearance')}
											placeholder="(상/중/하)"
											value={this.props.draft.appearance}
										/>
									</div>
								</div>
	
								<div className="form-group">
									<label className="control-label col-md-4">건물 내관 상태</label>
									<div className="col-md-8">
										<input type="text" className="form-control"  
											onChange={this.handleChange.bind(this, 'interior')}
											placeholder="(상/중/하)"
											value={this.props.draft.interior}
										/>
									</div>
								</div>
	
								<div className="form-group">
									<label className="control-label col-md-4">우편물 체크</label>
									<div className="col-md-8">
										<input type="text" className="form-control" 
											onChange={this.handleChange.bind(this, 'mail')}
											placeholder="(거주자 일치 여부)"
											value={this.props.draft.mail}
										/>
									</div>
								</div>
	
								<div className="form-group">
									<label className="control-label col-md-4">체납관리비 여부</label>
									<div className="col-md-8">
										<input type="text" className="form-control"
											onChange={this.handleChange.bind(this, 'mainfee')}
											placeholder=""
											value={this.props.draft.mainfee}
										/>
									</div>
								</div>
								
								<div className="form-group">
									<label className="control-label col-md-4">전기가스수도 연체</label>
									<div className="col-md-8">
										<input type="text" className="form-control"
											onChange={this.handleChange.bind(this, 'electricgaswater')}
											placeholder=""
											value={this.props.draft.electricgaswater}
										/>
									</div>
								</div>
								
								<div className="form-group">
									<label className="control-label col-md-4">방향</label>
									<div className="col-md-8">
										<input type="text" className="form-control"
											onChange={this.handleChange.bind(this, 'direction')}
											placeholder="(남향, 북향)"
											value={this.props.draft.direction}
										/>
									</div>
								</div>
								
								<div className="form-group">
									<label className="control-label col-md-4">주차장 여부</label>
									<div className="col-md-8">
										<input type="text" className="form-control"
											onChange={this.handleChange.bind(this, 'garage')}
											placeholder="(세대 당 몇 대 가능)"
											value={this.props.draft.garage}
										/>
									</div>
								</div>
								
								<div className="form-group">
									<label className="control-label col-md-4">채광 및 조망권</label>
									<div className="col-md-8">
										<input type="text" className="form-control"
											onChange={this.handleChange.bind(this, 'lightview')}
											placeholder=""
											value={this.props.draft.lightview}
										/>
									</div>
								</div>
								
								
								<div className="form-group">
									<label className="control-label col-md-4">전입세대 열람 및<br/>점유자조사</label>
									<div className="col-md-8">
										<input type="text" className="form-control"
											onChange={this.handleChange.bind(this, 'possessor')}
											placeholder="(빈집, 임차인, 소유자)"
											value={this.props.draft.possessor}
										/>
									</div>
								</div>
							</div>
							<div className="col-md-4 row">
								<div className="form-group">
									<label className="control-label col-md-4">경사도</label>
									<div className="col-md-8">
										<input type="text" className="form-control" 
											onChange={this.handleChange.bind(this, 'slopeangle')}
											placeholder="(평지또는 언덕)"
											value={this.props.draft.slopeangle}
										/>
									</div>
								</div>
								
								<div className="form-group">
									<label className="control-label col-md-4">지하철 노선</label>
									<div className="col-md-8">
										<input type="text" className="form-control" 
											onChange={this.handleChange.bind(this, 'subway')}
											placeholder=""
											value={this.props.draft.subway}
										/>
									</div>
								</div>
								
								<div className="form-group">
									<label className="control-label col-md-4">버스정류장과의 거리 및<br/>노선 개수</label>
									<div className="col-md-8">
										<input type="text" className="form-control"
											onChange={this.handleChange.bind(this, 'busstop')}
											placeholder=""
											value={this.props.draft.busstop}
										/>
									</div>
								</div>
								
								<div className="form-group">
									<label className="control-label col-md-4">마트/백화점 등의 편의시설</label>
									<div className="col-md-8">
										<input type="text" className="form-control"
											onChange={this.handleChange.bind(this, 'convenience')}
											placeholder=""
											value={this.props.draft.convenience}
										/>
									</div>
								</div>
								
								<div className="form-group">
									<label className="control-label col-md-4">번화가와의 거리</label>
									<div className="col-md-8">
										<input type="text" className="form-control" 
											onChange={this.handleChange.bind(this, 'downtowndistance')}
											placeholder=""
											value={this.props.draft.downtowndistance}
										/>
									</div>
								</div>
								
								<div className="form-group">
									<label className="control-label col-md-4">학군형성 여부</label>
									<div className="col-md-8">
										<input type="text" className="form-control" 
											onChange={this.handleChange.bind(this, 'schooldistrict')}
											placeholder=""
											value={this.props.draft.schooldistrict}
										/>
									</div>
								</div>
								
								<div className="form-group">
									<label className="control-label col-md-4">차량이동이 수월한지,<br/>너무 골목은 아닌지</label>
									<div className="col-md-8">
										<input type="text" className="form-control"
											onChange={this.handleChange.bind(this, 'car')}
											placeholder=""
											value={this.props.draft.car}
										/>
									</div>
								</div>
								
								<div className="form-group">
									<label className="control-label col-md-4">치명적 유해시설 없는지 확인</label>
									<div className="col-md-8">
										<input type="text" className="form-control" 
											onChange={this.handleChange.bind(this, 'harmfularea')}
											placeholder=""
											value={this.props.draft.harmfularea}
										/>
									</div>
								</div>
								
								<div className="form-group">
									<label className="control-label col-md-4">인근 개발계획 및 전망</label>
									<div className="col-md-8">
										<input type="text" className="form-control" 
											onChange={this.handleChange.bind(this, 'developplan')}
											placeholder=""
											value={this.props.draft.developplan}
										/>
									</div>
								</div>
							</div>
							<div className="col-md-4 row">
								<div className="form-group">
									<label className="control-label col-md-4">일반적 시세(1)</label>
									<div className="col-md-8">
										<input type="text" className="form-control" 
											onChange={this.handleChange.bind(this, 'marketprice0')}
											placeholder=""
											value={this.props.draft.marketprice0}
										/>
									</div>
								</div>
								
								<div className="form-group">
									<label className="control-label col-md-4">일반적 시세(2)</label>
									<div className="col-md-8">
										<input type="text" className="form-control" 
											onChange={this.handleChange.bind(this, 'marketprice1')}
											placeholder=""
											value={this.props.draft.marketprice1}
										/>
									</div>
								</div>
								
								<div className="form-group">
									<label className="control-label col-md-4">매도 가능 시세(3)</label>
									<div className="col-md-8">
										<input type="text" className="form-control" 
											onChange={this.handleChange.bind(this, 'sellprice')}
											placeholder=""
											value={this.props.draft.sellprice}
										/>
									</div>
								</div>
								
								<div className="form-group">
									<label className="control-label col-md-4">매입 시세(4)</label>
									<div className="col-md-8">
										<input type="text" className="form-control" 
											onChange={this.handleChange.bind(this, 'bidprice')}
											placeholder=""
											value={this.props.draft.bidprice}
										/>
									</div>
								</div>
								
								<div className="form-group">
									<label className="control-label col-md-4">정확한 임대가</label>
									<div className="col-md-8">
										<input type="text" className="form-control" 
											onChange={this.handleChange.bind(this, 'rentalprice')}
											placeholder="월세 또는 전세"
											value={this.props.draft.rentalprice}
										/>
									</div>
								</div>
								
								<div className="form-group">
									<label className="control-label col-md-4">물량 및<br/>거래 활발 여부</label>
									<div className="col-md-8">
										<input type="text" className="form-control" 
											onChange={this.handleChange.bind(this, 'demandnsupply')}
											placeholder=""
											value={this.props.draft.demandnsupply}
										/>
									</div>
								</div>
								
								<div className="form-group">
									<label className="control-label col-md-4">임대가를 통한<br/>수익률 측정</label>
									<div className="col-md-8">
										<input type="text" className="form-control" 
											onChange={this.handleChange.bind(this, 'earningrate')}
											placeholder=""
											value={this.props.draft.earningrate}
										/>
									</div>
								</div>
							</div>
							
						
						</div>
						<div className="panel-footer"><input type="submit" className="btn btn-success" value={this.props.buttonLabel} /></div>
					</form>
				</div>
				
				<div className="overlay" onClick={this.handleClose.bind(this)}></div>
			</div>
		);
	}
}

ReportForm.propTypes = {
	draft:PropTypes.shape({
		_id:PropTypes.string,
		title:PropTypes.string,
		addr:PropTypes.string,
		size:PropTypes.string,
	}),
}

export default ReportForm;