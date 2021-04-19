/* https://www.codewars.com/kata/525f3eda17c7cd9f9e000b39/train/javascript
This time we want to write calculations using functions and get the results. Let's have a look at some examples:

seven(times(five())); // must return 35
four(plus(nine())); // must return 13
eight(minus(three())); // must return 5
six(dividedBy(two())); // must return 3
Requirements:

There must be a function for each number from 0 ("zero") to 9 ("nine")
There must be a function for each of the following mathematical operations: plus, minus, times, dividedBy (divided_by in Ruby and Python)
Each calculation consist of exactly one operation and two numbers
The most outer function represents the left operand, the most inner function represents the right operand
Division should be integer division. For example, this should return 2, not 2.666666...:
*/
const zero = (f) => (f ? f(0) : 0);
const one = (f) => (f ? f(1) : 1);
const two = (f) => (f ? f(2) : 2);
const three = (f) => (f ? f(3) : 3);
const four = (f) => (f ? f(4) : 4);
const five = (f) => (f ? f(5) : 5);
const six = (f) => (f ? f(6) : 6);
const seven = (f) => (f ? f(7) : 7);
const eight = (f) => (f ? f(8) : 8);
const nine = (f) => (f ? f(9) : 9);

const plus = (a) => (b) => b + a;
const minus = (a) => (b) => b - a;
const times = (a) => (b) => b * a;
const dividedBy = (a) => (b) => Math.floor(b / a);

console.log(seven(times(five()))); // 35
console.log(four(plus(nine()))); // 13
console.log(eight(minus(three()))); // 5
console.log(five(dividedBy(two()))); // 3

const f = {
  zero,
  one,
  two,
  three,
  four,
  five,
  six,
  seven,
  eight,
  nine,
  plus,
  minus,
  times,
  dividedBy,
};
module.exports = f;
