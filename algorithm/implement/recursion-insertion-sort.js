/**
* @Author: fiyc
* @Date : 2018-11-11 23:46
* @FileName : recursion-insertion-sort.js
* @Description : 
    - 插入排序, 递归写法
    - 算法导论 练习 2.3-4
*/

let sort = function(targetArray){
    if(targetArray.length === 1){
        return targetArray;
    }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   

    return insert(sort(targetArray.slice(0, -1)), targetArray[targetArray.length - 1]);
}

/**
 * 将值按照递增的排序方式 插入指定的数组中, 返回一个新的数组
 * @param {*} targetArray 
 * @param {*} value 
 */
let insert = function(targetArray, value){
    let targetIndex = findIndex(targetArray, value, 0, targetArray.length - 1);
    if(targetIndex < 0){
        targetIndex = 0;
    }

    return targetArray.slice(0, targetIndex).concat([value]).concat(targetArray.slice(targetIndex));
}

/**
 * 
 * @param {*} targetArray 
 * @param {*} value 
 */
let findIndex = function(targetArray, value, beginIndex, endIndex){
    if(endIndex === beginIndex){
        let matchValue = targetArray[beginIndex];
        if(value <= matchValue){
            return beginIndex ;
        }else{
            return beginIndex + 1;
        }
    }

    let midIndex = Math.floor((endIndex - beginIndex) / 2 ) + beginIndex;

    if(value === targetArray[midIndex]){
        return midIndex;
    }

    if(value < targetArray[midIndex]){
        return findIndex(targetArray, value, beginIndex, midIndex);
    }else{
        return findIndex(targetArray, value, midIndex + 1, endIndex);
    }
}

module.exports = sort;

