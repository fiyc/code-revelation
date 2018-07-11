/**
* @Author: fiyc
* @Date : 2018-07-09 23:17
* @FileName : d_12.js
* @Description : 
	- 纹理
	- THREE.Texture
*/



let tf = require('./common.js');

let showStats = true;
let three = tf({ showStats });
let add = three.addScene;
let setC = three.setCamera;
let c = three.camera;
let width = three.width;
let height = three.height;

let addCube = () => {
	var geometry = new THREE.PlaneGeometry(500, 300, 1, 1);
	geometry.vertices[0].uv = new THREE.Vector2(0, 0);
	geometry.vertices[1].uv = new THREE.Vector2(2, 0);
	geometry.vertices[2].uv = new THREE.Vector2(2, 2);
	geometry.vertices[3].uv = new THREE.Vector2(0, 2);

	var image = THREE.ImageUtils.loadTexture("https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1531290065152&di=da3406c4b5270569e9187577f4490411&imgtype=0&src=http%3A%2F%2Fnres.ingdan.com%2Fuploads%2F20151210%2F1449737241395228.jpg");
	var texture = new THREE.Texture(image);

	var material = new THREE.MeshBasicMaterial({ map: texture });
	var mesh = new THREE.Mesh(geometry, material);

	add(mesh);
}

let setCamera = () => {
	c.position.x = 400;
	c.position.y = 400;
	c.position.z = 400;
}

module.exports = () => {
	console.log("this is demo 12");
	setCamera();
	addCube();

}
