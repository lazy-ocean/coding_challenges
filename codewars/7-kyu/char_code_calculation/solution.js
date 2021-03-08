/* https://www.codewars.com/kata/57f75cc397d62fc93d000059/train/javascript
Given a string, turn each character into its ASCII character code and join them together to create a number - let's call this number total1.
Then replace any incidence of the number 7 with the number 1, and call this number 'total2'.
Then return the difference between the sum of the digits in total1 and total2.
*/
const calc = (x) => {
  let sevens = 0;
  [...x]
    .map((char) => char.charCodeAt(0))
    .join("")
    .split("")
    .forEach((number) => {
      if (number == 7) sevens += 1;
    });
  return sevens * 6;
};

console.log(calc("abcdef"));
module.exports = calc;
