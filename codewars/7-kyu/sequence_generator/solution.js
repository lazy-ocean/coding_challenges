/* https://www.codewars.com/kata/56ba8a9b022c16017d0001f3/train/javascript
Implement function sequence, which returns new n-size Array filled according to pattern.
pattern may be:
a function that takes two: (element, index), one: (element) or any arguments (similar to map function), then filled running this function, in other words: function describes sequence,
number, string or any other object, then filled by copying, this object n-times.
*/
const sequence = (n, pattern) => {
  const res = [];
  for (let i = 0; i < n; i++) {
    if (typeof pattern === "function") {
      res.push(pattern(0, i));
    } else res.push(pattern);
  }
  return res;
};

console.log(sequence(4, 2));
module.exports = sequence;
