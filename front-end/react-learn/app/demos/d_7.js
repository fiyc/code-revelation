/*
* 条件渲染 2
*/

/**
* @Author: fiyc
* @Date : 2018-07-09 22:33
* @FileName : d_7.js
* @Description : 
  - 条件渲染 2
*/

import React from 'react';
import RD from 'react-dom';

let target = document.getElementById('root');


let Btn = function(props){
	return (
			<button onClick={props.onClick}>
			{props.name}
			</button>
	);
}



class LoginControl extends React.Component{
	constructor(props){
		super(props);
		this.handleLoginClick = this.handleLoginClick.bind(this);
		this.handleLogoutClick = this.handleLogoutClick.bind(this);		
		this.state = {isLogin: false};
	}

	handleLoginClick(){
		this.setState({isLogin: true});
	}

	handleLogoutClick(){
		this.setState({isLogin: false});
	}

	render(){
		const isLogin = this.state.isLogin;
		let button = null;
		if(isLogin){
			button = <Btn onClick={this.handleLogoutClick} name="Logout"/>
		}else{
			button = <Btn onClick={this.handleLoginClick} name="Login"/>
		}

		return (
				<div>
				<Greeting isLoggin={isLogin} />
				{button}
				</div>
		);
	}
}



function UserGreeting(props){
	return (<h1>Welcome back!</h1>);
}

function GuestGreeting(props){
	return (<h1>Please sign up.</h1>);
}

function Greeting(props){
	const isLoggin = props.isLoggin;

	if(isLoggin){
		return <UserGreeting />
	}else{
		return <GuestGreeting />
	}
}



module.exports = function(){
	RD.render(
		<LoginControl />,
		target
	);
}


