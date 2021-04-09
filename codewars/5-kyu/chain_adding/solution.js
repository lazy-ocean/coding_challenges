/* https://www.codewars.com/kata/539a0e4d85e3425cb0000a88/train/javascript
We want to create a function that will add numbers together when called in succession.
We also want to be able to continue to add numbers to our chain.
add(1)(2)(3); // 6
add(1)(2)(3)(4); // 10
add(1)(2)(3)(4)(5); // 15
*/

const add = (...args) =>
  Object.assign(add.bind(null, ...args), {
    valueOf: () => args.reduce((a, c) => a + c, 0),
  });

const addTwo = add(2);
console.log(+addTwo);
console.log(+addTwo(3));
console.log(+addTwo(3)(5));
module.exports = add;
