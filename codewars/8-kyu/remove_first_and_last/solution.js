/* https://www.codewars.com/kata/570597e258b58f6edc00230d/train/javascript
You are given a list of character sequences as a comma separated string. Write a function which returns another string containing all the character sequences except the first and the last ones, separated by spaces. If the input string is empty, or the removal of the first and last items would cause the string to be empty, return a null value.
*/

const middle = (str) => {
  const arr = str.split(",");
  arr.pop();
  arr.shift();
  const res = arr.filter(Boolean);
  return res.length >= 1 ? res.join(" ") : null;
};

console.log(middle("1,2,3,4"));
module.exports = middle;
