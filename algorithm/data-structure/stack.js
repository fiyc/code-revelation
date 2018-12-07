/**
* @Author: fiyc
* @Date : 2018-12-07 15:15
* @FileName : stack.js
* @Description : 
    - 数据结构 栈
*/

let Stack = function(maxNum){
    this.max = maxNum;
    this.top = -1;
    this.data = [];
}

Stack.prototype.empty = function(){
    if(this.top === 0){
        return true;
    }else{
        return false;
    }
}

Stack.prototype.push = function(x){
    if(this.top + 1>= this.max){
        throw "栈上溢";
    }

    this.top += 1;
    this.data[this.top] = x;
}

Stack.prototype.pop = function(){
    if(this.top < 0){
        throw "栈下溢";
    }

    this.top -= 1;
    return this.data[this.top + 1];
}

module.exports = Stack;