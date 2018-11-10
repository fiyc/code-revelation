/**
* @Author: fiyc
* @Date : 2018-11-09 23:37
* @FileName : random-maker.js
* @Description : 
    - 随机生产工具
*/

/**
 * 生成一个随机整数, 范围是[min, max]
 */
let randomNum = function(min, max){
    let result = Math.round(Math.random() * (max -  min) + min);
    return result;
}


/**
 * 生成一个随机数组
 * @param {*} size  数组长度
 * @param {*} min 数组内数字最小值
 * @param {*} max 数组内数字最大值
 */
let randomArray = function(size, min, max){
    let result = [];
    for(let i=0; i<size; i++){
        result.push(randomNum(min, max));
    }    
    return result;
}

module.exports = {
    randomNum,
    randomArray
}