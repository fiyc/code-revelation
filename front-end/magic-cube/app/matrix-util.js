/**
* @Author: fiyc
* @Date : 2018-07-18 18:18
* @FileName : matrix-util.js
* @Description :   
    通用的3d魔方转换工具
*/

/**
 * 初始化函数
 * @param orderNum 魔方阶数
 */
let init = function(orderNum){

    /**
     * 通过阶数，构造一个模拟正是正方体对应的数组
     * 这里的目的是为了之后在做面旋转时, 可以很方便的从目标数组中找到所旋转面对应的序列
     */
    let mappingMarix = null;
    let init3DModule = function(){

    }


    /**
     * 从入参传入的模型集合中，找出给定的面所对应的模型，并返回
     * @param targets 目标模型集合, 该模型长度应该为 orderNum * orderNum * orderNum
     * @param planInfo 面描述信息 例如: {directory: 0, index: 0}
     *         - @param directory 指明是从哪个视角观看, 0：x轴正方向指向眼睛   1: y轴   2: z轴
     *         - @param index 最靠近自己的一面为0 依次往后追加
     * 
     */
    let getTargetPlanBoxs = function(targets, planInfo){

    }


    /**
     * 对入参传入的模型集合进行旋转
     * @param {*} targets 目标模型集合
     * @param {*} planInfo 面描述信息
     * @param {*} isAnti 是否逆时针旋转
     * @param {*} replaceMapFn 当旋转过后， 模型交替位置逻辑处理函数, function(old, new ){}
     * @param {*} singleMapFn 每一个模型自身在旋转时对应的逻辑
     */
    let rotationPlan = function(targets, planInfo, isAnti, replaceMapFn, singleMapFn){

    }


    return {
        getTargetPlanBoxs,
        rotationPlan
    };



}



module.exports = init;