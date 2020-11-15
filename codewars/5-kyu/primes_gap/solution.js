/* https://www.codewars.com/kata/561e9c843a2ef5a40c0000a4/train/javascript
The prime numbers are not regularly spaced. For example from 2 to 3 the gap is 1. From 3 to 5 the gap is 2. From 7 to 11 it is 4. Between 2 and 50 we have the following pairs of 2-gaps primes: 3-5, 5-7, 11-13, 17-19, 29-31, 41-43

A prime gap of length n is a run of n-1 consecutive composite numbers between two successive primes.

We will write a function gap with parameters:
--- g (integer >= 2) which indicates the gap we are looking for
--- m (integer > 2) which gives the start of the search (m inclusive)
--- n (integer >= m) which gives the end of the search (n inclusive)

In the example above gap(2, 3, 50) will return [3, 5] or (3, 5) or {3, 5} which is the first pair between 3 and 50 with a 2-gap.

So this function should return the first pair of two prime numbers spaced with a gap of g between the limits m, n if these numbers exist otherwise null.

gap(6,100,110) --> nil or {0, 0} : between 100 and 110 we have 101, 103, 107, 109 but 101-107 is not a 6-gap because there is 103 in between and 103-109 is not a 6-gap because there is 107 in between.
 */
// Option 1;
function gap(g, m, n) {
  let lastPrime = null;
  for (let i = m; i < n; i++) {
    if (isPrime(i)) {
      if (i - lastPrime === g) {
        return [lastPrime, i];
      } else {
        lastPrime = i;
      }
    }
  }
  return null;
}
const isPrime = (num) => {
  for (let j = Math.round(Math.sqrt(num)); j > 1; j--) {
    if (num % j === 0) return false;
  }
  return true;
};

// Option 2
function gap(g, m, n) {
  let prime1 = null,
    prime2 = null;
  for (let i = m; i < n; i++) {
    if (prime1 && prime2) {
      if (prime2 - prime1 === g) {
        return [prime1, prime2];
      } else {
        prime1 = prime2;
        prime2 = null;
      }
    }
    if (isPrime(i)) {
      if (!prime1) {
        prime1 = i;
      } else if (!prime2) {
        prime2 = i;
      }
    }
  }
  return null;
}

const isPrime = (num) => {
  for (let j = Math.round(Math.sqrt(num)); j > 1; j--) {
    if (num % j === 0) return false;
  }
  return true;
};

console.log(gap(4, 100, 110));
module.exports = gap;
