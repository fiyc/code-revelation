/**
* @Author: fiyc
* @Date : 2018-07-18 18:18
* @FileName : matrix-util.js
* @Description :   
    通用的3d魔方转换工具
*/

let config = require('./config');

/**
 * 初始化函数
 * @param orderNum 魔方阶数
 */
let init = function(orderNum){
    orderNum = orderNum || config.orderNum;

    /**
     * 通过阶数，构造一个模拟正方体对应的数组
     * 这里的目的是为了之后在做面旋转时, 可以很方便的从目标数组中找到所旋转面对应的序列
     */
    let mappingMarix = [];
    let init3DModule = function(){

        /**
         * 构造一个长度为 orderNum * orderNum * orderNum 的一维数组, 其代表真实的三维数组拉平后的产物
         * 数组中每一项都包含一个长度为3的的数组
         * 0: 代表这一模型在x轴正方向上的序列, 初始值为0, 越后面值越大
         * 1: 代表这一模型在y轴正方向上的序列, 初始值为0, 越后面值越大
         * 2: 代表这一模型在z轴正方向上的序列, 初始值为0, 越后面值越大
         */
        for(let z=0; z < orderNum; z++){
            for(let y=0; y<orderNum; y++){
                for(let x=orderNum - 1; x >= 0; x--){
                   mappingMarix.push([x, y, z]); 
                }
            }
        }

    }

    init3DModule();


    /**
     * 从入参传入的模型集合中，找出给定的面所对应的模型，并返回.
     * @param targets 目标模型集合, 该模型长度应该为 orderNum * orderNum * orderNum
     * @param planInfo 面描述信息 例如: {directory: 0, index: 0}
     *         - @param directory 指明是从哪个视角观看, 0：x轴正方向指向眼睛   1: y轴   2: z轴
     *         - @param index 最靠近自己的一面为0 依次往后追加
     * 
     */
    let getTargetPlanBoxs = function(targets, planInfo){
        let result = [];
        if( !targets || targets.length !== ( orderNum * orderNum * orderNum )){
            return result;
        }

        /**
         * 由于已经构建了对应真实模型数组, 且已知道是从哪个轴的视角寻找面, 也知道了序号是多少
         * 因此只需要遍历数组, 找到数组中模型信息数组中第 directory 位的值为 index 的模型, 获得对应数组中的下标, 这个下标在targets中对应的模型需要返回
         */
        let mappingResult = [];
        for(let index=0; index<targets.length; index++){
            let mappingMarixInfo = mappingMarix[index];
            if(mappingMarixInfo[planInfo.directory] === planInfo.index){
                mappingResult.push({
                    index: index,
                    mappingPositionInfo: mappingMarixInfo
                });
            }
        }

        /**
         * 对结果进行排序
         * 当按照x轴 寻找面时, 需要比较 z 与 y的序列. 优先比较y的大小, 小的排前面, 然后比较z的大小, 小的排前面
         * 当按照y轴 寻找面时, 需要比较 x 与 z的序列. 优先比较z的大小, 大的排前面, 然后比较x的大小, 大的排前面
         * 当按照z轴 寻找面时, 需要比较 x 与 y的序列. 优先比较y的大小, 小的排前面, 然后比较x的大小, 大的排前面
         */
        if(planInfo.directory === 0){
            mappingResult = mappingResult.sort(function(a, b){
                let infoA = a.mappingPositionInfo;
                let infoB = b.mappingPositionInfo;

                if(infoA[1] < infoB[1]){
                    return -1;
                }

                if(infoA[1] > infoB[1]){
                    return 1;
                }

                if(infoA[2] < infoB[2]){
                    return -1;
                }else{
                    return 1;
                }
            });

        }else if(planInfo.directory === 1){
            mappingResult = mappingResult.sort(function(a, b){
                let infoA = a.mappingPositionInfo;
                let infoB = b.mappingPositionInfo;

                if(infoA[2] > infoB[2]){
                    return -1;
                }

                if(infoA[2] < infoB[2]){
                    return 1;
                }

                if(infoA[0] > infoB[0]){
                    return -1;
                }else{
                    return 1;
                }
            });
        }else{
            mappingResult = mappingResult.sort(function(a, b){
                let infoA = a.mappingPositionInfo;
                let infoB = b.mappingPositionInfo;

                if(infoA[1] < infoB[1]){
                    return -1;
                }

                if(infoA[1] > infoB[1]){
                    return 1;
                }

                if(infoA[0] < infoB[0]){
                    return 1;
                }else{
                    return -1;
                }
            });
        }

        //使用排序过后的模型集合的序列去目标集合中找到对应的返回值
        for(let i in mappingResult){
            let targetIndex = mappingResult[i].index;
            result.push(targets[targetIndex]);
        }

        return result;
    }


    /**
     * 对入参传入的模型集合进行旋转
     * @param {*} targets 目标模型集合
     * @param {*} planInfo 面描述信息
     * @param {*} isAnti 是否逆时针旋转
     * @param {*} singleMapFn 每一个模型自身在旋转时对应的逻辑回调函数, 将会传入 当前模型, 旧模型, 模型旋转全局向量数组
     */
    let rotationPlan = function(targets, planInfo, isAnti, singleMapFn){
        let result = [];
        let targetPlanBoxes = getTargetPlanBoxs(targets, planInfo);
        if( !targetPlanBoxes || targetPlanBoxes.length === 0 ){
            return result;
        }

        /**
         * 将得到的这一个面的模型,构造成一个 二维数组, 每个数组长度为 orderNum
         * 然后将这个二维数组翻转
         */
        let tempArray = [];
        let currentBoxIndex = 0;
        for(let row = 0; row < orderNum; row++){
            let currentRow = [];
            for(let column = 0; column < orderNum; column ++){
               currentRow.push( targetPlanBoxes[currentBoxIndex] );
               currentBoxIndex += 1;
            }

            tempArray.push(currentRow);
        }

        if(!isAnti){
            for(let row = 0; row < orderNum; row ++){
             for(let column = 0; column < orderNum; column++){
                 result.push(tempArray[orderNum - 1 - column][row]);
             }
         }
       }else{
            for(let row = 0; row < orderNum; row ++){
             for(let column = 0; column < orderNum; column++){
                 result.push(tempArray[column][orderNum - 1 - row]);
             }
         }
       }

       if(singleMapFn && typeof singleMapFn === "function"){
            let globalVector = [0, 0, 0];
            globalVector[planInfo.directory] = isAnti ? 1 : -1;
            for(let index = 0; index < targets.length; index++){

                singleMapFn(result[index], targets[index], globalVector);
            }
       }

       return result;
    }


    return {
        getTargetPlanBoxs,
        rotationPlan
    };



}



module.exports = init;