const isValid = (s: string): boolean => {
  const map = {
    "]": "[",
    ")": "(",
    "}": "{",
  };

  const stack = [];

  for (let i = 0; i < s.length; i++) {
    if (map[s[i]]) {
      const el = stack.pop();
      if (el !== map[s[i]]) return false;
    } else {
      stack.push(s[i]);
    }
  }

  return !stack.length;
};

console.log(isValid("()[]{}"));
module.exports = isValid;
