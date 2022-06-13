/* https://leetcode.com/problems/palindrome-number/
Given an integer x, return true if x is palindrome integer.

An integer is a palindrome when it reads the same backward as forward.

For example, 121 is a palindrome while 123 or -121 is not.
*/

const isPalindrome1 = (x: number): boolean => {
  const s = x.toString();
  return s === s.split("").reverse().join("");
};

// without converting to string
const isPalindrome2 = (x: number): boolean => {
  if (x < 0) return false;
  const digits = [];

  while (x) {
    // setting off digit: 212 % 10 = 2, 34 % 10 = 4
    digits.push(x % 10);
    // subtract this digit: 212 / 10 = 21, 34 / 10 = 3
    x = Math.floor(x / 10);
  }

  // reverse the digits array to compare
  const reverse = [...digits].reverse();

  return digits.every((n, i) => n === reverse[i]);
};

// optimized version: without arrays and using only half of the number
const isPalindrome = (x: number): boolean => {
  // if negative, by definition is not palindrome: -121 => 121-
  if (x < 0) return false;
  // if ends with 0, should start with 0, any other case not a palindrome
  if (x % 10 === 0 && x !== 0) return false;
  let reversedLastHalf = 0;

  // x is decrementing on every step, reversedLastHalf is incrementing, we reach the middle when x is less than reversed half
  while (x > reversedLastHalf) {
    // setting reversed half: multiplying by 10 and adding current digit
    reversedLastHalf = reversedLastHalf * 10 + (x % 10);

    // subtract used digit from number
    x = Math.floor(x / 10);
  }

  // checking equality: if the number of digits is equal (1221 => 12 & 12) or if not (12321 => 123 & 12, middle digit doesn't have a pair so could be disregarded => 123 / 10 & 12 => 12 & 12)
  return reversedLastHalf === x || Math.floor(reversedLastHalf / 10) === x;
};

console.log(isPalindrome(10));
console.log(isPalindrome(12321));
module.exports = isPalindrome;
