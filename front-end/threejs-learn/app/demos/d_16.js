/**
* @Author: fiyc
* @Date : 2018-07-13 09:55
* @FileName : d_16.js
* @Description : 
    - 魔方
*/

//初始化六种魔方材质
// var m_red = new THREE.MeshBasicMaterial({color: 0xDC143C});
// var m_green = new THREE.MeshBasicMaterial({color: 0x00FF00});
// var m_yellow = new THREE.MeshBasicMaterial({color: 0xFFFF00});
// var m_blue = new THREE.MeshBasicMaterial({color: 0x0000F});
// var m_orange = new THREE.MeshBasicMaterial({color: 0xFFA500});
// var m_black = new THREE.MeshBasicMaterial({color: 0x000000});



let totalPoint = [];

for(let i=0; i<27; i++){
    totalPoint.push(i);
}

let planIndexs = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const topAngles = [0, 2, 8, 6];
const edgeAngels = [1, 5, 7, 3];
let rotation = function(planIndexs){

    //转换四个顶角
    let realIndex = [];
    for(let i=0; i<4; i++){
        realIndex.push(planIndexs[topAngles[i]]);
    }

    let temp = totalPoint[realIndex[3]];
    for(let i=0; i<4; i++){
        let currentIndex = realIndex[i];
        let currentTemp = totalPoint[currentIndex];
        totalPoint[currentIndex] = temp;
        temp = currentTemp;
    }

    //转换四个边角
    realIndex = [];
    for(let i=0; i<4; i++){
        realIndex.push(planIndexs[edgeAngels[i]]);
    }

    temp = totalPoint[realIndex[3]];
    for(let i=0; i<4; i++){
        let currentIndex = realIndex[i];
        let currentTemp = totalPoint[currentIndex];
        totalPoint[currentIndex] = temp;
        temp = currentTemp;
    }
}

rotation(planIndexs);
console.log(total);