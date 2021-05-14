const Base = require("../src/base");
const IntBuilder = require("../src/inheritanceClasses/IntBuilder");

let intBuilder = null;
beforeEach(() => {
  intBuilder = new IntBuilder(10);
});

test("init", () => {
  expect(intBuilder.get()).toBe(10);
});

test("instance of Base", () => {
  expect(intBuilder instanceof Base).toBeTruthy();
});

test("Base methods chaining", () => {
  expect(intBuilder.plus(1, 4).multiply(2).get()).toBe(30);
});

test("Own methods chaining", () => {
  expect(intBuilder.plus(2).mod(5).get()).toBe(2);
});

test("Methods mix", () => {
  expect(intBuilder.plus(5, 5).minus(5).mod(3).multiply(10).get()).toBe(0);
});

test("static method", () => {
  expect(IntBuilder.random(10, 100)).toBeGreaterThan(10);
  expect(IntBuilder.random(10, 100)).toBeLessThan(100);
});
