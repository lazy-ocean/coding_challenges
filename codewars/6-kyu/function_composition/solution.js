/* https://www.codewars.com/kata/5421c6a2dda52688f6000af8/train/javascript
Your task is to create a compose function to carry out this task, which will be passed two functions or lambdas. Ruby functions will be passed, and should return, either a proc or a lambda. Remember that the resulting composed function may be passed multiple arguments!
*/

const compose = (f, g) => (...n) => f(g(...n));

const add1 = (a) => a + 1;
const id = (a) => a;

console.log(compose(add1, id)(0));
module.exports = compose;
