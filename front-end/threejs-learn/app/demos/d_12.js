/**
* @Author: fiyc
* @Date : 2018-07-09 23:17
* @FileName : d_12.js
* @Description : 
	- 纹理
	- 还没搞懂
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
	var geometry = new THREE.PlaneGeometry( 500, 300, 1, 1 );
    geometry.vertices[0].uv = new THREE.Vector2(0,0);
    geometry.vertices[1].uv = new THREE.Vector2(2,0);
    geometry.vertices[2].uv = new THREE.Vector2(2,2);
    geometry.vertices[3].uv = new THREE.Vector2(0,2);

	var texture = THREE.ImageUtils.loadTexture("下载.jpeg",null,function(t)
											   {
											   });
    var material = new THREE.MeshBasicMaterial({map:texture});
    var mesh = new THREE.Mesh( geometry,material );

    add( mesh );
}

let setCamera = () => {
	c.position.x = 400;
	c.position.y = 400;	
	c.position.z = 400;
}

module.exports = () => {
	setCamera();
	addCube();
	
}
