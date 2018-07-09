/**
* @Author: fiyc
* @Date : 2018-07-09 22:29
* @FileName : d_4.js
* @Description : 
	- 处理事件 1
*/

import React from 'react';
import RD from 'react-dom';

let target = document.getElementById('root');

let ActionLink = () =>{
	let handerClick = (e) => {
		e.preventDefault();
		console.log("The link was clicked.");
	}

	return (
			<a href="#" onClick={handerClick}>
			Click me
		</a>
	);
}


module.exports = function(){
	RD.render(
			<ActionLink />,
		target
	);
}
