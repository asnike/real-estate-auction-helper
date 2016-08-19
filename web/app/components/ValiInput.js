import React from 'react';
import Formsy from 'formsy-react';

const ValiInput = React.createClass({
	mixins:[Formsy.Mixin],
	changeValue(e){
		this.setValue(e.currentTarget.value);
		if(this.props.onChange){
			this.props.onChange(e);
		}
	},
	render(){
		const className = this.showRequired() ? 'required' : this.showError() ? 'error' : null;
		const errorMessage = this.getErrorMessage();
		return (
			<div className={className + ' ' + (this.props.containerClass ? this.props.containerClass : '')}>
				<label className="control-label">{this.props.title}</label>
				<input type={this.props.type || 'text'} className="form-control"
					onChange={this.changeValue} value={this.getValue()} 
					name={this.props.name} checked={this.props.type=='checkbox' && this.getValue() ? 'checked' : null}
				/>
				<span>{errorMessage}</span>
			</div>
		);	
	}
});


export default ValiInput;