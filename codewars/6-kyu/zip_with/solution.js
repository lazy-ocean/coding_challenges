/* eslint-disable no-confusing-arrow */
/* https://www.codewars.com/kata/5825792ada030e9601000782/train/javascript
zipWith takes a function and two arrays and zips the arrays together, applying the function to every pair of values.
The function value is one new array.
If the arrays are of unequal length, the output will only be as long as the shorter one.
(Values of the longer array are simply not used.)

Inputs should not be modified.
*/
const zipWith = (fn, a0, a1) =>
  a0
    .map((num, index) =>
      typeof a1[index] === "number" ? fn(num, a1[index]) : ""
    )
    .filter((item) => item !== "");

console.log(zipWith(Math.max, [10, 10, 10, 10], [0, 1, 2, 3]));
module.exports = zipWith;
