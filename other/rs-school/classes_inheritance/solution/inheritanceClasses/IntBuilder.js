const Base = require("../base");

class IntBuilder extends Base {
  /* uselesss constructror under eslint rules, works fine without using "super" keyword.
  constructor(n) {
    super(n);
  } */

  static random(min, max) {
    return Math.floor(Math.random() * max) + min;
  }

  mod(n) {
    this.initArgument %= n;
    return this;
  }
}

module.exports = IntBuilder;
