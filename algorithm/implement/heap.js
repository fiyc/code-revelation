/**
* @Author: fiyc
* @Date : 2018-11-25 01:43
* @FileName : heap.js
* @Description : 
    - 堆排序
*/

/**
 * 获取堆中, 目标节点的父节点序号
 */
let parent = function(i){
    return Math.floor((i + 1) / 2);
}

/**
 * 获取堆中, 目标节点的左子节点
 * @param {*} i 
 */
let left = function(i){
    return 2 * i + 1;
}

/**
 * 获取堆中, 目标节点的右子节点
 * @param {*} i 
 */
let right = function(i){
    return 2 * (i+1)
}


/**
 * 以i为根节点, 且确定它的子节点为最[大/小]堆, 构建一个最[大/小]堆
 * @param {*} a  目标数组
 * @param {*} i  目标根节点
 * @param {*}flag 区分最大/小堆, 1:  最大堆  -1 最下堆
 */
let makeHeapify = function(a, i, flag){
    flag = flag || 1;
    let leftIndex = left(i);    
    let rightIndex = right(i);

    let exchangeIndex = i;
    if(leftIndex < a.heapSize && (a[leftIndex] - a[exchangeIndex]) * flag > 0 ){
        exchangeIndex = leftIndex;
    }

    if(rightIndex < a.heapSize && (a[rightIndex] - a[exchangeIndex]) * flag > 0){
        exchangeIndex = rightIndex;
    }

    if(exchangeIndex !== i){
        let temp = a[i];
        a[i] = a[exchangeIndex];
        a[exchangeIndex] = temp; 

        makeHeapify(a, exchangeIndex, flag);
    }
}

/**
 * 将一个数组构造成一个最[大/小] 堆
 * @param {*} a  目标数组
 * @param {*} flag 区分最大/小堆, 1:  最大堆  -1 最下堆 
 */
let buildHeap = function(a, flag){
    if(a.length < 2){
        return a;
    }

    a.heapSize = a.length;
    let maxParentIndex = Math.floor(a.length / 2) - 1;
    for(let i=maxParentIndex; i >= 0; i--){
       makeHeapify(a, i, flag); 
    }

    return a;
}

/**
 * 排序
 * @param {*} a 目标数组
 * @param {*} flag  排序规则 1: 升序 -1 降序
 */
let sort = function(a, flag){
    a = buildHeap(a, flag);
    for(let i=a.length - 1; i >= 0; i--){
        let temp = a[0];
        a[0] = a[i];
        a[i] = temp;
        a.heapSize -= 1;
        makeHeapify(a, 0, flag);
    }

    return a;
}

let testArray = [27, 17, 3, 16, 13, 10, 1, 5, 7, 12, 4, 8, 9, 0];
let sortResult = sort(testArray, -1);

module.exports = function(targetArray){
    let copyArray = [];
        for(let i in targetArray){
            copyArray[i] = targetArray[i];
        }

    targetArray = copyArray;
    return sort(targetArray, 1);
}