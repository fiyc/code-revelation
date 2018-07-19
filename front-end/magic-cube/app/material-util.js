/**
* @Author: fiyc
* @Date : 2018-07-19 11:35
* @FileName : material-util.js
* @Description : 
    - 纹理模块
    - 这是从draw-util.js 拆分出的模块
    - 负责魔方创建时各面的纹理维护
*/

let config = require('./config');

/**
 * 返回一个canvas作为纹理
 * @param {*} size 单个正方形的的长宽
 * @param {*} borderColor canvas边框颜色
 * @param {*} contentColors canvas内容颜色集合, 长度为6
 */
let canvasMaker = function (size, borderColor, contentColors) {
    let canvas = document.createElement('canvas');
    canvas.width = size * 2;
    canvas.height = size * 3;
    var ctx = canvas.getContext('2d');

    for (let row = 0; row < 3; row++) {
        for (let column = 0; column < 2; column++) {
            ctx.fillStyle = contentColors[row * 2 + column];
            ctx.fillRect(column * size, row * size, size, size);

            ctx.strokeStyle = borderColor;
            ctx.lineWidth = 3;
            ctx.strokeRect(column * size, row * size, size, size);
        }
    }
    return canvas;
}

/**
 * 获得一个包含六面纹理的material
 * @param {*} fn 纹理加载后的回调
 */
let makeMaterial = function (fn) {
    var m_red = 'red';
    var m_green = 'green';
    var m_yellow = 'yellow';
    var m_blue = 'blue';
    var m_orange = 'orange';
    var m_gray = 'gray';
    var m_black = 'black';
    let colors = [m_red, m_green, m_yellow, m_orange, m_gray, m_blue];

    let materials = [];
    let canvas = canvasMaker(config.singleSize, m_black, colors);
    // document.getElementsByTagName('body')[0].appendChild(canvas);
    let texture = new THREE.Texture(canvas);    
    texture.needsUpdate = true;
    let result = new THREE.MeshBasicMaterial({ map: texture }, fn);
    return result;
}

module.exports = makeMaterial;