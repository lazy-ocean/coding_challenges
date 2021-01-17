/* Rotate array
Given an array, rotate the array to the right by k steps, where k is non-negative.
Important: modify array in-place, do not return new array.
*/

function rotate(nums, k) {
  for (let i = 0; i < k; i++) {
    const item = nums.pop();
    nums.unshift(item);
  }
  return nums;
}

console.log(rotate([1, 2, 3, 4, 5, 6, 7], 3));
module.exports = rotate;
