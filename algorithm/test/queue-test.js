/**
* @Author: fiyc
* @Date : 2018-12-07 16:30
* @FileName : queue-test.js
* @Description : 
    - 队列测试
*/
let Queue = require('../data-structure/double-queue');


let testQueue = new Queue(5);
testQueue.leftIn(123);
testQueue.leftIn(456);
console.log(testQueue.rightDe());
console.log(testQueue.rightDe());