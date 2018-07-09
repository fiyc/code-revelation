/**
* @Author: fiyc
* @Date : 2018-07-09 22:38
* @FileName : d_11.js
* @Description : 
	- 表单： 受控组件
	- 基本思想是屏蔽了html控件本身的输入赋值显示动作， 由react通过state来控制
*/



import React from 'react';
import RD from 'react-dom';

let target = document.getElementById('root');


class NameForm extends React.Component{

	constructor(props){
		super(props);
		this.state = {value: ''};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);		
	}

	handleChange(e){
		this.setState({value: event.target.value.toUpperCase()});
	}

	handleSubmit(e){
		alert('A name was submitted: ' + this.state.value);
		event.preventDefault();
	}

	render(){
		return (
				<form onSubmit={this.handleSubmit}>
				<label>
				Name:
				<input type="text" value={this.state.value} onChange={this.handleChange} />
				</label>
				<input type="submit" value="Submit" />
				</form>
		);
	}
}

module.exports = function(){
	RD.render(
			<NameForm />,
		target
	);
}
