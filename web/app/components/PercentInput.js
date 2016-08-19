import React, {Component, PropTypes} from 'react';

class PercentInput extends Component{
	constructor(){
		super(...arguments);
		
		this.onChange = this.onChange.bind(this);
		this.onFocus = this.onFocus.bind(this);
		this.onBlur = this.onBlur.bind(this);
		
		this.state = {value:'', focused:false};
	}
	onChange(e){
		this.setState(
			{value: e.target.value ? parseFloat(e.target.value).toFixed(2) : ''},
			() => this.props.onChange(e)
		)
	}
	onFocus(e){
		this.setState(
			{focused: true, value: e.target.value ? parseFloat(e.target.value).toFixed(2) : ''},
			() => this.props.onFocus(e)
		)
	}
	onBlur(e){
		this.setState(
			{focused: false, value: e.target.value ? (parseFloat(e.target.value).toFixed(2) + '%') : ''},
			() => this.props.onBlur(e)
		)
	}
	render(){
		let { onChange, onBlur, onFocus } = this;
		let handlers = {
			onChange, onBlur, onFocus		
		};
		return (
			<input type="number" {...handlers} value={this.state.value} />
		);
	}
}

export default PercentInput;