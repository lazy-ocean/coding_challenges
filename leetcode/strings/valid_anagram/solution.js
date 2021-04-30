/*
Given two strings s and t, return true if t is an anagram of s, and false otherwise.
1 <= s.length, t.length <= 5 * 104
arguments consist of lowercase English letters.
*/

const isAnagram = (str, anagr) => {
  const string = [...str].sort();
  const anagram = [...anagr].sort();
  return string.join() === anagram.join();
};

console.log(isAnagram("rat", "cat"));
module.exports = isAnagram;
