/**
* @Author: fiyc
* @Date : 2018-07-09 23:06
* @FileName : d_5.js
* @Description : 
	- 点线面2
	- 画一个网格
*/

let tf = require('./common.js');

let three = tf();
let add = three.addScene;
let c = three.camera;


let getCube = function(){

	//let result = [];
    var geometry = new THREE.Geometry();

    // 线的材质可以由2点的颜色决定
    var p1 = new THREE.Vector3( 500, 0, 0);
    var p2 = new THREE.Vector3( -500, 0, 0);
    geometry.vertices.push(p1);
    geometry.vertices.push(p2);

	for(let i=0; i<5; i++){
		for(let j=0; j<5; j++){
			var line1 = new THREE.Line(geometry, new THREE.LineBasicMaterial({color: 0x000000, opacity: 0.2}));
			var line2 = new THREE.Line(geometry, new THREE.LineBasicMaterial({color: 0x000000, opacity: 0.2}));
			line1.position.y = (j * 50) - 500;
			line2.position.y = (j * 50) - 500;
			
			line1.position.z = (i * 50) - 500;
			line2.position.x = (i * 50) -500;
			
			line2.rotation.y = 90* Math.PI / 180;
			add(line1);
			add(line2);					
		}
	}
}


let changeC = function(){
	setInterval(function(){
		if(c.position.y <= 100){
			step = 200;
		}

		if(c.position.y >= 2000){
			step = -200;
		}

		c.position.y += step;
	}, 1000);
};
	
module.exports = function(){
	getCube();
	changeC();
	//c.lookAt(100,100,100);
}
