/**
* @Author: fiyc
* @Date : 2018-11-19 21:35
* @FileName : p316.js
* @Description : 
    - leetcode 316题
    - 去除重复字母
*/

let removeDuplicateLetters = function(s){
    if(!s || s.length === 1){
        return s;
    }

    let currentCharIndex = 0;
    let currentCharCode = s[0].charCodeAt();
    let currentChar = s[0];

    for(let i=0; i<s.length-1; i++){
        let itemCharCode = s[i].charCodeAt();
        let itemChar = s[i];

        let hasDuplicate = existAfterTargetIndex(s, itemChar, i);

        if(!hasDuplicate){
            if(itemCharCode < currentCharCode){
                currentCharIndex = i;
                currentCharCode = itemCharCode;
                currentChar = itemChar;
            }
            break;
        }

        if(itemCharCode >= currentCharCode){
            continue;
        }

        let canReplaceCurrent = true;
        for(let j=0; j<i; j++){
            if(!existAfterTargetIndex(s, s[j], i)){
                canReplaceCurrent = false;
            }
        }

        if(!canReplaceCurrent){
            continue;
        }

        currentCharIndex = i;
        currentCharCode = itemCharCode;
        currentChar = itemChar;
    }

    let restStr = s.slice(currentCharIndex).replace(new RegExp(currentChar, "g"), "");
    return currentChar + removeDuplicateLetters(restStr);
}

/**
 * 判断目标字符 targetChar 在字符串s的beginIndex后(不包含)是否存在
 * @param {*} s 
 * @param {*} targetChar 
 * @param {*} beginIndex 
 */
let existAfterTargetIndex = function(s, targetChar, beginIndex){
    if(!s || beginIndex >= s.length - 1){
        return false;
    }

    for(let i=beginIndex+1; i < s.length; i++){
        if(targetChar === s[i]){
            return true;
        }
    }

    return false;
}


console.log(removeDuplicateLetters("cbacdcbc"));