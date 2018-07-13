/**
* @Author: fiyc
* @Date : 2018-07-11 15:50
* @FileName : d_15.js
* @Description : 
    - 动画基础 ： 网络模型旋转的常用技巧和方法
    - 按照指定向量的轴进行旋转
    - 通过使用Object3D来实现模型绕物体旋转
*/





let tf = require('./common.js');

let showStats = false;
let three = tf({ showStats });
let add = three.addScene;
let setC = three.setCamera;
let c = three.camera;
let width = three.width;
let height = three.height;
let center;
let mesh;
let temp = new THREE.Object3D();
let addBox = function () {
    var geometry = new THREE.BoxGeometry(100, 100, 100);

    for (var i = 0; i < geometry.faces.length; i += 2) {

        var hex = Math.random() * 0xffffff;
        geometry.faces[i].color.setHex(hex);
        geometry.faces[i + 1].color.setHex(hex);

    }
    
    // var material = new THREE.MeshBasicMaterial({ vertexColors: THREE.FaceColors });
    var material = new THREE.MeshBasicMaterial({color: 0xff1493});
    center = new THREE.Mesh(geometry, material);
    

    mesh = new THREE.Mesh(geometry, material);
    mesh.name = "aaa";
    mesh.position.x = 200;
    mesh.position.z = 200;
    temp.add(mesh);
    add(center);
    add(temp);
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
    // c.up.x = 0;
    // c.up.y = 1;
    // c.up.z = 0;
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


    let yStep = 1;
    setInterval(() => {
        // mesh.rotation.y += 0.01;
        var axis = new THREE.Vector3(0,1,0);
        mesh.rotateOnAxis(axis, 0.1);

        temp.rotateOnAxis(axis, 0.01);

        if(temp.position.y >= 200){
            yStep = -1;
        }

        if(temp.position.y <= 50){
            yStep = 1;
        }
        temp.position.y += yStep;
    },100);
}