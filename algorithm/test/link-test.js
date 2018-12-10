/**
* @Author: fiyc
* @Date : 2018-12-10 14:51
* @FileName : link-test.js
* @Description : 
    - 链表测试
*/

let Link = require('../data-structure/link-v1');

let testLink = new Link(10);

testLink.insert(1);
testLink.insert(3);
testLink.insert(2);
testLink.insert(4);
testLink.insert(5);
testLink.insert(5);
testLink.insert(5);
testLink.insert(5);
testLink.insert(5);
testLink.insert(5);

let first = testLink.first();
console.log(first.value);

while(first){
    first = testLink.next(first);

    if(first){
        console.log(first.value);
    }
}