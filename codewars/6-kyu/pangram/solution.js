/*
A pangram is a sentence that contains every single letter of the alphabet at least once. For example, the sentence "The quick brown fox jumps over the lazy dog" is a pangram, because it uses the letters A-Z at least once (case is irrelevant).

Given a string, detect whether or not it is a pangram. Return True if it is, False if not. Ignore numbers and punctuation.
*/

function pangram(str) {
  let hashmap = str
    .toLowerCase()
    .split("")
    .filter((char) => char.match(/[a-z]/))
    .reduce((acc, char) => {
      if (!acc.hasOwnProperty(char)) acc[char] = true;
      return acc;
    }, {});
  return Object.keys(hashmap).length === 26;
}

const string = "The quick brown fox jumps over the lazy dog.";
console.log(pangram(string));
module.exports = pangram;
