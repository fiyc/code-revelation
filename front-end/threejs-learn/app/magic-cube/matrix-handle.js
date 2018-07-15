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
        clockWiseRotation(topIndexs);
        clockWiseRotation(edgeIndexs);
    }
}

/**
 * 计算与模型相对的x轴正方向真实指向的向量
 * 这个函数式由于我发现在threejs中, 模型建立以后，它所对应的xyz轴并不会因为旋转儿改变， 因此这就会导致多次旋转由于xyz轴问题变化而错误
 * 因此这里为模型添加一个指向它真实对应的x轴的方向，来为后续的旋转提供依据
 * @param {*} current {currentAxis: 当前所在轴0:x 1:y 2:z， currentDirection: []}
 * @param {*} target 相对于真实坐标系的向量
 */
let convertLook = function(current, target){
    //如果目标旋转的向量与当前方位在同一个轴, 那么指向的轴不会发生改变
    if(target[current.currentAxis] !=0){
        return current;
    }

    /**
     * 获得相对于当前向量 与之对应的Y轴
     * 这里的Y轴并非是真实坐标中的Y轴，应该理解成，将当前轴看做是真实坐标中的X轴时, 对应的Y轴是哪一个
     * 比如在真实情况下
     *  对于x轴来说， y轴即是它的y轴
     *  对于y轴来说, z轴即是它的y轴
     *  对于z轴来说, x轴即是它的y轴
     *  可以通过转化坐标来理解这一段话
     */
    let relativeY = current.currentAxis + 1 === 3 ? 0 : current.currentAxis + 1;
    let relativeZ = current.currentAxis - 1 < 0 ? 2 : current.currentAxis - 1;

    let finalAxis;
    let value;
    
    if(target[relativeY] != 0){
        /**
         * 这里说明是根据当前轴相对的Y轴进行了旋转
         * 在这种情况下，可以知道我们的最终目标轴肯定会是相对于当前轴的z轴
         * x*z = y
         * x*y = -z
         */
         value = target[relativeY] * current.currentDirection[current.currentAxis] * (-1);
         finalAxis = relativeZ;
    }else{
        /**
         * 这里说明是根据当前轴相对的Z轴进行旋转
         * 在这种情况下，可以知道我们的最终目标轴肯定会是相对于当前轴的Y轴
         */
        value = target[relativeZ] * current.currentDirection[current.currentAxis];
        finalAxis = relativeY;
    }

    current.currentAxis = finalAxis;
    current.currentDirection = [0,0,0];
    current.currentDirection[finalAxis] = value;
    return current;
}

/**
 * 根据当前模型指向的X轴对应真实坐标系中的轴位置, 将目标旋转轴转换成对应模型的旋转轴
 * @param {*} current 
 * @param {*} target 
 */
let realAxis = function(current, target){

    //真实坐标旋转轴与当前轴为同一个轴
    if(current.currentAxis === 0){
        let isReverse = current.currentDirection[0] < 0;
        target[current.currentAxis] = current.currentDirection[current.currentAxis] * target[current.currentAxis] * (-1);
        return target;
    }


}

module.exports = {
    setPoint: function(points){
        allPoint = points;
    },
    getPoint: function(plan){
        let result = [];
        let pointIndexs = planIndexs[plan];
        for(let index in pointIndexs){
            result.push(allPoint[pointIndexs[index]]);
        }
        return result;
    },
    roration
}

