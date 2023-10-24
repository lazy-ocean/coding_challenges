/*
https://leetcode.com/problems/maximum-subarray/
Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.

A subarray is a contiguous part of an array.
*/

const maxSubArray = (nums: number[]): number => {
  let acc = 0;
  let max = Number.MIN_SAFE_INTEGER;

  for (let i = 0; i < nums.length; i++) {
    const curr = nums[i];
    // checking whether we add up numbers from previous current or moving current poiinter to the i
    acc = Math.max(acc + curr, curr);
    // checking whether current sum is max
    max = Math.max(acc, max);
  }
  return max;
};

console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]));

/*
Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest product and return its result.

A subarray is a contiguous part of an array.
*/

const findMaxProduct = (arr) => {
  let max = Number.MIN_SAFE_INTEGER;

  for (let i = 0; i < arr.length - 1; i++) {
    max = Math.max(arr[i] * arr[i + 1], max);
  }

  return max;
};

module.exports = maxSubArray;
