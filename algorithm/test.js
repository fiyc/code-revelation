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

let testArray = randomMaker.randomArray(400000, 1, 10);
// console.log(`[-] 未排序数组: ${testArray.toString()}`);

let time1 = new Date().getTime();
let insertRe = insertSort(testArray);
let time2 = new Date().getTime();
// console.log(`[+] 插入排序 耗时 ${time2 - time1} ms, 结果: ${insertRe.toString()}`)
console.log(`[+] 插入排序 耗时 ${time2 - time1} ms.`)
let mergeRe = mergeSort(testArray);
let time3 = new Date().getTime();
// console.log(`[+] 归并排序 耗时 ${time3 - time2} ms, 结果: ${mergeRe.toString()}`)
console.log(`[+] 归并排序 耗时 ${time3 - time2} ms.`)