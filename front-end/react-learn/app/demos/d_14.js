/**
* @Author: fiyc
* @Date : 2018-07-09 22:42
* @FileName : d_14.js
* @Description : 
	- 表单: file input
*/


import React from 'react';
import RD from 'react-dom';

let target = document.getElementById('root');

class FileInput extends React.Component{
	constructor(props){
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e){
		e.preventDefault();
		alert(`Select file - ${this.fileInput.files[0].name}`);
	}

	render(){
		return (
				<form onSubmit={this.handleSubmit}>
				<label>
				Upload file:
				<input type="file" ref={input => {this.fileInput = input}} />
				</label>
				<br />
				<button type="submit">Submit</button>
			</form>
		);
	}
}

module.exports = function(){
	RD.render(
			<FileInput />,
		target
	);
}
