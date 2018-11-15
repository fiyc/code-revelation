/**
* @Author: fiyc
* @Date : 2018-11-15 17:44
* @FileName : max-subarray-test.js
* @Description : 
    - 最大数组问题测试
*/
let randomMaker = require('../common/random-maker');
let testArray = randomMaker.randomArray(10000000, -10, 10);
// console.log(`[+] 生成测试数组 ${testArray.join(" ")}`);


let doFind = function(findFn, findName){
    let begin = new Date().getTime();
    let re = findFn(testArray);
    let end = new Date().getTime();
    console.log(`[+] ${findName} 计算完成, 耗时 ${end - begin} ms. 计算到最大子数组为: [${re.beginIndex}, ${re.endIndex}], 子数组和为: ${re.value}`);
}


doFind(require('../implement/maximum-subarry-v2', "动态规划计算"));
doFind(require('../implement/maximum-subarray'), "分治法计算");