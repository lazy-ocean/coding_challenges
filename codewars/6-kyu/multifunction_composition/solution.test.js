const solution = require("./solution");

const addOne = (a) => a + 1;
const multTwo = (b) => b * 2;

test("1", () => {
  expect(solution(multTwo, addOne)(5)).toBe(12);
});
test("2", () => {
  expect(solution(addOne, multTwo, addOne, addOne)(2)).toBe(9);
});
test("3", () => {
  expect(solution(addOne)(3)).toBe(4);
});
test("4", () => {
  expect(solution()(10)).toBe(10);
});
