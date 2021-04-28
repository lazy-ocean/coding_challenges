/*
Given a non-empty array of decimal digits representing a non-negative integer, increment one to the integer.

The digits are stored such that the most significant digit is at the head of the list, and each element in the array contains a single digit.
*/

const plusOne = (digits) => {
  const iter = (i) => {
    const lastD = digits[digits.length - i];
    if (lastD >= 0) {
      if (lastD === 9) {
        digits[digits.length - i] = 0;
        return iter(i + 1);
      }
      digits[digits.length - i] = lastD + 1;
    } else {
      digits.unshift(1);
    }
  };
  iter(1);
  return digits;
};

console.log(plusOne([0]));
module.exports = plusOne;
