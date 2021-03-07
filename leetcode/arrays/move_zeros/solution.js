/*
Given an array nums, write a function to move all 0's to the end of it while maintaining the relative order of the non-zero elements.
You must do this in-place without making a copy of the array.
Minimize the total number of operations.
*/

const moveZeros = (nums) => {
  let i;
  const l = nums.length;
  for (i = l; i >= 0; i--) {
    if (nums[i] === 0) {
      nums.push(nums[i]);
      nums.splice(i, 1);
    }
  }
  return nums;
};

console.log(moveZeros([0, 0, 0, 3, 12]));
module.exports = moveZeros;
