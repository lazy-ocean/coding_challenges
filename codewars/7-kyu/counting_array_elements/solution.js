/* https://www.codewars.com/kata/5569b10074fe4a6715000054/train/javascript
Write a function that takes an array and counts the number of each unique element present.
*/

const count = (array) =>
  array.reduce((acc, item) => {
    acc[item] ? (acc[item] += 1) : (acc[item] = 1);
    return acc;
  }, {});

console.log(count(["james", "james", "john"]));
module.exports = count;
