/* https://leetcode.com/problems/valid-anagram/
Given two strings s and t, return true if t is an anagram of s, and false otherwise.
1 <= s.length, t.length <= 5 * 104
arguments consist of lowercase English letters.
*/

// no sorting this time
const isAnagram = (s: string, t: string): boolean => {
  if (s.length !== t.length) return false;
  const hashMap = new Map();

  for (let i = 0; i < s.length; i++) {
    hashMap.get(s[i])
      ? hashMap.set(s[i], hashMap.get(s[i]) + 1)
      : hashMap.set(s[i], 1);
    hashMap.get(t[i])
      ? hashMap.set(t[i], hashMap.get(t[i]) - 1)
      : hashMap.set(t[i], -1);
  }

  for (let [, value] of hashMap.entries()) {
    if (value) return false;
  }

  return true;
};

console.log(isAnagram("a", "ab"));
module.exports = isAnagram;
