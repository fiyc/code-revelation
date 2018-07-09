/*
* 状态和生命周期
*/

/**
* @Author: fiyc
* @Date : 2018-07-09 22:26
* @FileName : d_3.js
* @Description : 
	- 状态和生命周期
	- componentDidMount()
	- componentWillUnmount()
	- state的粗略使用
*/



import React from 'react';
import RD from 'react-dom';

let target = document.getElementById('root');
class Clock extends React.Component{
	constructor(props){
		super(props);
		this.state = {date: new Date()};
	}

	componentDidMount(){
		this.timerID = setInterval(() => this.tick(), 1000);
	}

	componentWillUnmount(){
		clearInterval(this.timerID);
	}

	tick(){
		this.setState({
			date: new Date()
		});
	}
	
	render(){
		return (
				<div>
				<h1>Hello, World!</h1>
				<h2>It is {this.state.date.toLocaleTimeString()}.</h2>
				</div>
		);
	}
}

function App(){
	return (
		<div>
			<Clock />
			<Clock />
			<Clock />
			</div>
	);
}


module.exports = function(){
	RD.render(
			<App />,
		target
	);
}
