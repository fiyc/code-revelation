/**
* @Author: fiyc
* @Date : 2018-11-19 22:29
* @FileName : p002.js
* @Description : 
    - leetcode 2题
    - 两数相加
*/

 function ListNode(val) {
     this.val = val;
     this.next = null;
 }

let addTwoNumbers = function(l1, l2){
    let result = [];

    let currentNode1 = l1;
    let currentNode2 = l2;
    let tempAdd = 0;
    while(true){
        let value1 = currentNode1.val;
        let value2 = currentNode2.val;

        let sum = value1 + value2 + tempAdd;
        tempAdd = 0;

        if(sum >= 10){
            tempAdd = 1;
            sum -= 10;
        }

        result.push(sum);

        if(!currentNode1.next && !currentNode2.next){
            break;
        }

        if(!currentNode1.next){
            currentNode1.next = new ListNode(0);
        }

        if(!currentNode2.next){
            currentNode2.next = new ListNode(0);
        }

        currentNode1 = currentNode1.next;
        currentNode2 = currentNode2.next;
    }

    if(tempAdd > 0){
        result.push(tempAdd);
    }

    return result;
}


let makeListNode = function(numArray){
    let index = 0;
    let result = new ListNode(0);
    let currentNode = result;
    while(index < numArray.length){
        currentNode.val = numArray[index];

        if(index < numArray.length - 1){
            currentNode.next = new ListNode(0);
            currentNode = currentNode.next;
        }

        index++;
    }

    return result;
}

console.log(addTwoNumbers(makeListNode([2,4,3]), makeListNode([5,6,4])));