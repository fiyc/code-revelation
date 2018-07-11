/**
* @Author: fiyc
* @Date : 2018-07-11 15:50
* @FileName : d_14.js
* @Description : 
    - 动画基础 ： 网络模型旋转的常用技巧和方法
    - 绘制网格
    - 模型按照xyz轴方向旋转
*/



let tf = require('./common.js');

let showStats = false;
let three = tf({ showStats });
let add = three.addScene;
let setC = three.setCamera;
let c = three.camera;
let width = three.width;
let height = three.height;
let mesh;
let mesh2;
let addBox = function () {
    var geometry = new THREE.BoxGeometry(100, 100, 100);

    for (var i = 0; i < geometry.faces.length; i += 2) {

        var hex = Math.random() * 0xffffff;
        geometry.faces[i].color.setHex(hex);
        geometry.faces[i + 1].color.setHex(hex);

    }

    debugger;
    var material = new THREE.MeshBasicMaterial({ vertexColors: THREE.FaceColors });
    mesh = new THREE.Mesh(geometry, material);
    

    mesh2 = new THREE.Mesh(geometry, material);
    mesh2.position.x = 100;
    mesh2.position.y = 100;
    mesh2.position.z = 100;

    add(mesh);
    add(mesh2);
}

let addLight = function () {
    var light = new THREE.AmbientLight(0xFF0000);
    light.position.set(100, 100, 200);
    add(light);
}

let setCamera = function () {
    c.position.x = 100;
    c.position.y = 300;
    c.position.z = 600;
    c.up.x = 0;
    c.up.y = 1;
    c.up.z = 0;
    c.lookAt(0,0,0);
}

let initGrid = function(){
    var helper = new THREE.GridHelper( 1000, 50 );
    helper.setColors( 0x0000ff, 0x808080 );
    add( helper );
}

module.exports = function () {
    initGrid();
    addLight();
    addBox();
    setCamera();
    three.beginRender();

    setInterval(() => {
        mesh.rotation.y += 0.01;
        mesh2.rotation.x += 0.01;
    },10);
}