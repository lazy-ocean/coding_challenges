const solution = require("./solution");

const id = (a) => "id is: " + a;
const num = (a) => "000" + a;
test("1", () => {
  expect(solution(id, num)(1)).toBe("id is: 0001");
});
test("2", () => {
  expect(solution(id, num)(567)).toBe("id is: 000567");
});

const num2 = (a, b) => `000${a + b}`;
test("multiple args", () => {
  expect(solution(id, num2)(1, 3)).toBe("id is: 0004");
});
