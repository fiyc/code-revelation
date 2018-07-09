/**
* @Author: fiyc
* @Date : 2018-07-09 23:16
* @FileName : d_11.js
* @Description : 
	- 方向光
	- DirectionalLight
*/


let tf = require('./common.js');

let showStats = true;
let three = tf({showStats});
let add = three.addScene;
let setC = three.setCamera;
let c = three.camera;
let width = three.width;
let height = three.height;

let addCube = () => {
	var light1 = new THREE.DirectionalLight( 0xFF0000 , 1);
	var light2 = new THREE.DirectionalLight( 0x00FF00 , 1);
	var light3 = new THREE.DirectionalLight( 0x0000FF , 1);		
	light1.position.x = -500;
	light1.position.y = 1000;
	light1.position.z = 100;
	light2.position.x = -500;
	light2.position.y = 1000;
	light2.position.z = 100;	
	light3.position.x = -500;
	light3.position.y = 1000;
	light3.position.z = 100;
	add(light1);
	add(light2);
	add(light3);	
	

	
	var geometry = new THREE.CubeGeometry( 200, 100, 50,4,4);
    var material = new THREE.MeshLambertMaterial( { color:0xFF0000} );
    var mesh = new THREE.Mesh( geometry,material);
    mesh.position = new THREE.Vector3(0,0,0);
    add(mesh);
}

let setCamera = () => {
	c.position.x = 500;
	c.position.z = 200;
}

module.exports = () => {
	setCamera();
	addCube();
	
}
