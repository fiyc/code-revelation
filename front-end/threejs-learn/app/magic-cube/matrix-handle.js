/**
* @Author: fiyc
* @Date : 2018-07-13 11:25
* @FileName : matrix-handle.js
* @Description : 
    - 魔方旋转模型
    - 思路：
        - 先将魔方看成是一个三维数组
        - 将数组拉平成一维数组, 长度为27
        - 当旋转魔方时, 获取旋转的那个面对于在数组中的index, 对这一面的index进行替换
*/



//代表27个点的一维数组
let allPoint = [];

//当旋转某一面时, 顶角对应的序列， 由左上角开始， 顺时针排序
const topAngles = [0, 2, 8, 6];
//当旋转某一面时, 棱角对应的序列， 由上棱角开始， 顺时针排序
const edgeAngels = [1, 5, 7, 3];

//各个面对应的总一维数组中下标
const planIndexs = {
    front : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    back : [20, 19, 18, 23, 22, 21, 26, 25, 24],
    left : [18, 9, 0, 21, 12, 3, 24, 15, 6],
    right : [2, 11, 20, 5, 14, 23, 8, 17, 26],
    top : [18, 19, 20, 9, 10, 11, 0, 1, 2],
    buttom : [6, 7, 8, 15, 16, 17, 24, 25, 26]
}

/**
 * 给定四个位于总一维数组中的点序列， 按照点顺序置换
 * 例： [1, 2, 3, 4] 将置换为 [4, 1, 2, 3], 这里的1,2,3,4指代长度为27的一维数组的下标
 * @param {*} indexs 长度为4的数组, 指代总一维数组中的下标
 */
let clockWiseRotation = function(indexs){
    let temp = allPoint[indexs[3]];
    for(let i=0; i<4; i++){
        let currentIndex = indexs[i];
        let currentTemp = allPoint[currentIndex];
        allPoint[currentIndex] = temp;
        temp = currentTemp;
    }
}

/**
 * 指定一个面进行旋转
 * @param {} plan 面: front, back, left, right, top, buttom
 * @param {*} num 顺时针旋转90度的次数
 */
let roration = function(plan, num){
    num = num % 4;

    let currentPlan = planIndexs[plan];
    //当前面的四个顶角在一维数组中对应的序列
    let topIndexs = [];
    for(let i=0; i<4; i++){
        topIndexs.push(currentPlan[topAngles[i]]);
    }

    let edgeIndexs = [];
    for(let i=0; i<4; i++){
        edgeIndexs.push(currentPlan[edgeAngels[i]]);
    }


    for(let n = 0; n < num; n++){
        clockWiseRotation(realIndexs);
        clockWiseRotation(edgeIndexs);
    }
}

module.exports = {
    setPoint = function(points){
        allPoint = points;
    },
    roration
}