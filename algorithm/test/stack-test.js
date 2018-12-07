/**
* @Author: fiyc
* @Date : 2018-12-07 15:23
* @FileName : stack-test.js
* @Description : 
    - 栈测试
*/

let Stack = require('../data-structure/stack');

let testStack = new Stack(5);
for(let i=1; i < 6; i++){
    testStack.push(i);
}

for(let i=1; i < 6; i++){
    console.log(testStack.pop());
}