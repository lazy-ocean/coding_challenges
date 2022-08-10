/*
https://leetcode.com/problems/two-sum/
Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.
*/

const twoSums = (nums: number[], target: number): number[] => {
  for (let i = 0; i < nums.length; i++) {
    // if current num is less than target
    if (nums[i] <= target) {
      // checking up what's left to add to get the target
      const temp = target - nums[i];
      // checking up the index of the target
      const ind = nums.indexOf(temp);
      // if we have the index and it is a different one from current, return two indices
      if (ind >= 0 && ind !== i) return [i, ind];
    }
  }
  return [];
};

const twoSums2 = (nums: number[], target: number): number[] => {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    // checking up what's left to add to get the target
    const temp = target - nums[i];
    // if we already have needed number in our set, we return two indices
    if (map.has(temp)) return [i, map.get(temp)];
    // if we dont have needed num in our set, we add up this one to the set with its index
    map.set(nums[i], i);
  }
  return [];
};

console.log(twoSums([3, 3], 6));
module.exports = twoSums;
