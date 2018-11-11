/**
* @Author: fiyc
* @Date : 2018-11-12 00:29
* @FileName : insertion-sort-v2.js
* @Description : 
    - 插入排序改进
*/

let sort = function(targetArray){
    let copyArray = [];
        for(let i in targetArray){
            copyArray[i] = targetArray[i];
        }

    targetArray = copyArray;

    for(let currentIndex = 1; currentIndex < targetArray.length; currentIndex++){
        let temp = targetArray[currentIndex];

        let targetIndex = findIndex(targetArray, temp, 0, currentIndex - 1);
        for(let i=currentIndex; i> targetIndex; i--){
            targetArray[i] = targetArray[i - 1];
        }

        targetArray[targetIndex] = temp;
    }

    return targetArray;
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