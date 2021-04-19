const solution = require("./solution");

const {
  zero,
  one,
  two,
  three,
  four,
  five,
  six,
  seven,
  eight,
  nine,
  plus,
  minus,
  times,
  dividedBy,
} = solution;

test("1", () => {
  expect(seven(times(five()))).toBe(35);
});
test("2", () => {
  expect(four(plus(nine()))).toBe(13);
});
test("3", () => {
  expect(eight(minus(three()))).toBe(5);
});
test("4", () => {
  expect(six(dividedBy(two()))).toBe(3);
});
