/**
* @Author: fiyc
* @Date : 2018-07-19 11:34
* @FileName : main.js
* @Description : 
    - 程序程序入口
    - 维护交互操作
*/
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