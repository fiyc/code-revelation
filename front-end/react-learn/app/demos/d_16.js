/**
* @Author: fiyc
* @Date : 2018-07-09 22:44
* @FileName : d_16.js
* @Description : 
	- 状态提升
*/



import React from 'react';
import RD from 'react-dom';

let target = document.getElementById('root');

function BoilingVerdict(props){
	let text = '';
	if(props.celsius >= 100){
		text = 'The water would boil.';
	}else{
		text = 'The water would not boil.'
	}

	return (<p>{text}</p>);
}

class Calculator extends React.Component{
	constructor(props){
		super(props);
		this.state = {temperature: ''};
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e){
		this.setState({temperature: e.target.value});;
	}

	render(){
		console.log('here is render.');
		const temperature = this.state.temperature;

		return (
				<fieldset>
				<legend>Enter temperature in Celsius:</legend>
				<input value={temperature} onChange={this.handleChange}/>
				<BoilingVerdict
					celsius={temperature}/>
			
				</fieldset>
		);
	}

}

module.exports = () => {
	RD.render(
			<Calculator />,
		target
	);
}
