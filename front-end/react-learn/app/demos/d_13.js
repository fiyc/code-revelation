/**
* @Author: fiyc
* @Date : 2018-07-09 22:41
* @FileName : d_13.js
* @Description : 
	- 表单: select
*/


import React from 'react';
import RD from 'react-dom';

let target = document.getElementById('root');

class FlavorForm extends React.Component{
	constructor(props){
		super(props);
		this.state = {value: 'coconut'};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e){
		this.setState({value: e.target.value});
	}

	handleSubmit(e){
		alert('Your favorite flavor is: ' + this.state.value);
		e.preventDefault();
	}

	render(){
		return (
				<form onSubmit={this.handleSubmit}>
				<label>
				Pick your favorite La Croix flavor:
				<select value={this.state.value} onChange={this.handleChange}>
				<option value="grapefruit">Grapefruit</option>
				<option value="lime">Lime</option>
				<option value="coconut">Coconut</option>
				<option value="mongo">Mango</option>				
				</select>
				</label>
				<input type="submit" value="Submit"/>
				</form>
		);
	}
}

module.exports = function(){
	RD.render(
			<FlavorForm />,
		target
	);
}
