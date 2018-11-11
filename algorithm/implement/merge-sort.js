/**
* @Author: fiyc
* @Date : 2018-11-11 20:53
* @FileName : merge-sort.js
* @Description : 
    - 归并排序
*/

let sort = function(targetArray){
    let copyArray = [];
    for(let i in targetArray){
        copyArray[i] = targetArray[i];
    }

    targetArray = copyArray;

    mergeSort(targetArray, 0, targetArray.length - 1);
    return targetArray;
}

/**
 * 对目标数组中指定区域进行排序
 * @param {*} targetArray  目标数组
 * @param {*} beginIndex  开始下标
 * @param {*} endIndex  结束下标
 */ 
let mergeSort = function(targetArray, beginIndex, endIndex){
    beginIndex = beginIndex || 0;
    endIndex = endIndex >= targetArray.length ? targetArray.length - 1 : endIndex;

    if(endIndex <= beginIndex){
        return;
    }

    let midIndex = endIndex -  Math.ceil((endIndex - beginIndex) / 2);
    mergeSort(targetArray, beginIndex, midIndex);
    mergeSort(targetArray, midIndex + 1, endIndex);
    merge(targetArray, beginIndex, midIndex, endIndex);
}

/**
 * 对目标数组中指定区域做合并处理
 * 例如
 * merge(A, 0, 4, 7);
 *  A1= [A[0], A[1], A[2], A[3], [A4]];
 *  A2 = [A[5], A[6], A[7]]
 * 然后将A1 与 A2 进行合并
 */
let merge = function(targetArray, beginIndex, midIndex, endIndex){
   if(targetArray[midIndex] <= targetArray[midIndex + 1]){
       return;
   } 

   let arrayLeft = [];
   let leftIndex = 0;
   for(let i=0; i< midIndex - beginIndex + 1; i++){
       arrayLeft[i] = targetArray[beginIndex + i];
   }

   let arrayRight = [];
   let rightIndex = 0;
   for(let i=0; i<endIndex - midIndex; i++){
       arrayRight[i] = targetArray[midIndex + i + 1];
   }

   let leftMax = midIndex - beginIndex;
   let rightMax = endIndex - midIndex - 1;

   let currentAIndex = beginIndex;
   while(leftIndex <= leftMax && rightIndex <= rightMax){
       let copyValue;
        if(arrayLeft[leftIndex] <= arrayRight[rightIndex]){
            copyValue = arrayLeft[leftIndex];
            leftIndex++;
        }else{
            copyValue = arrayRight[rightIndex];
            rightIndex++;
        }

        targetArray[currentAIndex] = copyValue;
        currentAIndex++;
   }

   if(leftIndex <= leftMax){
        for(let i=0; i<=leftMax - leftIndex; i++){
            targetArray[currentAIndex + i] = arrayLeft[leftIndex + i];
        }
   }else{
        for(let i=0; i<=rightMax - rightIndex; i++){
            targetArray[currentAIndex + i] = arrayRight[rightIndex + i];
        }
   }
}

module.exports = sort;