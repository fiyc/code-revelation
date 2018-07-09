/**
* @Author: fiyc
* @Date : 2018-07-09 22:29
* @FileName : d_5.js
* @Description : 
	- 处理事件 2
*/



import React from 'react';
import RD from 'react-dom';

let target = document.getElementById('root');

class Toggle extends React.Component{
	constructor(props){
		super(props);
		this.state = {isToggleOn: true};
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(){
		this.setState(prevState => ({
			isToggleOn: !prevState.isToggleOn
		}));
	}

	render(){
		return (
				<button onClick={this.handleClick}>
				{this.state.isToggleOn ? 'ON' : 'OFF'}
				</button>
		);
	}
}

module.exports = function(){
	RD.render(
		<Toggle />,
		target
	);
}


