/**
* @Author: fiyc
* @Date : 2018-07-09 22:56
* @FileName : d_1.js
* @Description : 
	- 照着webgl写的第一个three.js例子
	- 场景(scene)
	- 相机(camera)
	- 渲染器(renderer)
*/



var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.append(renderer.domElement);

var geometry = new THREE.CubeGeometry(1,1,1);
var meterial = new THREE.MeshBasicMaterial({color: 0x00ff00});
var cube = new THREE.Mesh(geometry, meterial);
scene.add(cube);

camera.position.z = 5;

function render (){

	cube.rotation.x += 0.1;
	cube.rotation.y += 0.1;
	renderer.render(scene, camera);
	requestAnimationFrame(render);	
}



module.exports = render ;
