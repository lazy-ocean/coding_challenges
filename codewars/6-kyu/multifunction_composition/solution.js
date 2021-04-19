/* https://www.codewars.com/kata/5655c60db4c2ce0c2e000026/train/javascript
Your task is to write a compose function which can compose any number of functions together.
*/
const compose = (...functions) => (a) => {
  let arg = a;
  while (functions.length) {
    const f = functions.pop();
    arg = f(arg);
  }
  return arg;
};
const addOne = (a) => a + 1;
const multTwo = (b) => b * 2;
console.log(compose(addOne, multTwo, addOne, addOne)(2));

module.exports = compose;
