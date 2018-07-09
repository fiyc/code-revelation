/**
* @Author: fiyc
* @Date : 2018-07-09 22:43
* @FileName : d_15.js
* @Description : 
	- 表单: 处理多个输入元素
*/



import React from 'react';
import RD from 'react-dom';

let target = document.getElementById('root');

class Reservation extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			isGoing: true,
			numberOfGuests: 2
		};
		
		this.handleInputChange = this.handleInputChange.bind(this);
	}

	handleInputChange(e){
		const target = e.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
	}

	render(){
		return (
				<form>
				<label>Is going:
				<input
					name="isGoing"
					type="checkbox"
					checked={this.state.isGoing}
					onChange={this.handleInputChange}/></label>
				<br />

				<label>Number of guests:
				<input
					name="numberOfGuests"
					type="number"
					checked={this.state.numberOfGuests}
					onChange={this.handleInputChange}/></label>
			</form>
		);
	}

	
}

module.exports = function(){
	RD.render(
			<Reservation />,
		target
	);
}
