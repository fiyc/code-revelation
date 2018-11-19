/**
* @Author: fiyc
* @Date : 2018-11-19 22:15
* @FileName : p001.js
* @Description : 
    -   leetcode 1 题
    - 两数之和
*/

let twoSum = function(nums, target){
    for(let i=0; i<nums.length - 1; i++){
        for(let j=i+1; j<nums.length; j++){
            if(nums[i] + nums[j] === target){
                return [i, j];
            }
        }
    }
}
