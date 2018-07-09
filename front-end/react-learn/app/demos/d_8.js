/**
* @Author: fiyc
* @Date : 2018-07-09 22:33
* @FileName : d_8.js
* @Description : 
	- 条件渲染 3
*/

import React from 'react';
import RD from 'react-dom';

let target = document.getElementById('root');

let Mailbox = function(props){
	const unreadMessages = props.unreadMessages;

	return (
			<div>
			<h1>Hello!</h1>
			{unreadMessages.length > 0 &&
			 <h2>
			 You have {unreadMessages.length} unread messages.
			 </h2>
			}
			</div>
	);
}

module.exports = function(){
	const messages = ["React", "Re: React", "Re:Re: React", "Hello"];
	RD.render(
		<Mailbox unreadMessages={messages}/>,
		target
	);
}

