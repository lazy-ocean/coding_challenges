const Base = require("../base");

function StringBuilder(str) {
  Object.assign(this, new Base(str));
}
StringBuilder.prototype = Object.create(Base.prototype);

StringBuilder.prototype.remove = function (char) {
  this.initArgument = this.initArgument.split(char).join("");
  return this;
};

StringBuilder.prototype.sub = function (from, n) {
  this.initArgument = this.initArgument.substring(from, n + 1);
  return this;
};

module.exports = StringBuilder;
