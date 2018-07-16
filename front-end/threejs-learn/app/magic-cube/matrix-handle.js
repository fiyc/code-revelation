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
    front: {points: [0, 1, 2, 3, 4, 5, 6, 7, 8], vector: [0, 0, -1]},
    back: {points: [20, 19, 18, 23, 22, 21, 26, 25, 24], vector: [0, 0, 1]},
    left: {points: [18, 9, 0, 21, 12, 3, 24, 15, 6], vector: [1, 0, 0]}, 
    right: {points: [2, 11, 20, 5, 14, 23, 8, 17, 26], vector: [-1, 0, 0]},
    top: {points: [18, 19, 20, 9, 10, 11, 0, 1, 2], vector: [0, -1, 0]}, 
    buttom: {points: [24, 25, 26, 15, 16, 17, 6, 7, 8],  vector: [0, -1, 0]},
    //中间水平层
    midh: {points: [21,22,23,12,13,14,3,4,5], vector: [0, -1, 0]},
    //中间垂直层
    midv: {points:[1,10,19,4,13,22,7,16,25], vector: [-1, 0, 0]}

}

/**
 * 给定四个位于总一维数组中的点序列， 按照点顺序置换
 * 例： [1, 2, 3, 4] 将置换为 [4, 1, 2, 3], 这里的1,2,3,4指代长度为27的一维数组的下标
 * @param {*} indexs 长度为4的数组, 指代总一维数组中的下标
 */
let clockWiseRotation = function (indexs) {
    let temp = allPoint[indexs[3]];

    let initPosition = [];
    for (let i = 0; i < 4; i++){
        let currentIndex = indexs[i];
        let currentPoint = allPoint[currentIndex];
        let currentX = currentPoint.position.x;
        let currentY = currentPoint.position.y;
        let currentZ = currentPoint.position.z;
        initPosition.push([currentX, currentY, currentZ]);
    }

    for (let i = 0; i < 4; i++) {
        let currentIndex = indexs[i];
        let currentTemp = allPoint[currentIndex];
        temp.position.x = initPosition[i][0];
        temp.position.y = initPosition[i][1];
        temp.position.z = initPosition[i][2];
        allPoint[currentIndex] = temp;
        temp = currentTemp;
    }

}

/**
 * 指定一个面进行旋转
 * @param {} plan 面: front, back, left, right, top, buttom
 * @param {*} num 顺时针旋转90度的次数
 */
let roration = function (plan, num) {
    // debugger;
    num = num % 4;

    let currentPlan = planIndexs[plan].points;
    //当前面的四个顶角在一维数组中对应的序列
    let topIndexs = [];
    for (let i = 0; i < 4; i++) {
        topIndexs.push(currentPlan[topAngles[i]]);
    }

    let edgeIndexs = [];
    for (let i = 0; i < 4; i++) {
        edgeIndexs.push(currentPlan[edgeAngels[i]]);
    }


    for (let n = 0; n < num; n++) {
        clockWiseRotation(topIndexs);
        clockWiseRotation(edgeIndexs);
    }
}

/**
 * 获取指定面顺时针旋转的向量
 * @param {*} plan 
 */
let getVecotrByPlan = function(plan){
    return planIndexs[plan].vector;
}


