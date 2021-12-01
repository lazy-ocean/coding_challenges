/* 2.C. Palindrome
A string consisting of lowercase Latin letters is brought to a repair shop. The customer wants to turn it into a palindrome. The repair shop can replace any letter in the string with any letter chosen by the customer for 1 UE.
What is the minimum amount the customer will have to pay to turn the string to a palindrome, taking into account that the letters cannot switch places?

Input format
The input contains a non-empty string consisting of lowercase Latin letters.
Output format
Output a single integer - the minimum amount the customer will have to pay to turn the string into a palindrome.
*/

export {};
const fs = require("fs");

const input = fs.readFileSync("palindrome/input.txt", "utf8", () => null);
const data = input.trim();

const countPalindromeCost = (str: string): number => {
  let res = 0;
  const l = str.length;
  const middleSymbol = l / 2;
  const start = str.slice(0, middleSymbol);
  const end = str
    .slice(Number.isInteger(middleSymbol) ? middleSymbol : middleSymbol + 1, l)
    .split("")
    .reverse();
  [...start].forEach((letter, i) => {
    if (end[i] !== letter) res += 1;
  });
  return res;
};

const result = countPalindromeCost(data);
console.log(result);
/* fs.writeFileSync("output.txt", result.toString()) */
module.exports = countPalindromeCost;
