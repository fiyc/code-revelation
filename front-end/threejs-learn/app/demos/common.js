/**
* @Author: fiyc
* @Date : 2018-07-09 23:04
* @FileName : common.js
* @Description : 
	- 代替原有的代码模板
	- 封装三组建的基本行为， 支持自定义相机，物体等
*/



var renderer;
var camera;
var scene;

let width;
let height;
let target;

let init = function(param){
	let defaultParam = {
		targetId: 'canvas-frame',
		showStats: false
	};

	Object.assign(defaultParam, param);
	
	target = document.getElementById(defaultParam.targetId);

    width = target.clientWidth;
    height = target.clientHeight;

	initThree();
	initCamera();
	initScene();

	/*
	if(defaultParam.setOptions && typeof defaultParam.setOptions){
		defaultParam.setOptions(renderer, camera);
	}

	if(defaultParam.getCube && typeof defaultParam.getCube){
		let cubes = defaultParam.getCube();
		
		for(let item in cubes){
			scene.add(cubes[item]);
		}
	}
*/

	render();

	if(defaultParam.showStats){
		openStats();
	}
	
	return {
		camera,
		width,
		height,
		setCamera: (c) =>{
			camera = c;
		},
		addScene: (obj) => {
			scene.add(obj);
		}
	};
}

function render(){
	renderer.render(scene, camera);

	if(stats){
		stats.update();
	}
	requestAnimationFrame(render);
}

function initThree() {
    renderer = new THREE.WebGLRenderer({
        antialias : true
    });
    renderer.setSize(width, height);
	target.appendChild(renderer.domElement);
    renderer.setClearColor(0xFFFFFF, 1.0);
}


function initCamera() {
    camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
    camera.position.x = 0;
    camera.position.y = 1000;
    camera.position.z = 0;

    camera.lookAt(0,0,0);
}


function initScene() {
    scene = new THREE.Scene();
}



function threeStart() {
    initThree();
    initCamera();
    initScene();
    initLight();
    initObject();
    renderer.clear();
    renderer.render(scene, camera);
}

var stats;
function openStats(){
	stats = new Stats();
	stats.setMode(1);//0. fps, 1:ms
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.left = '0px';
	stats.domElement.style.top = '0px';
	document.body.appendChild(stats.domElement);
}

module.exports = init;
