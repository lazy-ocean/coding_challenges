/*
https://leetcode.com/problems/remove-duplicates-from-sorted-array/
Given a sorted array nums, remove the duplicates in-place such that each element appears only once and returns the new length.

Do not allocate extra space for another array, you must do this by modifying the input array in-place with O(1) extra memory.
*/

function removeDuplicates(nums) {
  if (!nums.length) return false;
  for (let i = 0; i < nums.length; i++) {
    // if current number is the same with the next one
    if (nums[i] === nums[i + 1]) {
      // remove current item
      nums.splice(i, 1);
      // do not increment index
      i--;
    }
  }
  // only unique nums left so return arr length
  return nums.length;
}

console.log(removeDuplicates([1, 1, 2]));
module.exports = removeDuplicates;
