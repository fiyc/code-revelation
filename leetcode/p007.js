/**
* @Author: fiyc
* @Date : 2018-11-20 10:41
* @FileName : p007.js
* @Description : 
    - leetcode 7 题
    - 整数反转
*/

var reverse = function(x) {
    let flag = x < 0 ? -1 : 1; 
    let reverseNumStr = Math.abs(x).toString().split("").reverse().join("");
    let reverSe = parseInt(reverseNumStr) * flag;
 
 
    if(reverSe < Math.pow(-2, 31) || reverSe > Math.pow(2, 31)){
        reverSe = 0;
    }
 
    return reverSe;
 };
 