/**
* @Author: fiyc
* @Date : 2018-11-09 23:47
* @FileName : insertion-sort.js
* @Description : 
    - 插入排序算法实现
*/

let sort = function(targetArray){
    let copyArray = [];
        for(let i in targetArray){
            copyArray[i] = targetArray[i];
        }

    targetArray = copyArray;

    for(let currentIndex = 1; currentIndex < targetArray.length; currentIndex++){
        let temp = targetArray[currentIndex];

        let moveIndex = currentIndex - 1;
        while(moveIndex >= 0){
            if(temp >= targetArray[moveIndex]){
                break;
            }

            targetArray[moveIndex + 1] = targetArray[moveIndex];
            moveIndex--;
        }
        targetArray[moveIndex + 1] = temp;
    }

    return targetArray;
}

module.exports = sort;

