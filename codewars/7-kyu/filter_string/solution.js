/* https://www.codewars.com/kata/55b051fac50a3292a9000025/solutions/javascript
Oh no! The number has been mixed up with the text. Your goal is to retreive the number from the text, can you return the number back to it's original state?
Your task is to return a number from a string.
You will be given a string of numbers and letters mixed up, you have to return all the numbers in that string in the order they occur.
*/

const filterString = (str) =>
  +[...str]
    .map((char) => parseInt(char, 10))
    .filter((item) => !Number.isNaN(item))
    .join("");
console.log(filterString("aa1bb2cc3dd"));
module.exports = filterString;
