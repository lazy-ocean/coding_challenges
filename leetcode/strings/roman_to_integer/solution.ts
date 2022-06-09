const map = {
  I: 1,
  V: 5,
  X: 10,
  L: 50,
  C: 100,
  D: 500,
  M: 1000,
};

const romanToInt = (str: string): number => {
  const arr = str.split("").map((i) => map[i]);
  let res = 0;

  for (let i = 0; i < arr.length; i++) {
    res = arr[i + 1] && arr[i + 1] > arr[i] ? res - arr[i] : res + arr[i];
  }
  return res;
};

console.log(romanToInt("MCMXCIV"));
module.exports = romanToInt;
