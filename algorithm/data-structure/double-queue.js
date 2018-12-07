/**
* @Author: fiyc
* @Date : 2018-12-07 16:59
* @FileName : double-queue.js
* @Description : 
    - 数据结构 双端队列
*/

let DoubleQueue = function(maxNum){
    maxNum = Number(maxNum);
    if(!maxNum){
        throw "无效的队列长度";
    }
    this.max = maxNum;
    this.data = [];
    this.leftPoint = -1;
    this.rightPoint = -1;
}

DoubleQueue.prototype.leftIn = function(x){
    let nextLeftPoint = this.leftPoint - 1;
    if(nextLeftPoint < 0){
        nextLeftPoint = this.max - 1;
    }

    if(nextLeftPoint === this.rightPoint){
        throw "队列上溢";
    }

    this.leftPoint = nextLeftPoint;
    this.data[this.leftPoint] = x;

    if(this.rightPoint < 0){
        this.rightPoint = this.leftPoint;
    }
}

DoubleQueue.prototype.leftDe = function(){
    if(this.leftPoint < 0){
        throw "队列下溢";
    }

    let result = this.data[this.leftPoint];
    if(this.leftPoint === this.rightPoint){
        this.leftPoint = -1;
        this.rightPoint = -1;
        return result;
    }

    this.leftPoint += 1;
    if(this.leftPoint >= this.max){
        this.leftPoint = 0;
    }

    return result;
}

DoubleQueue.prototype.rightIn = function(x){
    let nextRightPoint = this.rightPoint + 1;
    if(nextRightPoint >= this.max){
        nextRightPoint = 0;
    }

    if(nextRightPoint === this.leftPoint){
        throw "队列上溢";
    }

    this.rightPoint = nextRightPoint;
    this.data[this.rightPoint] = x;

    if(this.leftPoint < 0){
        this.leftPoint = this.rightPoint;
    }
}

DoubleQueue.prototype.rightDe = function(){
    if(this.rightPoint < 0){
        throw "队列下溢";
    }

    let result = this.data[this.rightPoint];
    if(this.rightPoint === this.leftPoint){
        this.rightPoint = 1;
        this.leftPoint = 1;
        return result;
    }

    this.rightPoint -= 1;
    if(this.rightPoint < 0){
        this.rightPoint = this.max - 1;
    }

    return result;
}

module.exports = DoubleQueue;