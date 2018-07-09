/**
* @Author: fiyc
* @Date : 2018-07-09 22:36
* @FileName : d_10.js
* @Description : 
  - 列表和键
*/



import React from 'react';
import RD from 'react-dom';

let target = document.getElementById('root');


let List = function(props){
	let datas = [];

	if(props.data){
		datas = props.data
	}

	const listItems = datas.map((item) => (<li key={item.toString()}>{item}</li>));

	return (
			<ul>{listItems}</ul>
	);
}


let numbers = [1, 2, 3, 4, 5];
module.exports = function(){
	RD.render(
			<List data={numbers}/>,
		target
	);
}
