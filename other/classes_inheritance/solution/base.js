class Base {
  constructor(initArgument) {
    this.initArgument = initArgument;
    this.type = typeof this.initArgument;
  }

  get() {
    return this.initArgument;
  }

  plus(...args) {
    const newValue =
      this.type === "string"
        ? [this.initArgument, ...args].join("")
        : [this.initArgument, ...args].reduce((a, b) => a + b);
    this.initArgument = newValue;
    return this;
  }

  minus(...args) {
    const newValue =
      this.type === "string"
        ? this.initArgument.substring(0, this.initArgument.length - args)
        : [this.initArgument, ...args].reduce((a, b) => a - b);
    this.initArgument = newValue;
    return this;
  }

  multiply(n) {
    const newValue = this.type === "string" ? this.initArgument.repeat(n) : this.initArgument * n;
    this.initArgument = newValue;
    return this;
  }

  divide(n) {
    const newValue =
      this.type === "string"
        ? this.initArgument.substring(0, Math.floor(this.initArgument.length / n))
        : Math.abs(this.initArgument / n);
    this.initArgument = newValue;
    return this;
  }
}

module.exports = Base;
