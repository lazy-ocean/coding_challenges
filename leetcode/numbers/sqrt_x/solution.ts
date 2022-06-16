/* https://leetcode.com/problems/sqrtx/
Given a non-negative integer x, compute and return the square root of x.

Since the return type is an integer, the decimal digits are truncated, and only the integer part of the result is returned.

Note: You are not allowed to use any built-in exponent function or operator, such as pow(x, 0.5) or x ** 0.5.
*/

// using binary search and recursion
const mySqrt = (x: number): number => {
  if (x === 0) return 0;
  const minSt = 1;
  // top border - just above the half of the number
  const maxSt = Math.floor(x / 2) + 1;

  const f = (min: number, max: number): number => {
    if (min > max) return max;

    const mid = Math.floor((min + max) / 2);
    const n = mid * mid;

    if (n < x) {
      // mid + 1 as we've covered mid already and need to look at a max side
      return f(mid + 1, max);
    }
    if (n > x) {
      // mid - 1 as we've covered mid already and need to look at a min side
      return f(min, mid - 1);
    }
    return mid;
  };

  return f(minSt, maxSt);
};

console.log(mySqrt(2));
module.exports = mySqrt;