let Coordinate = function () {
    this.x = [1, 0, 0];
    this.y = [0, 1, 0];
    this.z = [0, 0, 1];

    /**
     * 获取相对于当前模型，真实的旋转向量
     * @param {*} target 真实坐标系中，旋转围绕的向量
     */
    this.convertVector = function (target) {
        let result;
        let realRorationAxis;
        let realRotationValue;
        for (let i = 0; i < 3; i++) {
            if (target[i] != 0) {
                realRorationAxis = i;
                realRotationValue = target[i];
                break;
            }
        }

        if (this.x[realRorationAxis] != 0) {
            let relativeValue = realRotationValue * this.x[realRorationAxis];
            result = [relativeValue, 0, 0];
        }

        if (this.y[realRorationAxis] != 0) {
            let relativeValue = realRotationValue * this.y[realRorationAxis];
            result = [0, relativeValue, 0];
        }

        if (this.z[realRorationAxis] != 0) {
            let relativeValue = realRotationValue * this.z[realRorationAxis];
            result = [0, 0, relativeValue];
        }

        this.convertRelativeXYZ(result);
        return result;
    }

    /**
     * 计算旋转之后， 当前模型相对的xyz轴在真实坐标系中的对应
     * @param {*} relativeVecotr 
     */
    this.convertRelativeXYZ = function (relativeVecotr) {
        /**
         * 这里首先做一个定义
         * 当我们把x正轴作为基准轴时， y正轴是它的上位轴，z正轴时它的下位值
         * 以此类推:
         *  当我们把y正轴作为基准轴时， z正轴是它的上位轴，x正轴时它的下位值
         *  当我们把z正轴作为基准轴时， x正轴是它的上位轴，y正轴时它的下位值
         * 
         *  然后思考空间坐标系，可以发现
         *  当绕基准轴旋转， 上位轴的位置会变到下位轴， 下位轴位置变到上位轴的反方向
         *  当绕基准轴反方向旋转， 上位轴的位置会变到下位轴反方向， 下位轴位置变到上位轴
         */

        let threeAxis = [this.x, this.y, this.z];

        //这里获取旋转相对的基准轴以及值
        let baseAxisIndex;
        let baseAxisValue;
        for (let i = 0; i < 3; i++) {
            if (relativeVecotr[i] != 0) {
                baseAxisIndex = i;
                baseAxisValue = relativeVecotr[i];
                break;
            }
        }

        //上位轴在threeAxis中的下标
        let upperIndex = baseAxisIndex === 2 ? 0 : baseAxisIndex + 1;
        //下位轴在threeAxis中的下标
        let lowIndex = baseAxisIndex === 0 ? 2 : baseAxisIndex - 1;

        let upperAxis = threeAxis[upperIndex];
        let lowAxis = threeAxis[lowIndex];

        let tempUpperAxis = [];
        let tempLowAxis = [];
        if (baseAxisValue > 0) {
            //上位轴方向变到下位轴所在方向
            tempUpperAxis[0] = lowAxis[0];
            tempUpperAxis[1] = lowAxis[1];
            tempUpperAxis[2] = lowAxis[2];
            //下位轴方向变到上位轴的反方向

            tempLowAxis[0] = -1 * upperAxis[0];
            tempLowAxis[1] = -1 * upperAxis[1];
            tempLowAxis[2] = -1 * upperAxis[2];
        } else {
            //上位轴方向变到下位轴的反方向
            tempUpperAxis[0] = -1 * lowAxis[0];
            tempUpperAxis[1] = -1 * lowAxis[1];
            tempUpperAxis[2] = -1 * lowAxis[2];

            //下位轴方向变到上位轴
            tempLowAxis[0] = upperAxis[0];
            tempLowAxis[1] = upperAxis[1];
            tempLowAxis[2] = upperAxis[2];
        }

        for (let i = 0; i < 3; i++) {
            threeAxis[upperIndex][i] = tempUpperAxis[i];
            threeAxis[lowIndex][i] = tempLowAxis[i];
        }

    }
}

/**
 * 判断魔方是否正确归位
 */
let isFinish = function(){
    let result = true;
    for(let i=0; i<26; i++){
        let current = allPoint[i].coordinate;
        let next = allPoint[i+1].coordinate;

        if(!isSameVector(current.x, next.x) || !isSameVector(current.y, next.y) || !isSameVector(current.z, next.z)){
            result = false;
            break;
        }
    }

    return result;
}

let isSameVector = function(base, target){
    let result = true;
    for(let i=0; i<3; i++){
        if(base[i] !== target[i]){
            result = false;
            break;
        }
    }

    return result;
}

module.exports = {
    setPoint: function (points) {
        allPoint = points;
    },
    getPoint: function (plan) {
        if(!plan){
            return allPoint;
        }

        let result = [];
        let pointIndexs = planIndexs[plan].points;
        for (let index in pointIndexs) {
            result.push(allPoint[pointIndexs[index]]);
        }
        return result;
    },
    roration,
    Coordinate,
    getVecotrByPlan,
    isFinish,
    printIndex: function (plan) {
        if (plan) {
            for (let index in planIndexs[plan].points) {
                let item = planIndexs[plan].points[index];
                console.log(allPoint[item].initIndex);
                console.log(allPoint[item].position);
            }
        }else{
            console.log(allPoint[item].initIndex);
            console.log(allPoint[item].position);
        }
        
    }
}

