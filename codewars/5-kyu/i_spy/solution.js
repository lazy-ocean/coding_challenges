/* https://www.codewars.com/kata/555185132c0d4cca3d000197/train/javascript
For this kata, implement a spyOn function which takes any function func as a parameter and returns a spy for func. The returned spy must be callable in the same manner as the original func, and include the following additional properties/methods:

.callCount() — returns the number of times spy has been called
.wasCalledWith(val) – returns true if spy was ever called with val, else returns false.
.returned(val) — returns true if spy ever returned val, else returns false
*/

const spyOn = (func) => {
  const spy = (...args) => {
    spy.counter += 1;
    spy.args = [...spy.args, ...args];
    const res = func.apply(this, [...args]);
    spy.results.push(res);
    return res;
  };

  spy.counter = 0;
  spy.args = [];
  spy.results = [];
  spy.callCount = () => spy.counter;
  spy.wasCalledWith = (arg) => spy.args.includes(arg);
  spy.returned = (res) => spy.results.includes(res);
  return spy;
};

module.exports = spyOn;
