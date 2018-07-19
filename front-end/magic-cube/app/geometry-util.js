/**
* @Author: fiyc
* @Date : 2018-07-19 14:44
* @FileName : geometry-util.js
* @Description : 
    - geometry工具类
    - 创造BoxGeometry 并将各个点映射到纹理
*/

/**
 * 目标纹理
 * 3 * 2 的六个彩色方块
 * 红，黄
 * 蓝, 灰
 * 绿, 橙
 */

var v_red = [
    new THREE.Vector2(0, .666),
    new THREE.Vector2(.5, .666),
    new THREE.Vector2(.5, 1),
    new THREE.Vector2(0, 1)
];

var v_yellow = [
    new THREE.Vector2(.5, .666),
    new THREE.Vector2(1, .666),
    new THREE.Vector2(1, 1),
    new THREE.Vector2(.5, 1)
];

var v_blue = [
    new THREE.Vector2(0, .333),
    new THREE.Vector2(.5, .333),
    new THREE.Vector2(.5, .666),
    new THREE.Vector2(0, .666)
];

var v_gray = [
    new THREE.Vector2(.5, .333),
    new THREE.Vector2(1, .333),
    new THREE.Vector2(1, .666),
    new THREE.Vector2(.5, .666)
];

var v_green = [
    new THREE.Vector2(0, 0),
    new THREE.Vector2(.5, 0),
    new THREE.Vector2(.5, .333),
    new THREE.Vector2(0, .333)
];

var v_orange = [
    new THREE.Vector2(.5, 0),
    new THREE.Vector2(1, 0),
    new THREE.Vector2(1, .333),
    new THREE.Vector2(.5, .333)
];

let geometryMake = function (size) {
    var geometry = new THREE.BoxGeometry(size, size, size);
    geometry.faceVertexUvs[0] = [];

    geometry.faceVertexUvs[0][0] = [v_red[0], v_red[1], v_red[3]];
    geometry.faceVertexUvs[0][1] = [v_red[1], v_red[2], v_red[3]];

    geometry.faceVertexUvs[0][2] = [v_yellow[0], v_yellow[1], v_yellow[3]];
    geometry.faceVertexUvs[0][3] = [v_yellow[1], v_yellow[2], v_yellow[3]];

    geometry.faceVertexUvs[0][4] = [v_blue[0], v_blue[1], v_blue[3]];
    geometry.faceVertexUvs[0][5] = [v_blue[1], v_blue[2], v_blue[3]];

    geometry.faceVertexUvs[0][6] = [v_gray[0], v_gray[1], v_gray[3]];
    geometry.faceVertexUvs[0][7] = [v_gray[1], v_gray[2], v_gray[3]];

    geometry.faceVertexUvs[0][8] = [v_green[0], v_green[1], v_green[3]];
    geometry.faceVertexUvs[0][9] = [v_green[1], v_green[2], v_green[3]];

    geometry.faceVertexUvs[0][10] = [v_orange[0], v_orange[1], v_orange[3]];
    geometry.faceVertexUvs[0][11] = [v_orange[1], v_orange[2], v_orange[3]];

    return geometry;
}


module.exports = geometryMake;



