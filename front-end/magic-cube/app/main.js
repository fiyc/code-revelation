/**
* @Author: fiyc
* @Date : 2018-07-19 11:34
* @FileName : main.js
* @Description : 
    - 程序程序入口
    - 维护交互操作
*/

let config = require('./config');

let orderNum = Number(prompt('请输入魔方阶数'));
let singleSize = 100;
if(!orderNum || orderNum < 2 || orderNum > 12){
    orderNum = 3;
}


if(orderNum > 4){
    singleSize = 80;
}

if(orderNum > 5){
    singleSize = 60;
}

if(orderNum > 7){
    singleSize = 50;
}

if(orderNum > 9){
    singleSize = 40;
}

if(orderNum > 11){
    singleSize = 30;
}


config.orderNum = orderNum;
config.singleSize = singleSize;

let drawLogic = require('./draw-util');
let action = drawLogic('canvas-frame');
let canvas = document.getElementById('canvas-frame');

let mouseDown = false;
canvas.addEventListener('mousedown', function(e){
    mouseDown = true;
    action.mouseClick(e.clientX, e.clientY);
});

canvas.addEventListener('mousemove', function(e){
    if(mouseDown){
        action.mouseMove(e.clientX, e.clientY);
    }
});

canvas.addEventListener('mouseup', function(e){
    action.mouseUp(e.clientX, e.clientY);
    mouseDown = false;
});