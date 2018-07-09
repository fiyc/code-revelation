/**
* @Author: fiyc
* @Date : 2018-07-09 22:32
* @FileName : d_6.js
* @Description : 
	- 条件渲染 1 
*/



import React from 'react';
import RD from 'react-dom';

let target = document.getElementById('root');

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
			<Greeting isLoggin={true}/>,
		target
	);
}
