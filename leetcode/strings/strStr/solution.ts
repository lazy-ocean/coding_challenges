/*
https://leetcode.com/problems/implement-strstr/
Implement strStr().
Given two strings needle and haystack, return the index of the first occurrence of needle in haystack, or -1 if needle is not part of haystack.

Clarification:
What should we return when needle is an empty string? This is a great question to ask during an interview.
For the purpose of this problem, we will return 0 when needle is an empty string. This is consistent to C's strstr() and Java's indexOf().
*/

const strStr = (haystack: string, needle: string): number => {
  if (!needle.length) return 0;
  for (let i = 0; i < haystack.length; i++) {
    if (haystack[i] === needle[0]) {
      let j = 0;
      while (needle[j] && haystack[i + j] === needle[j]) {
        j++;
      }
      if (j === needle.length) return i;
    }
  }
  return -1;
};

console.log(strStr("baaaaa", "bba"));
module.exports = strStr;
