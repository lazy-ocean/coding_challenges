/* https://www.codewars.com/kata/54521e9ec8e60bc4de000d6c/javascript
The maximum sum subarray problem consists in finding the maximum sum of a contiguous subsequence in an array or list of integers:

maxSequence([-2, 1, -3, 4, -1, 2, 1, -5, 4])
// should be 6: [4, -1, 2, 1]
Easy case is when the list is made up of only positive numbers and the maximum sum is the sum of the whole array. If the list is made up of only negative numbers, return 0 instead.

Empty list is considered to have zero greatest sum. Note that the empty list or array is also a valid sublist/subarray.
*/

const maxSequence = (arr) => {
  if (!arr.filter((num) => num > 0).length) return 0;
  if (!arr.filter((num) => num < 0).length)
    return arr.reduce((a, b) => a + b, 0);
  let max = arr[0];
  const func = (copy) => {
    let sum = copy.reduce((a, b) => a + b, 0);
    if (sum > max) max = sum;
    copy.pop();
    if (!copy.length) return;
    return func(copy);
  };
  for (let i = 0; i < arr.length; i++) {
    let copy = [...arr];
    copy.splice(0, i);
    func(copy);
  }
  return max;
};

module.exports = maxSequence;
