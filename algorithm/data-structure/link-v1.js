/**
* @Author: fiyc
* @Date : 2018-12-10 10:51
* @FileName : link-v1.js
* @Description : 
    - 多数组实现链表
*/


let link = function(maxNum){
    this.head = -1;
    this.free = 0;
    this.nextArray = [];
    this.keyArray = [];
    this.preArray = [];
    for(let i=0; i<maxNum - 1; i++){
        this.nextArray[i] = i + 1;
        this.preArray[i] = -1;
    }
    this.nextArray[maxNum - 1] = -1;
}

/**
 * 分配资源
 */
link.prototype.allocateObject = function(){
    
    if(this.free < 0){
        throw "链表上溢出";
    }

    let result = this.free;
    this.free = this.nextArray[this.free];
    return result;
}

/**
 * 清理资源
 * @param {*} x 
 */
link.prototype.freeObject = function(currentIndex){
    this.nextArray[currentIndex] = this.free;
    this.free = currentIndex;
}



/**
 * 链表插入
 */
link.prototype.insert = function(value){
   let index = this.allocateObject(); 
    this.nextArray[index] = this.head;
    this.keyArray[index] = value;
    this.preArray[index] = -1;
    this.head = index;

    return index;
}

/**
 * 链表删除
 * @param {*} x 
 */
link.prototype.delete = function(obj){
    let currentIndex = obj.index;
    let nextIndex = this.nextArray[currentIndex];
    let preIndex = this.preArray[currentIndex];

    if(nextIndex >= 0){
        this.preArray[nextIndex] = preIndex;
    }

    if(preIndex >= 0){
        this.nextArray[preIndex] = nextIndex;
    }

    if(preIndex < 0){
        this.head = nextIndex;
    }

    this.freeObject(currentIndex);
}

/**
 * 获取链表第一个元素
 */
link.prototype.first = function(){
    if(this.head < 0){
        return null;
    }

    return {
        index: this.head,
        value: this.keyArray[this.head]
    };
}

link.prototype.next = function(current){
    if(!current){
        return null;
    }

    let nextIndex = this.nextArray[current.index];
    if(nextIndex < 0 || nextIndex === this.free){
        return null;
    }

    return {
        index: nextIndex,
        value: this.keyArray[nextIndex]
    };
}

link.prototype.pre = function(current){
    if(!current){
        return null;
    }

    let preIndex = this.preArray[current.index];
    if(preIndex < 0 || preIndex === this.free){
        return null;
    }

    return {
        index: preIndex,
        value: this.keyArray[preIndex]
    };
}

module.exports = link;