/**
* @Author: fiyc
* @Date : 2018-12-07 15:31
* @FileName : queue.js
* @Description : 
    - 数据结构 队列
*/

let Queue = function(maxNum){
    maxNum = Number(maxNum);
    if(!maxNum){
        throw "无效的队列长度";
    }
    this.max = maxNum;
    this.data = [];
    /**
     * 当前队列头序号
     */
    this.head = -1;

    /**
     * 当前队列尾序号
     */
    this.tail = -1;
}

Queue.prototype.enQueue = function(x){
    let nextTail = this.tail + 1;
    if(nextTail >= this.max){
        nextTail = 0;
    }

    if(nextTail === this.head){
        throw "队列上溢";
    }

    this.data[nextTail] = x;
    this.tail = nextTail;

    if(this.head < 0){
        this.head = 0;
    }
}

Queue.prototype.deQueue = function(){
    if(this.head < 0){
        throw "队列下溢";
    }

    let result = this.data[this.head];
    if(this.head === this.tail){
       this.head = -1;
       this.tail = -1; 
       return result;
    }

    this.head += 1;
    if(this.head >= this.max){
        this.head = 0;
    }

    return result;
}

module.exports = Queue;