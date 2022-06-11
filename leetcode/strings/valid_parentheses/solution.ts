/*
https://leetcode.com/problems/valid-parentheses/
Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:

Open brackets must be closed by the same type of brackets.
Open brackets must be closed in the correct order.
*/

const isValid = (s: string): boolean => {
  const map = {
    "]": "[",
    ")": "(",
    "}": "{",
  };

  const stack = [];

  for (let i = 0; i < s.length; i++) {
    // if we came to the closing bracket
    if (map[s[i]]) {
      // taking the last item from stack
      const el = stack.pop();
      // if it is not the pair opening bracket, combination is not valid
      if (el !== map[s[i]]) return false;
    } else {
      // push open brackets to the stack
      stack.push(s[i]);
    }
  }

  // if stack is empty, all opening brackets were correctly taken by its closing pair, so the combination is correct
  return !stack.length;
};

console.log(isValid("()[]{}"));
module.exports = isValid;
