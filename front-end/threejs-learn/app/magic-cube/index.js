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
var m_blue = 0x0000F;
var m_orange = 0xFFA500;
var m_black = 0x000000;

let colors = [0xDC143C, 0x00FF00, 0xFFFF00, 0x0000F, 0xFFA500, 0x000000];

//魔方单个方块宽度
const w = 100;
var geometry = new THREE.BoxGeometry(100, 100, 100);

let threeCommon = require('../demos/common');
let t = threeCommon();

let setCamera = function () {
    t.camera.position.x = -100;
    t.camera.position.y = 300;
    t.camera.position.z = - 600;
    t.camera.lookAt(0,0,0);
}

/**
 * 初始化网格
 */
let initGrid = function(){
    var helper = new THREE.GridHelper( 1000, 50 );
    helper.setColors( 0x0000ff, 0x808080 );
    t.addScene( helper );
}

/**
 * 初始化魔方模型
 */
let initBox = function(){

    

    for (var i = 0; i < geometry.faces.length; i += 2) {
        // var hex = Math.random() * 0xffffff;
        var hex = colors[index];
        index += 1;
        geometry.faces[i].color.setHex(hex);
        geometry.faces[i + 1].color.setHex(hex);

    }

    var material = new THREE.MeshBasicMaterial({ vertexColors: THREE.FaceColors });
    let box = new THREE.Mesh(geometry, material);
    t.addScene(box);
}

module.exports = function(){
    setCamera();
    initGrid();
    initBox();
    t.beginRender();
}
