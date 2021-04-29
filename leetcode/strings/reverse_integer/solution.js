/* https://leetcode.com/explore/interview/card/top-interview-questions-easy/127/strings/880/
Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range, then return 0.
*/

// Non-efficient method (split-reverse-join combination)
const reverse1 = (num) => {
  const res = Math.abs(Math.abs(num).toString().split("").reverse().join(""));
  // checking if the result is bigger than the maximum positive value for a 32-bit signed binary integer.
  if (res >= 2 ** 31 - 1) {
    return 0;
  }
  return num < 0 ? 0 - res : res;
};

// more efficient with math operations
const reverse2 = (num) => {
  let n = Math.abs(num);
  let res = 0;
  while (n) {
    if (res * 10 + (n % 10) >= 2 ** 31 - 1) return 0;
    // multiplying the result by 10 'reverses' the result and remainder operator helps to divide number by ones.
    res = res * 10 + (n % 10);
    n = Math.floor(n / 10);
  }
  return num < 0 ? 0 - res : res;
};

module.exports = reverse2;
