/* https://www.codewars.com/kata/57356c55867b9b7a60000bd7/train/javascript
Your task is to create a function that does four basic mathematical operations.

The function should take three arguments - operation(string/char), value1(number), value2(number).
The function should return result of numbers after applying the chosen operation.
*/
const basicOp = (operation, value1, value2) =>
  eval(`${value1}${operation}${value2}`);

console.log(basicOp("+", 4, 7));
module.exports = basicOp;
