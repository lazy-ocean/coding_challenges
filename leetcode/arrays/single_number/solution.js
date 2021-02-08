/*
Given a non-empty array of integers nums, every element appears twice except for one. Find that single one.
*/

function singleNumber(nums) {
  for (let i = 0; i < nums.length; i++) {
    if (nums.filter((num) => num === nums[i]).length < 2) return nums[i];
  }
}

console.log(singleNumber([4, 1, 2, 1, 2]));
module.exports = singleNumber;
