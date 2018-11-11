/**
* @Author: fiyc
* @Date : 2018-11-11 21:31
* @FileName : test.js
* @Description : 
    - 测试
*/

let randomMaker = require('./common/random-maker');
let insertSort = require('./implement/insertion-sort');
let mergeSort = require('./implement/merge-sort');
let insertSortV2 = require('./implement/insertion-sort-v2');

let testArray = randomMaker.randomArray(400000, 1, 10);
let copyArray = [].concat(testArray);
copyArray =  copyArray.sort();

let doSort = function(sortFn, sortName){
    let begin = new Date().getTime();
    let result = sortFn(testArray);
    let end = new Date().getTime();

    let isSort = copyArray.join(",") === result.join(",");
    console.log(`[${isSort ? "+": "-"}] ${sortName} 计算完成, 耗时 ${end - begin} ms. 计算结果 ${isSort ? "正确": "错误"}`);
}


doSort(insertSort, "插入排序");
doSort(insertSortV2, "插入排序V2");
doSort(mergeSort, "归并排序");