/* https://www.codewars.com/kata/520b9d2ad5c005041100000f/train/javascript
Move the first letter of each word to the end of it, then add "ay" to the end of the word. Leave punctuation marks untouched.
*/

function pigIt(str) {
  return str
    .split(" ")
    .map((word) =>
      word.match(/[a-zA-Z]/) ? word.slice(1) + word[0] + "ay" : word
    )
    .join(" ");
}

console.log(pigIt("Pig latin is cool"));
module.exports = pigIt;
