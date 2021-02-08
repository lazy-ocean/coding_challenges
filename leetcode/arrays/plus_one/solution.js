/*
Given a non-empty array of decimal digits representing a non-negative integer, increment one to the integer.

The digits are stored such that the most significant digit is at the head of the list, and each element in the array contains a single digit.
*/

function plusOne(digits) {
  let iter = (i) => {
    let lastD = digits[digits.length - i];
    if (lastD >= 0) {
      if (lastD === 9) {
        digits[digits.length - i] = 0;
        return iter(i + 1);
      } else {
        digits[digits.length - i] = lastD + 1;
      }
    } else {
      digits.unshift(1);
    }
  };
  iter(1);
  return digits;
}

console.log(plusOne([0]));
module.exports = plusOne;

/**let lastD = (digits[digits.length - 1] + 1).toString();
  digits[digits.length - 1] = ~~lastD[0];
  if (lastD.length > 1) {
    digits.push(~~lastD[1]);
  }
  return digits; */
/**function plusOne(digits) {
  let str = digits.join("");
  let zeros = str.length > 0 ? countZeros(str) : 0;
  let number = parseInt(str);
  let res = (number + 1).toString().split("");
  while (zeros > 0) {
    res.unshift(0);
    zeros -= 1;
  }
  return res;
} */
