/**
* @Author: fiyc
* @Date : 2018-11-21 16:01
* @FileName : p004.js
* @Description : 
    - leetcode 4
    - 寻找两个有序数组的中位数
*/


let findMedianSortedArrays = function(nums1, nums2) {
    let cutArray = nums1.length < nums2.length ? nums1 : nums2;
    let baseArray = nums1.length >= nums2.length ? nums1 : nums2;

    let cutIndexA = undefined;
    let cutIndexB = undefined;

    let currentBegin = 0;
    let currentEnd = cutArray.length;
    while(cutIndexA === undefined || cutIndexB === undefined){
        cutIndexA = Math.floor((currentEnd - currentBegin) / 2) + currentBegin;
        let checkResult = isSuitableCutIndex(cutArray, baseArray, cutIndexA);
        if(checkResult.success){
            cutIndexB = checkResult.index;
        }else{
            if(checkResult.index > 0){
                currentBegin = cutIndexA + 1;
            }else{
                currentEnd = cutIndexA - 1;
            }
        }
    }

    let finalLeftLength = cutIndexA + cutIndexB;
    let finalRightLength = nums1.length + nums2.length - finalLeftLength;

    let leftMax = 0;
    if(cutIndexA === 0){
        leftMax = baseArray[cutIndexB - 1];
    }else if(cutIndexB === 0){
        leftMax = cutArray[cutIndexA - 1];
    }else{
        leftMax = baseArray[cutIndexB - 1] > cutArray[cutIndexA - 1] ? baseArray[cutIndexB - 1] : cutArray[cutIndexA - 1];
    }

    let rightMin = 0;
    if(cutIndexA === cutArray.length){
        rightMin = baseArray[cutIndexB];
    }else if(cutIndexB === baseArray.length){
        rightMin = cutArray[cutIndexA];
    }else{
        rightMin = baseArray[cutIndexB] < cutArray[cutIndexA] ? baseArray[cutIndexB] : cutArray[cutIndexA];
    }

    if(finalLeftLength === finalRightLength){
        return (leftMax + rightMin) / 2;
    }else if(finalLeftLength > finalRightLength){
        return leftMax;
    }else{
        return rightMin;
    }
    
};


/**
 * cutArray 与 baseArray 是按照升序排列的两个数组
 * cutArray的分割点范围为[0, cutArray.length] 将cutArray分割为左右两部分 cl cr
 * 根据cutArray的分割点, baseArray也将被分割成左右两部分 bl br
 * 分割需要满足以下几个要求
 *  1. | (cl.length + bl.length) - (cr.length + br.length) | <= 1;
 *  2. 如果 cutIndex = 0, 则 cr[0] >= bl[bl.length-1]
 *  3. 如果 cutIndex = cutArray.length, 则 cl[cl.length - 1] <= br[0]
 *  4. 如果 0 < cutIndex < cutIndex.length, 则 cl[cl.length - 1] <= br[0] 且 cr[0] >= bl[br.length - 1]
 *
 * 如果cutIndex 满足上述要求, 则返回baseArray 对应的分割点, 否则返回偏移方向(1, -1)
 * @param {*} cutArray 
 * @param {*} baseArray 
 * @param {*} cutIndex 
 */
let isSuitableCutIndex = function(cutArray, baseArray, cutIndex){
    let result = {
        success : false,
        index: 0
    };

    let cl = cutArray.slice(0, cutIndex);
    let cr = cutArray.slice(cutIndex);

    let clLength = cutIndex;

    let isEven = (cutArray.length + baseArray.length) % 2 === 0;

    let guessCutIndexB = [];
    if(isEven){
        cutIndexB = (baseArray.length + cutArray.length) / 2 - clLength;
        guessCutIndexB.push(cutIndexB);
    }else{
        cutIndexB = (baseArray.length + cutArray.length - 1) /2 -clLength;
        guessCutIndexB.push(cutIndexB);
        guessCutIndexB.push(cutIndexB+1);
    }

    for(let index of guessCutIndexB){
        let bl = baseArray.slice(0, index);
        let br = baseArray.slice(index);
        
        // max(cl) 与 min(br) 比较
        if(cl.length !== 0 && br.length !== 0){
            if(cl[cl.length - 1] > br[0]){
                result.success = false;
                result.index = -1;
                continue;
            }
        }
        

        // min(cr) 与 max(bl) 比较
        if(cr.length !== 0 && bl.length !== 0){
            if(cr[0] < bl[bl.length - 1]){
                result.success = false;
                result.index = 1;
                continue;
            }
        }
       
        result.success = true;
        result.index = index;
        return result;
    }

    return result;
}

console.log(findMedianSortedArrays([1, 2], [3, 4]));