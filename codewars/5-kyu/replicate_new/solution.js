/* https://www.codewars.com/kata/558cb3df5f511f40d500001d/javascript
TL;DR: write a nouveau function that replicates all the behavior of the new operator.

So what about new? Well, the unary operator new is intended to create "instances" of a constructor function. To be more precise, the operation new Constructor(arg1, arg2, ...argX) does the following:

Creates an empty object (which we'll call instance) which prototypally inherits from Constructor.prototype
Binds Constructor to instance (meaning this is instance) and invokes Constructor with any arguments passed in
If the return value of Constructor is an object (including arrays, functions, dates, regexes, etc.) the operation evaluates to that object
Otherwise, the operation evaluates to instance.
Your mission: write a function nouveau (that's French for "new") which takes one function parameter (the constructor), plus an unknown number of additional parameters of any type (arguments for the constructor). When invoked, nouveau should do everything new does and return the same object new would evaluate to, as specified above.
*/

const nouveau = (constructor, ...args) => {
  const obj = Object.create(constructor.prototype);
  const instance = constructor.apply(obj, args);

  if (
    typeof instance === "function" ||
    (typeof instance === "object" && instance !== null)
  )
    return instance;
  return obj;
};
