/* eslint-disable no-extend-native */
Array.prototype.square = function () {
  return this.map((item) => item ** 2);
};
Array.prototype.cube = function () {
  return this.map((item) => item ** 3);
};
Array.prototype.average = function () {
  return this.sum() / this.length;
};
Array.prototype.sum = function () {
  return this.reduce((a, b) => a + b, 0);
};
Array.prototype.even = function () {
  return this.filter((item) => item % 2 === 0);
};
Array.prototype.odd = function () {
  return this.filter((item) => item % 2 !== 0);
};

const numbers = [1, 2, 3, 4, 5];

module.exports = numbers;
