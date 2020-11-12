/* https://www.codewars.com/kata/56a5d994ac971f1ac500003e/solutions/javascript
You are given an array(list) strarr of strings and an integer k. Your task is to return the first longest string consisting of k consecutive strings taken in the array.

Example:
longest_consec(["zone", "abigail", "theta", "form", "libe", "zas", "theta", "abigail"], 2) --> "abigailtheta"

n being the length of the string array, if n = 0 or k > n or k <= 0 return "".
*/

function longestConsec(strarr, k) {
  let length = strarr.length;
  if (length === 0 || k > length || k <= 0) return "";
  let maxes = strarr.slice(0, k).join("");
  let newWord;
  for (let j = 1; j < strarr.length; j++) {
    newWord = strarr.slice(j, j + k).join("");
    if (newWord.length > maxes.length) maxes = newWord;
    newWord = [];
  }
  return maxes;
}

module.exports = longestConsec;
