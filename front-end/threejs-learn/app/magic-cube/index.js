/**
* @Author: fiyc
* @Date : 2018-07-13 17:28
* @FileName : index.js
* @Description :   
    - 魔方应用逻辑
*/

const globalSpeed = 2;

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
    t.camera.position.x = 800;
    t.camera.position.y = 400;
    t.camera.position.z = 800;
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

/**
 * 根据鼠标点击的xy来获取场景中的模型
 */
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
let GetCobeByClickPoint = function(x, y){
    mouse.x = ( x / t.width ) * 2 - 1;
    mouse.y = - ( y / t.height ) * 2 + 1;

    // 通过鼠标点的位置和当前相机的矩阵计算出raycaster
    raycaster.setFromCamera( mouse, t.camera );

    var intersects = raycaster.intersectObjects( t.scene.children );
    if(intersects && intersects.length >0){
        return intersects[0];
    }else{
        return null;
    }
}

/**
 * 修正点击坐标， 修正后的位置为模型所点击面的中心位置
 * @param {*} cobeInfo 
 */
let correctPosition = function(cobeInfo){
    let result = [];
    result.push(cobeInfo.object.position.x);
    result.push(cobeInfo.object.position.y);
    result.push(cobeInfo.object.position.z);

    let clickPoint = cobeInfo.point;

    let cx = Math.abs(Math.abs(clickPoint.x) - 150);
    let cy = Math.abs(Math.abs(clickPoint.y) - 150);
    let cz = Math.abs(Math.abs(clickPoint.z) - 150);

    if(cx <= cy && cx <= cz){
        result[0] = clickPoint.x > 0 ? 150 : -150;
    }else if(cy <= cx && cy <= cz){
        result[1] = clickPoint.y > 0 ? 150 : -150;
    }else{
        result[2] = clickPoint.z > 0 ? 150 : -150;
    }

    return result;
}

/**
 * 根据开始坐标与结束坐标，判断滑动将旋转的面以及顺时逆势
 * @param {*} begin 
 * @param {*} end 
 */
let getPlanAndAnti = function(begin, end){
    let result = [];
    /**
     * 首先判断开始与结束是否在同一直线上
     * 判断是否在同一直线上的依据是， xyz三个坐标中有两个坐标相同
     */

     let sameCount = 0;
     //旋转围绕的轴
     let rotationAxisIndex = 0;

     //触摸面对应不变的轴
     let touchAxisIndex = 0;

     //移动方向的轴
     let moveAxisIndex = 0;
     for(let i=0; i<3; i++){
         if(begin[i] === end[i]){
             sameCount += 1;

             if(Math.abs(begin[i]) !== 150){
                 rotationAxisIndex = i;
             }else{
                touchAxisIndex = i;
             }
         }else{
            moveAxisIndex = i;
         }
     }

     //不是一条直线， 无效的鼠标动作
     if(sameCount !== 2){
         return result;
     }

     let planPositoin = begin[rotationAxisIndex];
     let moveDistance = end[moveAxisIndex] - begin[moveAxisIndex];
     if(rotationAxisIndex === 0){
         //绕x轴翻转
         result['plan'] = planPositoin < 0 ? "left" : (planPositoin > 0 ? "right" : "midv");
     }else if(rotationAxisIndex === 1){
         //绕y轴旋转
        result['plan'] = planPositoin < 0 ? "buttom" : (planPositoin > 0 ? "top" : "midh");
     }else{
         //绕z轴旋转
         result['plan'] = planPositoin < 0 ? "back" : (planPositoin > 0 ? "front" : "midt");
     }

     let isAnti = false;
     switch(result['plan']){
         case 'left': {
            if((touchAxisIndex === 1 && begin[touchAxisIndex] === 150) || (touchAxisIndex === 2 && begin[touchAxisIndex] === -150)){
                isAnti = moveDistance > 0 ? false : true;
            }else{
                isAnti = moveDistance > 0 ? false : true;
            }
            break;
         }

         case 'right':{
            if((touchAxisIndex === 1 && begin[touchAxisIndex] === 150) || (touchAxisIndex === 2 && begin[touchAxisIndex] === -150)){
                isAnti = moveDistance > 0 ? true : false;
            }else{
                isAnti = moveDistance > 0 ? false : true;
            }
            break;
         }

         case 'midv':{
            if((touchAxisIndex === 1 && begin[touchAxisIndex] === 150) || (touchAxisIndex === 2 && begin[touchAxisIndex] === -150)){
                isAnti = moveDistance > 0 ? true : false;
            }else{
                isAnti = moveDistance > 0 ? false : true;
            }
            break;
         }

         case 'buttom': {
            if((touchAxisIndex === 0 && begin[touchAxisIndex] === -150) || (touchAxisIndex === 2 && begin[touchAxisIndex] === 150)){
                isAnti = moveDistance > 0 ? false : true;
            }else{
                isAnti = moveDistance > 0 ? true : false;
            }
            break;
         }

         case 'top': {
            if((touchAxisIndex === 0 && begin[touchAxisIndex] === -150) || (touchAxisIndex === 2 && begin[touchAxisIndex] === 150)){
                isAnti = moveDistance > 0 ? false : true;
            }else{
                isAnti = moveDistance > 0 ? true : false;
            }
            break;
         }

         case 'midh': {
            if((touchAxisIndex === 0 && begin[touchAxisIndex] === -150) || (touchAxisIndex === 2 && begin[touchAxisIndex] === 150)){
                isAnti = moveDistance > 0 ? false : true;
            }else{
                isAnti = moveDistance > 0 ? true : false;
            }
            break;
         }

         case 'back':{
            if((touchAxisIndex === 0 && begin[touchAxisIndex] === -150) || (touchAxisIndex === 1 && begin[touchAxisIndex] === 150)){
                isAnti = moveDistance > 0 ? false : true;
            }else{
                isAnti = moveDistance > 0 ? true : false;
            }
             break;
         }

         case 'front':{
            if((touchAxisIndex === 0 && begin[touchAxisIndex] === -150) || (touchAxisIndex === 1 && begin[touchAxisIndex] === 150)){
                isAnti = moveDistance > 0 ? true : false;
            }else{
                isAnti = moveDistance > 0 ? false : true;
            }
             break;
         }

         case 'midt':{
            if((touchAxisIndex === 0 && begin[touchAxisIndex] === -150) || (touchAxisIndex === 1 && begin[touchAxisIndex] === 150)){
                isAnti = moveDistance > 0 ? true : false;
            }else{
                isAnti = moveDistance > 0 ? false : true;
            }
             break;
         }

     }

     result['isAnti'] = isAnti;
     return result;
}

