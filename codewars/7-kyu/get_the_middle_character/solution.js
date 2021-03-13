/* https://www.codewars.com/kata/56747fd5cb988479af000028/train/javascript
You are going to be given a word. Your job is to return the middle character of the word. If the word's length is odd, return the middle character. If the word's length is even, return the middle 2 characters.
*/
const getMiddle = (s) => {
  const middle = s.length / 2;
  if (s.length % 2 === 0) {
    return s[middle - 1] + s[middle];
  }
  return s[Math.floor(middle)];
};

console.log(getMiddle("test"));
module.exports = getMiddle;
