/**
* @Author: fiyc
* @Date : 2018-07-09 22:40
* @FileName : d_12.js
* @Description : 
	- 表单：textarea受控组件
*/



import React from 'react';
import RD from 'react-dom';

let target = document.getElementById('root');

class EssayForm extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			value: 'Please write an essay about your favorite DOM element.'
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);		
	}

	handleChange(e){
		this.setState({value: e.target.value});
	}

	handleSubmit(e){
		alert('An essay was submitted: ' + this.state.value);
		e.preventDefault();
	}

	render(){
		return (
				<form onSubmit={this.handleSubmit}>
				<label>
				Hello
				<textarea value={this.state.value} onChange={this.handleChange} />
				</label>
				<input type="submit" value="Submit"/>
				</form>
		);
	}

}

module.exports = function(){
	RD.render(
			<EssayForm />,
		target
	);
}