/**
 * 旋转单面
 * @param {*} plan 旋转面
 * @param {*} speed 旋转速度， 正整数， 数字越小， 速度越大， 
 * @param {*} cb 
 * @param {*} isAnti 是否逆时针旋转
 */
let rotation = function (plan, speed, cb,isAnti) {
    let rotationBox = new THREE.Object3D();
    let boxes = matrix.getPoint(plan);

    for (let index in boxes) {
        rotationBox.add(boxes[index]);
    }

    t.addScene(rotationBox);

    // let speed = speed;
    let vector = matrix.getVecotrByPlan(plan);
    console.log(vector);
    if(isAnti){
        let newVector = [];
        for(let i in vector){
            newVector[i] = -1 * vector[i];
        }
        vector = newVector;
    }

    var axis = new THREE.Vector3(vector[0], vector[1], vector[2]);

    let intervalIndex = 0;
    let interval = setInterval(function () {
        intervalIndex += 1;
        if (intervalIndex > speed) {
            clearInterval(interval);
            t.scene.remove(rotationBox);

            for (let index in boxes) {
                let realAxis = boxes[index].coordinate.convertVector(vector);
                let currentAxis = new THREE.Vector3(realAxis[0], realAxis[1], realAxis[2]);
                boxes[index].rotateOnAxis(currentAxis, Math.PI / 2);
                t.addScene(boxes[index]);
            }

            if(isAnti){
                matrix.roration(plan, 3);
            }else{
                matrix.roration(plan, 1);
            }


            if (typeof cb === "function") {
                cb();
            }

            if(matrix.isFinish()){
                alert("Win!");
                return;
            }
            return;
        }

        let radius = Math.PI / (2 * speed);
        rotationBox.rotateOnAxis(axis, radius);
    }, 100);
}

/**
 * 整体旋转
 * @param {*} direct 0: 上   1: 右   2: 下   3: 左
 * @param {*} cb 
 */
