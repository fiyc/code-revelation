/**
* @Author: fiyc
* @Date : 2018-07-09 22:20
* @FileName : d_1.js
* @Description : 
	- react 元素渲染
	- 主要了解下react渲染元素的基本方式
*/


import React from 'react';
import RD from 'react-dom';
let target = document.getElementById('root');

let loop = function(){
	let getCurrentTimeElement = function(){
		let element = React.createElement('h1',
									  {className:'greetin				g'},
										  <h1>{new Date().toLocaleTimeString()}</h1>);

		return element;
	}

	RD.render(getCurrentTimeElement(), target);
}

let main = function(){
	setInterval(() => {
		loop();
	}, 1000);
}

module.exports = main;
