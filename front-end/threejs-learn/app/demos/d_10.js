
/**
* @Author: fiyc
* @Date : 2018-07-09 23:15
* @FileName : d_10.js
* @Description : 
	- 聚光灯
	- SpotLight
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
	var light = new THREE.SpotLight( 0x880000 , 1, 10000, 10,1);
	light.position.x = 500;
	light.position.y = 1000;
	light.position.z = 100;
	add(light);
	

	
	var geometry = new THREE.CubeGeometry( 200, 100, 50,4,4);
    var material = new THREE.MeshLambertMaterial( { color:0xFFFFFF} );
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