let allRotation = function (direct, speed, cb) {
    let rotationBox = new THREE.Object3D();
    let boxes = matrix.getPoint();

    for (let index in boxes) {
        rotationBox.add(boxes[index]);
    }

    t.addScene(rotationBox);

    let vector;
    let plansAndTime = {};
    if (direct === 0) {
        vector = [-1, 0, 0];
        plansAndTime['right'] = 1;
        plansAndTime['midv'] = 1;
        plansAndTime['left'] = 3;
    } else if (direct === 1) {
        vector = [0, 1, 0];
        plansAndTime['top'] = 3;
        plansAndTime['midh'] = 3;
        plansAndTime['buttom'] = 3;
    } else if (direct === 2) {
        vector = [1, 0, 0];
        plansAndTime['right'] = 3;
        plansAndTime['midv'] = 3;
        plansAndTime['left'] = 1;
    } else {
        vector = [0, -1, 0];
        plansAndTime['top'] = 1;
        plansAndTime['midh'] = 1;
        plansAndTime['buttom'] = 1;
    }

    let axis = new THREE.Vector3(vector[0], vector[1], vector[2]);

    let intervalIndex = 0;
    let interval = setInterval(function () {
        intervalIndex += 1;
        if (intervalIndex > speed) {
            clearInterval(interval);
            t.scene.remove(rotationBox);

            for (let index in boxes) {
                let realAxis = boxes[index].coordinate.convertVector(vector);
                let currentAxis = new THREE.Vector3(realAxis[0], realAxis[1], realAxis[2]);
                boxes[index].rotateOnAxis(currentAxis, Math.PI / 2);
                t.addScene(boxes[index]);
            }

            for (let p in plansAndTime) {
                matrix.roration(p, plansAndTime[p]);
            }

            if (typeof cb === "function") {
                cb();
            }
            return;
        }

        let radius = Math.PI / (2 * speed);
        rotationBox.rotateOnAxis(axis, radius);
    }, 100);


}


let randomNum = 0;
let roationRandom = function () {
    randomNum += 1;

    if(randomNum >= 30){
        beginTime();
        return;
    }

    let all = Math.floor(Math.random() * 2) === 0;

    if (all) {
        let index = Math.floor(Math.random() * 4);
        allRotation(index, 5, roationRandom);
    } else {
        let plan = ['top', 'buttom', 'left', 'right', 'front', 'back', 'midh', 'midv'];
        let index = Math.floor(Math.random() * 8);
        rotation(plan[index], 5, roationRandom);
    }
}


let isRotation = false;
/**
 * 事件绑定
 */
let bindEvent = function () {
    var canvas = document.getElementById('canvas-frame');
    var canvasPosition = canvas.getBoundingClientRect();
    var p = document.getElementById("msg");
    let mouseDownX;
    let mouseDownY;
    let moduseDown = false;

    let begin;
    let end;
    canvas.addEventListener('mousedown', function (e) {
        moduseDown = true;
        mouseDownX = e.clientX;
        mouseDownY = e.clientY;

        let x = mouseDownX - canvasPosition.x;
        let y = mouseDownY - canvasPosition.y;
        let box = GetCobeByClickPoint(x, y);
        let correctPositon = correctPosition(box);

        if(correctPositon.length === 3){
            begin = correctPositon;
        }else{
            begin = null;
        }
        console.log(box.point);
    });

    canvas.addEventListener('mouseup', function (e) {
        debugger;
        moduseDown = false;
        mouseUpX = e.clientX;
        mouseUpY = e.clientY;

        if(begin){
            let x = mouseUpX - canvasPosition.x;
            let y = mouseUpY - canvasPosition.y;
            let box = GetCobeByClickPoint(x, y);
            let correctPositon = correctPosition(box);

            if(correctPositon.length === 3){
                end = correctPositon;
            }else{
                begin = null;
                end = null;
            }

            if(begin && end){
                let planAndAnti = getPlanAndAnti(begin, end);
                // alert(`${planAndAnti['plan']} , ${planAndAnti['isAnti']}`);
                if(planAndAnti['plan']){
                    rotation(planAndAnti['plan'], globalSpeed, function(){}, !planAndAnti['isAnti']);
                }
            }
        }




        let allRotationFlag;


        let xDistance = Math.abs(mouseDownX - mouseUpX);
        let yDistance = Math.abs(mouseDownY - mouseUpY);


        if (xDistance > yDistance) {
            allRotationFlag = mouseDownX - mouseUpX < 0 ? 1 : 3;
        } else {
            allRotationFlag = mouseDownY - mouseUpY < 0 ? 2 : 0;
        }

        if (!isRotation && false) {
            isRotation = true;
            allRotation(allRotationFlag, globalSpeed, function () {
                isRotation = false;
            });
        }

    });

    canvas.addEventListener('mousemove', function (e) {
        if (!moduseDown) {
            return;
        }

        let msg = `${e.clientX}, ${e.clientY}`;
        // p.innerHTML = msg;
    });

    document.onmousewheel = function () {
        return false;
    }
    document.addEventListener('mousewheel', function (e) {
        let value;
        let yStep = 40;
        let zStep = 80;

        if (e.wheelDelta) {//IE/Opera/Chrome
            value = e.wheelDelta;
        } else if (e.detail) {//Firefox
            value = e.detail;
        }

        if (value > 0) {
            yStep = -1 * yStep;
            zStep = -1 * zStep;

            if(t.camera.position.y <= 320){
                yStep = 0;
                zStep = 0;
            }
        }else if(t.camera.position.y >= 920){
            yStep = 0;
            zStep = 0;
        }

        t.camera.position.y += yStep;
        t.camera.position.z += zStep;

        // p.innerHTML = `${ t.camera.position.y}, ${t.camera.position.z}`;
    });

    let pre = '';
    document.addEventListener('keydown', function(e){
        if(isRotation){
            return;
        }
        var keyCode = e.keyCode || e.which || e.charCode;
        if(keyCode === 49){
            pre = '1';
        }else if(keyCode === 50){
            pre = '2';
        }else if(keyCode === 51){
            pre = '3'
        }

        
        if(keyCode === 37 || keyCode === 38 || keyCode === 39 || keyCode === 40){
            isRotation = true;
            //整体旋转
            if(pre === ''){
                let allRotationFlag = keyCode - 38 < 0 ? 3 :  keyCode - 38;
                allRotation(allRotationFlag, globalSpeed, () => {
                    isRotation = false;
                });
            }else{
                let rotationInfo = getRotationParam(pre, keyCode);
                if(rotationInfo){
                    rotation(rotationInfo.plan, globalSpeed, ()=>{
                        isRotation = false;
                    }, rotationInfo.isAnti);
                }else{
                    isRotation = false;
                }
            }
        }

    })

    document.addEventListener('keyup', function(e){
        var keyCode = e.keyCode || e.which || e.charCode;
        if(keyCode >= 49 && keyCode <= 51){
            pre = '';
        }
    });
}

