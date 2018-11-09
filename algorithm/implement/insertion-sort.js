/**
* @Author: fiyc
* @Date : 2018-11-09 23:47
* @FileName : insertion-sort.js
* @Description : 
    - 插入排序算法实现
*/
let randomMaker = require('../common/random-maker');

let sort = function(targetArray){
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


let testArray = randomMaker.randomArray(20, 1, 10);

console.log(`[-] 未排序数组: ${testArray.toString()}`);
let begin = new Date().getTime();
let sortArray = sort(testArray);

let end = new Date().getTime();
console.log(`[+] 排序后数组: ${testArray.toString()}`);

module.exports = sort;
