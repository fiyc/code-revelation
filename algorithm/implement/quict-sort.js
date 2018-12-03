/**
* @Author: fiyc
* @Date : 2018-12-03 15:37
* @FileName : quict-sort.js
* @Description : 
    - 快速排序
*/


let sort = function(targetArray){
    let copyArray = [];
        for(let i in targetArray){
            copyArray[i] = targetArray[i];
        }

    targetArray = copyArray;
    quickSort(targetArray, 0, targetArray.length - 1);
    return targetArray;
}

let quickSort = function(targetArray, begin, end){
    if(begin < end){
        let mid = randomPartition(targetArray, begin, end);
        quickSort(targetArray, begin, mid - 1);
        quickSort(targetArray, mid + 1, end);
    }
}

let partition = function(targetArray, begin, end){
    let midValue = targetArray[end];

    let startIndex = begin;
    for(let i=begin; i < end; i++){
        let currentCompareValue = targetArray[i];
        if(currentCompareValue < midValue){
            let temp = targetArray[startIndex];
            targetArray[startIndex] = targetArray[i];
            targetArray[i] = temp;
            startIndex++;
        }
    }

    let temp = targetArray[startIndex];
    targetArray[startIndex] = midValue;
    targetArray[end] = temp;
    return startIndex;
}

let randomPartition = function(targetArray, begin, end){
    let index = Math.round((Math.random() * (end - begin) + begin));
    let t = targetArray[end];
    targetArray[end] = targetArray[index];
    targetArray[index] = t;

    let midValue = targetArray[end];

    let startIndex = begin;
    for(let i=begin; i < end; i++){
        let currentCompareValue = targetArray[i];
        if(currentCompareValue < midValue){
            let temp = targetArray[startIndex];
            targetArray[startIndex] = targetArray[i];
            targetArray[i] = temp;
            startIndex++;
        }
    }

    let temp = targetArray[startIndex];
    targetArray[startIndex] = midValue;
    targetArray[end] = temp;
    return startIndex;
}

module.exports = sort;
