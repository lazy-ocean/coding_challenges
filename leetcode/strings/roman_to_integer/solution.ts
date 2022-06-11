/*
https://leetcode.com/problems/roman-to-integer/
Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M.

For example, 2 is written as II in Roman numeral, just two ones added together. 12 is written as XII, which is simply X + II. The number 27 is written as XXVII, which is XX + V + II.

Roman numerals are usually written largest to smallest from left to right. However, the numeral for four is not IIII. Instead, the number four is written as IV. Because the one is before the five we subtract it making four. The same principle applies to the number nine, which is written as IX. There are six instances where subtraction is used:

I can be placed before V (5) and X (10) to make 4 and 9. 
X can be placed before L (50) and C (100) to make 40 and 90. 
C can be placed before D (500) and M (1000) to make 400 and 900.
Given a roman numeral, convert it to an integer.
*/

const map = {
  I: 1,
  V: 5,
  X: 10,
  L: 50,
  C: 100,
  D: 500,
  M: 1000,
};

const romanToInt = (str: string): number => {
  // mapping roman numbers to its integers
  const arr = str.split("").map((i) => map[i]);
  let res = 0;

  for (let i = 0; i < arr.length; i++) {
    // looping through the numbers: if there's next number and it is bigger than the current one, subtract current from result, otherwise summing up
    res = arr[i + 1] && arr[i + 1] > arr[i] ? res - arr[i] : res + arr[i];
  }
  return res;
};

console.log(romanToInt("MCMXCIV"));
module.exports = romanToInt;
