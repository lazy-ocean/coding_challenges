/* eslint operator-linebreak: ["error", "after"] */
/* https://www.codewars.com/kata/59a1ec603203e862bb00004f/solutions/javascript
The number 198 has the property that 198 = 11 + 99 + 88, i.e., if each of its digits is concatenated twice and then summed, the result will be the original number. It turns out that 198 is the only number with this property. However, the property can be generalized so that each digit is concatenated n times and then summed.
Write afunction named check_concatenated_sum that tests if a number has this generalized property.
*/

const checkConcatenatedSum = (number, times) => {
  if (number < 0) {
    number = Math.abs(number);
  }
  return (
    number ===
    // eslint-disable-next-line no-eval
    eval([...number.toString()].map((num) => num.padEnd(times, num)).join("+"))
  );
};

console.log(checkConcatenatedSum(-2997, 3));
module.exports = checkConcatenatedSum;
