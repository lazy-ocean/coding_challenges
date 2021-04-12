/* https://www.codewars.com/kata/525481903700c1a1ff0000e1/train/javascript
If you are calculating complex things or execute time-consuming API calls, you sometimes want to cache the results. In this case we want you to create a function wrapper, which takes a function and caches its results depending on the arguments, that were applied to the function.
*/
function cache(func) {
  const cached = {};
  return function (...args) {
    if (!args.length && Object.keys(cached).includes("empty")) {
      return cached.empty;
    }
    const argsString = args
      .map((arg) => {
        if (typeof arg === "object") {
          return Object.keys(arg)
            .map((key) => `${key}: ${arg[key]}`)
            .join("");
        } else return arg;
      })
      .join(",");
    if (cached[argsString]) {
      console.log("retrieved");
      return cached[argsString];
    }

    const result = func.apply(this, args);
    if (args.length) {
      cached[argsString] = result;
    } else {
      cached.empty = result;
    }
    console.log("cached");
    return result;
  };
}
