/* https://leetcode.com/explore/interview/card/top-interview-questions-easy/127/strings/883/
Given a string s, determine if it is a palindrome, considering only alphanumeric characters and ignoring cases.
*/

const isPalindrome = (str) => {
  const cleanStr = str.toLowerCase().match(/[a-z0-9]/g);
  if (!cleanStr) return true;
  return cleanStr.join("") === cleanStr.reverse().join("");
};

console.log(isPalindrome("0P"));
module.exports = isPalindrome;
