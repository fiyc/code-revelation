/**
* @Author: fiyc
* @Date : 2018-09-28 10:55
* @FileName : bitmap.js
* @Description : 
    - 位图算法
*/

let getRandom = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// 预计数据数量
const maxNum = 5000000;

// 预计需要的字节数
const byteNum = Math.ceil(maxNum / 8);
let baseData = Buffer.alloc(byteNum);

for (let i = 0; i < maxNum; i++) {
    let currentNum = getRandom(0, maxNum - 1);

    // console.log(`产生数字 ${currentNum}`);

    let byteIndex = Math.floor(currentNum / 8);
    let bitIndex = currentNum % 8;

    let oldByteValue = baseData.readUInt8(byteIndex);
    let newByteValue = oldByteValue | (1 << bitIndex);

    baseData.writeUInt8(newByteValue, byteIndex);
}


let existInBaseData = function (number) {
    let byteIndex = Math.round(number / 8);
    let bitIndex = number % 8;

    if (byteIndex >= baseData.length) {
        return false;
    }

    return (baseData.readUInt8(byteIndex) & (1 << bitIndex)) > 0;
}

let outputSort = function(){
    let array = new Array();
    for(let i=0; i<baseData.length; i++){
        let currentByte = baseData.readUInt8(i);
        for(let bitIndex=0; bitIndex < 8; bitIndex++){
            let exist = (currentByte & (1 << bitIndex)) > 0;
            if(exist){
                array.push( i * 8 + bitIndex);
            }
        }
    }

    console.log(`数组长度: ${array.length}`);
    // console.log(`产生数组: ${array}`);
}

console.log('开始排序');
outputSort();
console.log('排序完成');


// setInterval(function () {
//     let targetNum = getRandom(0, maxNum - 1);
//     let begin = new Date();
//     let exist = existInBaseData(getRandom(0, maxNum));
//     let costTime = new Date() - begin;
//     if (exist) {
//         console.log(`[+] 目标数字: ${targetNum} 存在,   计算耗时:  ${costTime}ms`);
//     } else {
//         console.log(`[-] 目标数字: ${targetNum} 不存在, 计算耗时: ${costTime}ms`);
//     }
// }, 1000);




