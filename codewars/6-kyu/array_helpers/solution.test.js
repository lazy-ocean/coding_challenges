const numbers = require("./solution");

test("1", () => {
  expect(numbers.square()).toStrictEqual([1, 4, 9, 16, 25]);
});
test("2", () => {
  expect(numbers.cube()).toStrictEqual([1, 8, 27, 64, 125]);
});
test("3", () => {
  expect(numbers.average()).toBe(3);
});
test("4", () => {
  expect(numbers.sum()).toBe(15);
});
test("5", () => {
  expect(numbers.even()).toStrictEqual([2, 4]);
});
test("6", () => {
  expect(numbers.odd()).toStrictEqual([1, 3, 5]);
});
