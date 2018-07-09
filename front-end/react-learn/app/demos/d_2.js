/**
* @Author: fiyc
* @Date : 2018-07-09 22:24
* @FileName : d_2.js
* @Description : 
	- 组件和属性
	- 函数式组件声明
	- 类组件声明
	- 如何在组件中接受参数
*/


import React from 'react';
import RD from 'react-dom';

let target = document.getElementById('root');

//函数式组件
function Welcome1(props){
	return <h1>Hello, {props.name}</h1>
}

//类组件
class Welcome extends React.Component{
	render(){
		return <h1>Hello, {this.props.name}</h1>
	}
}


let App = () => {
	return (
		<div>
			<Welcome name="Sara"/>
			<Welcome name="Cahal"/>
			<Welcome name="Fiyc"/>			
		</div>
	);
}

module.exports = function(){
	RD.render(
		<App />,
		target);
}


	  
