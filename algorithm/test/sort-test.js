/**
* @Author: fiyc
* @Date : 2018-11-11 21:31
* @FileName : test.js
* @Description : 
    - 测试
*/

let randomMaker = require('../common/random-maker');
let insertSort = require('../implement/insertion-sort');
let mergeSort = require('../implement/merge-sort');
let insertSortV2 = require('../implement/insertion-sort-v2');
let heapSort = require('../implement/heap');
let quickSort = require('../implement/quict-sort');

let testArray = randomMaker.randomArray(10000, 1, 100);
let copyArray = [].concat(testArray);
copyArray = copyArray.sort(function (a, b) {
    return a - b;
});

let doSort = async function (sortFn, sortName) {
    let begin = new Date().getTime();
    let result = sortFn(testArray);
    let end = new Date().getTime();

    let isSort = copyArray.join(",") === result.join(",");
    console.log(`[${isSort ? "+" : "-"}] ${sortName} 计算完成, 耗时 ${end - begin} ms. 计算结果 ${isSort ? "正确" : "错误"}`);
}


let sortFns = {
    "归并排序": mergeSort,
    "快速排序": quickSort,
    "堆排序": heapSort,
    // "插入排序V2": insertSortV2,
    // "插入排序": insertSort,
};

for (let name in sortFns) {
    doSort(sortFns[name], name);
}
