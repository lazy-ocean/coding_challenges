/*
Given an array of integers, find if the array contains any duplicates.

Your function should return true if any value appears at least twice in the array, and it should return false if every element is distinct.
*/

function containsDuplicate(nums) {
  let sorted = nums.sort()
  let length = sorted.length;
  for (let i = 0; i < length; i++) {
    if (sorted[i] === sorted[i + 1]) return true;
  }
  return false;
}

console.log(containsDuplicate([1,1,1,3,3,4,3,2,4,2]));
module.exports = containsDuplicate;
