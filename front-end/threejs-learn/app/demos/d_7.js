/**
* @Author: fiyc
* @Date : 2018-07-09 23:08
* @FileName : d_7.js
* @Description : 
	- 三维空间的观察
	- 基本坐标系 ： 右手坐标
	- 相机位置相关的属性
		- postion: 相机所在的空间位置
		- up: 相机顶部(把相机想象成人头的话， 这里指的就是头顶)指向的方向
		- lookAt: 相机看向的空间位置
*/



let tf = require('./common.js');

let showStats = true;
let three = tf({showStats});
let add = three.addScene;
let setC = three.setCamera;
let width = three.width;
let height = three.height;

let setCamera = function(){
	let c = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
//	let c = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 10, 1000 );
	c.position.x = 0;
	c.position.y = 0;
	c.position.z = 600;
	c.up.x = 0;
	c.up.y = 1;
	c.up.z = 0;
	c.lookAt(0, 0, 0);

	setC(c);
}

let addCube = function(){
	var light = new THREE.AmbientLight(0xFF0000);
    light.position.set(100, 100, 200);
    add(light);
    
    light = new THREE.PointLight(0x00FF00);
    light.position.set(0, 0,300);
    add(light);

	var geometry = new THREE.CylinderGeometry( 70,100,200);
    var material = new THREE.MeshLambertMaterial( { color:0xFFFFFF} );
    var mesh = new THREE.Mesh( geometry,material);
    mesh.position = new THREE.Vector3(0,0,0);
    add(mesh);

}

module.exports = function(){
	setCamera();
	addCube();
}
