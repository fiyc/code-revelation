/**
* @Author: fiyc
* @Date : 2018-11-21 14:59
* @FileName : p003_2.js
* @Description : 
    - leetcode 3题
    - 无重复字符的最长子串 
    - 尝试使用更高效的算法完成
*/


let lengthOfLongestSubstring = function(s){
    s = s || "";
    let checkCharMap = {};
    
    let currentBeginIndex = 0;

    let currentMax = 0;
    for(let i=0; i<s.length; i++){
        if(s.length - currentBeginIndex <= currentMax){
            break;
        }
        
        let itemChar = s[i];

        if(checkCharMap[itemChar] === undefined){
            checkCharMap[itemChar] = i;
        }

        let lastIndex = checkCharMap[itemChar];
        checkCharMap[itemChar] = i;
        if(lastIndex >= currentBeginIndex && lastIndex != i){
            currentBeginIndex = lastIndex + 1;
        }

        if(i - currentBeginIndex + 1 > currentMax){
            currentMax = i - currentBeginIndex + 1;
        }
    }

    return currentMax;
}

console.log(lengthOfLongestSubstring("sljflsajslaajdndvihfeja"));