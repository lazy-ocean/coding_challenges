/*
Given an array of integers, find the one that appears an odd number of times.

There will always be only one integer that appears an odd number of times.
*/

const findOdd = (a) => {
  for (let i = 0; i < a.length; i++) {
    if (a.filter((item) => item === a[i]).length % 2 !== 0) return a[i];
  }
};

module.exports = findOdd;