/**
 * 根据键盘输入组合， 获取旋转面信息
 * @param {} pre 
 * @param {*} keyCode 
 */
let getRotationParam = function(pre, keyCode){
    if(pre !== '1' && pre !== '2' && pre !== '3'){
        return null;
    }


    if(!(keyCode >= 37 && keyCode <= 40)){
        return null;
    }

    let result = {};
    if(keyCode === 37 || keyCode === 39){
        result.plan = pre === '1' ? 'top' : (pre === '2' ? 'midh' : 'buttom');
        result.isAnti = keyCode === 37 ? false : true;
    }else{
        result.plan = pre === '1' ? 'left' : (pre === '2' ? 'midv' : 'right');
    
        
        if(result.plan === 'left'){
            result.isAnti = keyCode === 40 ? false : true;
        }else{
            result.isAnti = keyCode === 40 ? true : false;
        }
    }

    return result;
}

/**
 * 开启计时器
 */
let timeInterval;
let timeDom = document.getElementById('time');
let beginTime = function(){
    let begin = new Date();
    timeInterval = setInterval(function(){
        let current = new Date();
        let playTime = current - begin;
        let showTimeStr = convertTime(playTime);
        timeDom.innerHTML = showTimeStr;
    }, 1000);
}

/**
 * 将毫秒数转化成可视化的时间字符串
 * @param {} millions 
 */
let convertTime = function(millions){
    let hour = '00';
    let min = '00';
    let second = '00';
    let millionsecond = '000';

    let hourBase = 60 * 60 * 1000;
    if(millions >= hourBase){
        hour = Math.round(millions / hourBase);
        millions -= hour * hourBase;

        if(hour <= 9){
            hour = `0${hour}`;
        }
    }

    let minBase = 60 * 1000;
    if(millions >= minBase){
        min = Math.round(millions / minBase);
        millions -= min * minBase;

        if(min <= 9){
            min = `0${min}`;
        }
    }

    let secondBase = 1000;
    if(millions >= secondBase){
        second = Math.round(millions / secondBase);
        millions -= second * secondBase;

        if(second <= 9){
            second = `0${second}`;
        }
    }

    if(millions >= 100){
        millionsecond = millions;
    }else if(millions < 100 && millions > 9){
        millionsecond = `0${millions}`;
    }else if(millions > 0){
        millionsecond = `00${millions}`;
    }

    let result = `${hour} : ${min} : ${second}`;
    return result;
}

module.exports = function () {
    bindEvent();
    setCamera();
    // initGrid();
    initBox();
    t.beginRender();
    // roationRandom();
    // test();
    // test2();
}
