const isPalindromeString = (s: string) => {
  const sanitized = s.toLowerCase().match(/[a-z0-9]/g);
  if (!sanitized) return true;
  const middle = Math.round(sanitized.length / 2);

  for (
    let i = 0, j = sanitized.length - 1;
    i <= middle && j >= middle;
    i++, j--
  ) {
    if (sanitized[i] !== sanitized[j]) return false;
  }
  return true;
};

console.log(isPalindromeString("A man, a plan, a canal: Panama"));
console.log(isPalindromeString("race a car"));
console.log(isPalindromeString(""));
module.exports = isPalindromeString;
