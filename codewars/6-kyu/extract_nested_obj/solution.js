/* eslint-disable no-extend-native */
/* https://www.codewars.com/kata/527a6e602a7db3456e000a2b/train/javascript
You are given a complex object that has many deeply nested variables. You don't want to go the usual if obj.property == null route. Create a prototype method that given a nested path, either return the value or undefined.
*/

Object.prototype.hash = function (str) {
  const route = str.split(".");
  let i = 0;
  let res = this;

  while (i < route.length) {
    if (!res[route[i]]) return undefined;
    res = res[route[i]];
    i++;
  }
  return res;
};

const obj = {
  person: {
    name: "joe",
    history: {
      hometown: "bratislava",
      bio: {
        funFact: "I like fishing.",
      },
    },
  },
};

module.exports = obj;
