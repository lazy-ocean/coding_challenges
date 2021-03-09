/* https://www.codewars.com/kata/522551eee9abb932420004a0/solutions/javascript
I love Fibonacci numbers in general, but I must admit I love some more than others.
I would like for you to write me a function that when given a number (n) returns the n-th number in the Fibonacci Sequence.
*/
const nthFibo = (n) => {
  if (n <= 1) return 0;
  if (n <= 2) return 1;
  return nthFibo(n - 1) + nthFibo(n - 2);
};

console.log(nthFibo(6));
module.exports = nthFibo;
