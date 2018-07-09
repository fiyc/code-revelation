/**
* @Author: fiyc
* @Date : 2018-07-09 22:46
* @FileName : d_18.js
* @Description : 
    - 组合 vs 继承
*/



import React from 'react';
import RD from 'react-dom';

let target = document.getElementById('root');


function FancyBorder(props){
	return (
			<div className={'FancyBorder FancyBorder-' + props.color}>
			{props.children}
			</div>
	);
}

function WelcomeDialog(){
	return (
			<FancyBorder color="blue">
			<h1 className="Dialog-title">
				Welcome
		</h1>

			<p className="Dialog-message">
			Thank you for visiting our spacecraft!
			</p>
			</FancyBorder>
	);
}

module.exports = () => {
	RD.render(
			<WelcomeDialog />,
		target
	);
}
