/* https://www.codewars.com/kata/54b42f9314d9229fd6000d9c/solutions/javascript
The goal of this exercise is to convert a string to a new string where each character in the new string is "(" if that character appears only once in the original string, or ")" if that character appears more than once in the original string. Ignore capitalization when determining if a character is a duplicate.
*/
const duplicateEncode = (str) => {
  const hashmap = [...str].reduce((acc, letter) => {
    const char = letter.toLowerCase();
    acc[char] ? (acc[char] += 1) : (acc[char] = 1);
    return acc;
  }, {});
  return [...str]
    .map((char) => (hashmap[char.toLowerCase()] > 1 ? ")" : "("))
    .join("");
};

console.log(duplicateEncode("din"));
module.exports = duplicateEncode;
