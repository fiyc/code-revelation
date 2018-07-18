/**
* @Author: fiyc
* @Date : 2018-07-19 00:35
* @FileName : matrix-util-test.js
* @Description : 
    - matrix-util 测试文件
*/

let target = require('../app/matrix-util');

let matrix = target(2);

let result = matrix.getTargetPlanBoxs([0,1,2,3,4,5,6,7], {
    directory: 0,
    index: 0
});

console.log(result);
let result2 = matrix.rotationPlan([0,1,2,3,4,5,6,7], {
    directory: 2,
    index: 0
}, false, function(current, old, vector){
    current += 1;
})

console.log(result2);