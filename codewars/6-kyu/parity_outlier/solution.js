/* https://www.codewars.com/kata/5526fc09a1bbd946250002dc/train/javascript
You are given an array (which will have a length of at least 3, but could be very large) containing integers. The array is either entirely comprised of odd integers or entirely comprised of even integers except for a single integer N. Write a method that takes the array as an argument and returns this "outlier" N.
*/

const findOutlier1 = (integers) => {
  const odd = [];
  const even = [];
  integers.forEach((int) => (int % 2 === 0 ? even.push(int) : odd.push(int)));
  return odd.length > 1 ? even[0] : odd[0];
};

const findOutlier2 = (integers) => {
  const findOdd = () => integers.find((item) => item % 2 !== 0);
  const findEven = () => integers.find((item) => item % 2 === 0);
  return integers.filter((int) => int % 2 === 0).length > 1
    ? findOdd()
    : findEven();
};

console.log(findOutlier1([2, 6, 8, 10, 3]));
module.exports = findOutlier1;
