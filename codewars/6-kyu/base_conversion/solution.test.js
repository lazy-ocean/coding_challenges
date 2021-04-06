const solution = require("./solution");

const Alphabet = {
  BINARY: "01",
  OCTAL: "01234567",
  DECIMAL: "0123456789",
  HEXA_DECIMAL: "0123456789abcdef",
  ALPHA_LOWER: "abcdefghijklmnopqrstuvwxyz",
  ALPHA_UPPER: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  ALPHA: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
  ALPHA_NUMERIC:
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
};

const tests = {
  1: [["15", Alphabet.DECIMAL, Alphabet.BINARY], "1111"],
  2: [["15", Alphabet.DECIMAL, Alphabet.OCTAL], "17"],
  3: [["1010", Alphabet.BINARY, Alphabet.DECIMAL], "10"],
  4: [["1010", Alphabet.BINARY, Alphabet.HEXA_DECIMAL], "a"],
  5: [["0", Alphabet.DECIMAL, Alphabet.ALPHA], "a"],
  6: [["27", Alphabet.DECIMAL, Alphabet.ALPHA_LOWER], "bb"],
  7: [["hello", Alphabet.ALPHA_LOWER, Alphabet.HEXA_DECIMAL], "320048"],
  8: [["SAME", Alphabet.ALPHA_UPPER, Alphabet.ALPHA_UPPER], "SAME"],
};

Object.keys(tests).forEach((testKey) => {
  const args = tests[testKey][0];
  test(testKey, () => {
    // eslint-disable-next-line no-unused-expressions
    Array.isArray(args)
      ? expect(solution(...args)).toBe(tests[testKey][1])
      : expect(solution(args)).toBe(tests[testKey][1]);
  });
});
