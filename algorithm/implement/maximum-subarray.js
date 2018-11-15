/**
* @Author: fiyc
* @Date : 2018-11-15 15:43
* @FileName : maximum-subarray.js
* @Description : 
    - 最大子数组问题
    - 从一个给定数组中, 找出一段连续的子数组, 使得其和最大
*/


let randomMaker = require('../common/random-maker');

let find = function(targetArray, lowIndex, highIndex){
    if(highIndex < lowIndex){
        console.log("[-] 计算出错");
        return;
    }

    if(highIndex == lowIndex){
        return {
            beginIndex: lowIndex,
            endIndex: highIndex,
            value: targetArray[lowIndex]
        }
    }

    let midIndex = Math.floor((highIndex - lowIndex) / 2) + lowIndex;
    
    let leftRe = find(targetArray, lowIndex, midIndex);
    let rightRe = find(targetArray, midIndex + 1, highIndex);
    let crossRe = maximumCrossSubarray(targetArray, lowIndex, highIndex, midIndex);

    if(leftRe.value >= rightRe.value && leftRe.value >= crossRe.value){
        return leftRe;
    }else if(rightRe.value >= leftRe.value && rightRe.value >= crossRe.value){
        return rightRe;
    }else{
        return crossRe;
    }
}

/**
 * 计算一个数组中, 一个在经过midIndex 的最大子数组
 * @param {*} targetArray 
 * @param {*} lowIndex 
 * @param {*} highIndex 
 */
let maximumCrossSubarray = function(targetArray, lowIndex, highIndex, midIndex){
    let leftMax = undefined;
    let leftMaxIndex = midIndex;
    let currentSum = 0;
    for(let i=midIndex; i >= lowIndex; i--){
        currentSum += targetArray[i];

        if(leftMax === undefined || currentSum > leftMax){
            leftMax = currentSum;
            leftMaxIndex = i;
        }
    }


    let rightMax = undefined;
    let rightMaxIndex = midIndex;
    currentSum = 0;
    for(let i=midIndex; i <= highIndex; i++){
        currentSum += targetArray[i];

        if(rightMax === undefined || currentSum > rightMax){
            rightMax = currentSum;
            rightMaxIndex = i;
        }
    }

    let value = leftMax + rightMax - targetArray[midIndex];
    return {
        beginIndex: leftMaxIndex,
        endIndex: rightMaxIndex,
        value: value 
    }
}

module.exports = function(targetArray){
    return find(targetArray, 0, targetArray.length);
}
