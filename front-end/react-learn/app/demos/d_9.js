/**
* @Author: fiyc
* @Date : 2018-07-09 22:34
* @FileName : d_9.js
* @Description : 
  - 防止组件渲染
*/

import React from 'react';
import RD from 'react-dom';

let target = document.getElementById('root');


let WarningBanner = function(props){
	if(!props.warn){
		return null;
	}

	return (
			<div className="warning">
			Warning!
			</div>
	);
}

class Page extends React.Component{
	constructor(props){
		super(props);
		this.state = {showWarning:true};
		this.handleToggleClick = this.handleToggleClick.bind(this);
	}

	handleToggleClick(){
		this.setState(prevState => ({
			showWarning: !prevState.showWarning
		}));
	}

	render(){
		return (
				<div>
				<WarningBanner warn={this.state.showWarning} />
				<button onClick={this.handleToggleClick}>
				{this.state.showWarning ? 'Hide' : 'Show'}
				</button>
				</div>
		);
	}
}

module.exports = function(){
	RD.render(
			<Page />,
		target
	);
}
