import React, {Component, PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as MapActions from '../actions/map';


class MapView extends Component{
	componentWillReceiveProps(nextProps){
		/*if(nextProps.map){
			nextProps.map.
			var marker = new naver.maps.Marker({
				position: new naver.maps.LatLng(37.3595704, 127.105399),
				map: map
			});	
		}*/
	}
	componentDidMount(){
		setTimeout(()=>{
			var mapOptions = {
				center: new naver.maps.LatLng(37.3595704, 127.105399),
				zoom: 10
			};
			var map = new naver.maps.Map('map', mapOptions);	
		}, 100);
		
		this.props.actions.map.fetchMapData();
	}
	render(){
		let height = window.innerHeight || document.body.clientHeight;
		return <div id="map" style={{width:'100%', height:height + 'px'}} className="naver-map"></div>	
	}
}

function mapStateToProps(state){
	return {
		map:state.map
	};
}
function mapDispatchToProps(dispatch){
	return {
		actions:{
			map:bindActionCreators(MapActions, dispatch),
		}
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(MapView);