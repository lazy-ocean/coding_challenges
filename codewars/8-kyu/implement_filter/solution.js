/* https://www.codewars.com/kata/56dd9b84fe5754786f0014f7/train/javascript
What we want to implement is Array.prototype.filter() function, just like the existing Array.prototype.filter(). Another similar function is _.filter() in underscore.js and lodash.js.
*/
Array.prototype.filter = function (func) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (func(this[i])) result.push(this[i]);
  }
  return result;
};

console.log([1, 3, 5, 6].filter((n) => n > 3));
