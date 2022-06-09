const longestCommonPrefix2 = (strs: string[]): string => {
  const temp = [];

  if (strs.length < 1) return strs[0];

  for (let i = 0; i < strs[0].length; i++) {
    if (strs[0][i] === strs[1][i]) {
      temp.push(strs[0].slice(0, i + 1));
    } else break;
  }

  for (let i = temp.length; i >= 0; i--) {
    if (strs.every((s) => s.startsWith(temp[i]))) return temp[i];
  }

  return "";
};

const longestCommonPrefix = (strs: string[]): string => {
  let res = "";

  if (!strs.length) return "";

  for (let i = 0; i < strs[0].length; i++) {
    for (let j = 0; j < strs.length - 1; j++) {
      if (strs[j][i] !== strs[j + 1][i]) {
        return res;
      }
    }
    res += strs[0][i];
  }

  return res;
};

console.log(longestCommonPrefix(["flower", "flow", "flight"]));
module.exports = longestCommonPrefix;
