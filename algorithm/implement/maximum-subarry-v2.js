/**
* @Author: fiyc
* @Date : 2018-11-15 16:43
* @FileName : maximum-subarry-v2.js
* @Description : 
    - 最大子数组问题
    - 练习 4.1-5
*/

let find = function(targetArray){
    let currentBegin = 0;
    let currentEnd = 0;


    let maxValue = targetArray[0];
    let accumulateValue = targetArray[0];
    let accumulateBegin = 0;
    let accumulateEnd = 0;

    for(let i=0; i<targetArray.length; i++){
        if(accumulateValue < 0){
            accumulateValue = 0;
            accumulateBegin = i;
            accumulateEnd = i;
        }

        accumulateValue += targetArray[i];
        if(accumulateValue > maxValue){
            maxValue = accumulateValue;
            currentBegin = accumulateBegin;
            currentEnd = accumulateEnd;
        }
    }

    return {
        beginIndex: currentBegin,
        endIndex: currentEnd,
        value: maxValue
    };
}

module.exports = find;
