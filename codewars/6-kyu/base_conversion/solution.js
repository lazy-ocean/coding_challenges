/* https://www.codewars.com/kata/526a569ca578d7e6e300034e/train/javascript
In this kata you have to implement a base converter, which converts positive integers between arbitrary bases / alphabets. 
The function convert() should take an input (string), the source alphabet (string) and the target alphabet (string). You can assume that the input value always consists of characters from the source alphabet. You don't need to validate it. */

const Alphabet = {
  BINARY: "01",
  OCTAL: "01234567",
  DECIMAL: "0123456789",
  HEXA_DECIMAL: "0123456789abcdef",
  ALPHA_LOWER: "abcdefghijklmnopqrstuvwxyz",
  ALPHA_UPPER: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  ALPHA: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
  ALPHA_NUMERIC:
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
};

const convert = (input, source, target) => {
  if (source === target) {
    return input;
  }

  let decimalValue = input
    .split("")
    .reduce(
      (acc, item, i) =>
        acc + source.indexOf(item) * source.length ** (input.length - 1 - i),
      0
    );

  const result = [];
  if (decimalValue === 0) result.push(target[decimalValue % target.length]);
  while (decimalValue > 0) {
    result.push(target[decimalValue % target.length]);
    decimalValue = Math.floor(decimalValue / target.length);
  }

  return result.reverse().join("");
};

console.log(convert("0", Alphabet.DECIMAL, Alphabet.ALPHA));
module.exports = convert;
