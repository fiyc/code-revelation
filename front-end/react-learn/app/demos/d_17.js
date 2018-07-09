/*
* 状态提升
*/

/**
* @Author: fiyc
* @Date : 2018-07-09 22:45
* @FileName : d_17.js
* @Description : 
	- 状态提升 2
*/

import React from 'react';
import RD from 'react-dom';

let target = document.getElementById('root');

const scaleNames = {
	c: 'Celsius',
	f: 'Fahrenheit'
}

class TemperatureInput extends React.Component{
	constructor(props){
		super(props);
		
		this.handleChange = this.handleChange.bind(this);

//		this.state = {temperature: ''};
	}

	handleChange(e){
//		this.setState({
//			temperature: e.target.value
		//		});
		this.props.onTemperatureChange(e.target.value);
	}

	render(){
		const temperature = this.props.temperature;
		const scale = this.props.scale;

		console.log(`${scale} redraw`);

		return (
				<fieldset>
				<legend>Enter temperature in {scaleNames[scale]}</legend>
				<input value={temperature} onChange={this.handleChange}/>
				</fieldset>				
		);
	}
}

class Calculator extends React.Component{
	constructor(props){
		super(props);
		this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
		this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
		this.state = {temperature: '', scale: 'c'};
	}

	handleCelsiusChange(temperature){
		this.setState({
			scale: 'c',
			temperature
		});
	}

	handleFahrenheitChange(temperature){
		this.setState({
			scale: 'f',
			temperature
		});
	}
	
	
	render(){
		const scale = this.state.scale;
		const temperature = this.state.temperature;
		const celsius = scale === 'c' ? temperature : tryConvert(temperature, toCelsius);
		const fahrenheit = scale === 'f' ? temperature : tryConvert(temperature, toFahrenheit);
		
		return (
				<div>
				<TemperatureInput scale="c" temperature={celsius} onTemperatureChange={this.handleCelsiusChange}/>
				<TemperatureInput scale="f" temperature={fahrenheit} onTemperatureChange={this.handleFahrenheitChange}/>				
				</div>
		);
	}
}

function toCelsius(fahrenheit){
	return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius){
	return (celsius * 9 / 5) + 32;
}

function tryConvert(t, convert){
	const input = parseFloat(t);

	if(Number.isNaN(input)){
		return '';
	}

	const output = convert(input);
	const rounded = Math.round(output * 10000) / 10000;
	return rounded.toString();
}



module.exports = () => {
	RD.render(
			<Calculator />,
		target
	);
}
