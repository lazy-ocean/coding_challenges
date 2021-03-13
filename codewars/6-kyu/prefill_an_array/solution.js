/* https://www.codewars.com/kata/54129112fb7c188740000162/train/javascript
Create the function prefill that returns an array of n elements that all have the same value v. See if you can do this without using a loop.

You have to validate input:
v can be anything (primitive or otherwise)
if v is ommited, fill the array with undefined
if n is 0, return an empty array
if n is anything other than an integer or integer-formatted string (e.g. '123') that is >=0, throw a TypeError
When throwing a TypeError, the message should be n is invalid, where you replace n for the actual value passed to the function.
*/

const prefill = (n, v) => {
  const result = [];
  if (Number.isNaN(parseInt(n)) || !Number.isInteger(Number(n)) || n < 0) {
    throw new TypeError(`${n} is invalid`);
  }
  if (n < 1) return result;
  while (n) {
    result.push(v);
    n--;
  }
  return result;
};

console.log(prefill("zys", 1));
module.exports = prefill;
