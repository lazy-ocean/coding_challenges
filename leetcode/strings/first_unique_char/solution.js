/*
Given a string s, return the first non-repeating character in it and return its index. If it does not exist, return -1.
1 <= s.length <= 10^5
s consists of only lowercase English letters.
*/

const firstUniqChar = (str) => {
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (str.indexOf(char) === i && str.indexOf(char, i + 1) === -1) return i;
  }
  return -1;
};

console.log(firstUniqChar("aabb"));
module.exports = firstUniqChar;
