/**
* @Author: fiyc
* @Date : 2018-11-19 23:32
* @FileName : p003.js
* @Description : 
    - leetcode 3题
    - 无重复字符的最长子串
*/

var lengthOfLongestSubstring = function(s) {
    s = s || "";
    if(s.length <= 1){
        return s.length;
    }

    let currentMaxLength = 0;
    let currentStr = "";

    let existIndex = -1;
    while(currentMaxLength < s.length){
        let itemChar = s[currentMaxLength];
        if(currentStr.indexOf(itemChar) >= 0){
            existIndex = currentStr.indexOf(itemChar);
            break;
        }

        currentMaxLength ++;
        currentStr += itemChar;
    }

    if(existIndex < 0){
        return currentMaxLength;
    }

    if(currentMaxLength === s.length || currentMaxLength > s.length / 2){
        return currentMaxLength;
    }


    let restStr = s.slice(existIndex + 1);
    let restMaxLength = lengthOfLongestSubstring(restStr);

    if(currentMaxLength > restMaxLength){
        return currentMaxLength;
    }else{
        return restMaxLength;
    }
};

console.log(lengthOfLongestSubstring("anviag"));