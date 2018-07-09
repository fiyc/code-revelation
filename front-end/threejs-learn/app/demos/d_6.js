/**
* @Author: fiyc
* @Date : 2018-07-09 23:07
* @FileName : d_6.js
* @Description : 
	- 让场景动起来
	- 1. 相机运动
	- 2. 物体运动
*/



let tf = require('./common.js');

let showStats = true;
let three = tf({showStats});
let add = three.addScene;
let c = three.camera;
let width = three.width;
let height = three.height;

let mesh;
let addCube = function(){
	//light

	var light = new THREE.AmbientLight(0xFFFFFF);
	light.position.set(100, 100, 200);
	add(light);

	light = new THREE.PointLight(0x00FF00);
	light.position.set(0,0,300);
	add(light);


	//cube
	var g = new THREE.CylinderGeometry(100, 150, 400);
	var meterial = new THREE.MeshLambertMaterial({color: 0xFFFF00});
	mesh = new THREE.Mesh(g, meterial);
	mesh.position = new THREE.Vector3(0, 0, 0);
	add(mesh);

};

let setCamera = function(){
	c.position.x = 0;
    c.position.y = 0;
    c.position.z = 600;
    c.up.x = 0;
    c.up.y = 1;
    c.up.z = 0;
    c.lookAt(0, 0, 0);
}

let beginAnimation = function(){
	let step = 1;
	setInterval(function(){
		if(c.position.x >= 200){
			step = -1;
		}

		if(c.position.x <= -200){
			step = 1;
		}
		
		c.position.x += step;
	},10);
}

let beginAnimation2 = function(){
	let step = 1;
	setInterval(function(){
		if(mesh.position.x >= 200){
			step = -1;
		}

		if(mesh.position.x <= -200){
			step = 1;
		}
		
		mesh.position.x += step;
	},10);	
}


module.exports = function(){
	addCube();
	setCamera();
	beginAnimation2();
}

