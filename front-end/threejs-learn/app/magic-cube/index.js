/**
* @Author: fiyc
* @Date : 2018-07-13 17:28
* @FileName : index.js
* @Description :   
    - 魔方应用逻辑
*/


//初始化六种魔方材质
var m_red = 0xDC143C;
var m_green = 0x00FF00;
var m_yellow = 0xFFFF00;
var m_blue = 0x0000FF;
var m_orange = 0xFFA500;
var m_black = 0x000000;
//初始化六种魔方颜色 红 绿  黄 
let colors = [m_red, m_green, m_yellow, m_blue, m_orange, m_black];

//魔方单个方块宽度
const w = 100;
var geometry = new THREE.BoxGeometry(100, 100, 100);
var material = new THREE.MeshBasicMaterial({ vertexColors: THREE.FaceColors });

//将每一个方块设置成各个平面颜色
let index = 0;
for (var i = 0; i < geometry.faces.length; i += 2) {
    var hex = colors[index];
    index += 1;
    geometry.faces[i].color.setHex(hex);
    geometry.faces[i + 1].color.setHex(hex);
}

let threeCommon = require('../demos/common');
let matrix = require('./matrix-handle');
let t = threeCommon();

let setCamera = function () {
    t.camera.position.x = 600;
    t.camera.position.y = 600;
    t.camera.position.z = 600;
    t.camera.lookAt(0, 0, 0);
}

/**
 * 初始化网格
 */
let initGrid = function () {
    var helper = new THREE.GridHelper(1000, 50);
    helper.setColors(0x0000ff, 0x808080);
    t.addScene(helper);
}

/**
 * 初始化魔方模型
 */
let initBox = function () {
    let initX = -1 * w;
    let initY = w;
    let initZ = w;

    let allBoxs = [];
    for (let index = 0; index < 27; index++) {
        let currentY = initY - (parseInt((index % 9) / 3) * w)
        let currentX = initX + (((index % 9) % 3) * w);
        let currentZ = initZ - parseInt(index / 9) * w;

        let currentBox = new THREE.Mesh(geometry, material);
        currentBox.position.x = currentX;
        currentBox.position.y = currentY;
        currentBox.position.z = currentZ;
        currentBox.coordinate = new matrix.Coordinate();
        currentBox.initIndex = index;
        t.addScene(currentBox);
        allBoxs.push(currentBox);
    }

    matrix.setPoint(allBoxs);
}

let test = function () {
    let rotationBox1 = new THREE.Object3D();
    let boxes = matrix.getPoint('right');
    debugger;
    for (let index in boxes) {
        rotationBox1.add(boxes[index]);
    }

    t.addScene(rotationBox1);

    let rotationIndex = 0;
    var axis = new THREE.Vector3(-1, 0, 0);
    let axisVector = [-1, 0, 0];
    let interval = setInterval(function(){
        rotationIndex += 1;
        if(rotationIndex >= 45){
            clearInterval(interval);
            t.scene.remove(rotationBox1);

            for (let index in boxes) {
                if(index === "7" || index === "0" ||index === "6"){
                    // debugger;
                }
                let realAxis = boxes[index].coordinate.convertVector(axisVector);
                let currentAxis = new THREE.Vector3(realAxis[0], realAxis[1], realAxis[2]);
                boxes[index].rotateOnAxis(currentAxis, Math.PI / 2);
                t.addScene(boxes[index]);
            }

            matrix.roration('right', 1);

            return;
        }

        rotationBox1.rotateOnAxis(axis, Math.PI / 90);
    }, 100);
}

let test2 = function () {
    let rotationBox = new THREE.Object3D();
    let boxes = matrix.getPoint('buttom');
    console.log(boxes[2]);
    for (let index in boxes) {
        rotationBox.add(boxes[index]);
    }

    t.addScene(rotationBox);

    let rotationIndex = 0;
    var axis = new THREE.Vector3(0, -1, 0);
    let axisVector = [0, -1, 0];
    let interval = setInterval(function(){
        rotationIndex += 1;
        if(rotationIndex >= 45){
            clearInterval(interval);
            t.scene.remove(rotationBox);

            for (let index in boxes) {
                let realAxis = boxes[index].coordinate.convertVector(axisVector);
                let currentAxis = new THREE.Vector3(realAxis[0], realAxis[1], realAxis[2]);
                boxes[index].rotateOnAxis(currentAxis, Math.PI / 2);
                t.addScene(boxes[index]);
            }

            matrix.roration('buttom', 1);
            matrix.printIndex('buttom');

            test();
            return;
        }
        // boxes[2].rotateOnAxis(axis, Math.PI /90);
        rotationBox.rotateOnAxis(axis, Math.PI / 90);
    }, 100);
}


let rotation = function(plan, cb){
    let rotationBox = new THREE.Object3D();
    let boxes = matrix.getPoint(plan);

    for (let index in boxes) {
        rotationBox.add(boxes[index]);
    }

    t.addScene(rotationBox);

    let speed = 45;
    let vector = matrix.getVecotrByPlan(plan);
    var axis = new THREE.Vector3(vector[0], vector[1], vector[2]);

    let intervalIndex = 0;
    let interval = setInterval(function(){
        intervalIndex += 1;
        if(intervalIndex > speed){
            clearInterval(interval);
            t.scene.remove(rotationBox);

            for (let index in boxes) {
                let realAxis = boxes[index].coordinate.convertVector(vector);
                let currentAxis = new THREE.Vector3(realAxis[0], realAxis[1], realAxis[2]);
                boxes[index].rotateOnAxis(currentAxis, Math.PI / 2);
                t.addScene(boxes[index]);
            }

            matrix.roration(plan, 1);

            if(typeof cb === "function"){
                cb();
            }
            return;
        }

        let radius = Math.PI / (2 * speed);
        rotationBox.rotateOnAxis(axis, radius);
    }, 100);
}



module.exports = function () {
    setCamera();
    initGrid();
    initBox();
    t.beginRender();

    // test();
    // test2();
    rotation('buttom', () => {
        rotation('right', () => {
            rotation('top');
        });
    });
}
