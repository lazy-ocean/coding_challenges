/* https://www.codewars.com/kata/530e15517bc88ac656000716/train/javascript
ROT13 is a simple letter substitution cipher that replaces a letter with the letter 13 letters after it in the alphabet. ROT13 is an example of the Caesar cipher.

Create a function that takes a string and returns the string ciphered with Rot13. If there are numbers or special characters included in the string, they should be returned as they are. Only letters from the latin/english alphabet should be shifted, like in the original Rot13 "implementation".
*/

function rot13(message) {
  let arr = message.split("");
  return arr
    .map((letter) => {
      if (letter.match(/[a-zA-Z]/)) {
        let ascii = letter.charCodeAt(0);
        let code = letter.toLowerCase().charCodeAt(0);
        let newLetter = String.fromCharCode(code + 13);
        if (!newLetter.match(/[A-Za-z]/)) {
          newLetter = String.fromCharCode(code - 13);
        }
        return ascii < 91 ? newLetter.toUpperCase() : newLetter;
      } else {
        return letter;
      }
    })
    .join("");
}

console.log(rot13("11zero"));
module.exports = rot13;
