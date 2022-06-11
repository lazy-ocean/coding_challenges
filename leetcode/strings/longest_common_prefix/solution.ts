/*
https://leetcode.com/problems/longest-common-prefix/
Write a function to find the longest common prefix string amongst an array of strings.

If there is no common prefix, return an empty string "".
*/

const longestCommonPrefix2 = (strs: string[]): string => {
  const temp = [];

  if (strs.length < 1) return strs[0];

  for (let i = 0; i < strs[0].length; i++) {
    // comparing only first and second strings, finding common prefix variants ('f', 'fl', 'flo') between them, pushing to the stash
    if (strs[0][i] === strs[1][i]) {
      temp.push(strs[0].slice(0, i + 1));
    } else break;
  }

  for (let i = temp.length; i >= 0; i--) {
    // starting from the longest prefix ('flo') checking if every string starts with it. finding the one that is common or not
    if (strs.every((s) => s.startsWith(temp[i]))) return temp[i];
  }

  return "";
};

const longestCommonPrefix = (strs: string[]): string => {
  let res = "";

  if (!strs.length) return "";

  for (let i = 0; i < strs[0].length; i++) {
    for (let j = 0; j < strs.length - 1; j++) {
      // looping through all strings and chars, if same index chars are different for two strings, returning result
      if (strs[j][i] !== strs[j + 1][i]) {
        return res;
      }
    }
    // if we came through all the strings and chars in the same index are the same, pushing this char to the result
    res += strs[0][i];
  }

  return res;
};

console.log(longestCommonPrefix(["flower", "flow", "flight"]));
module.exports = longestCommonPrefix;
