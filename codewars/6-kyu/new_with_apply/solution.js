/* https://www.codewars.com/kata/53c7da8baf72924af8000405/train/javascript
In JavaScript we can create objects using the new operator.
For example, if you have this constructor function:
new operator is evil because it produces a highly coupled code, difficult to maintain and test.

Some patterns to reduce coupling are object factories or dependency injection.
These patterns can benefit of the construct() function. This function receives a constructor function and possibly some arguments and it returns a new object constructed with the function and the passed arguments.
Your work is to implement the construct() function.
*/

const construct = (cls, arg) => {
  const obj = Object.create(cls.prototype);
  cls.apply(obj, [arg]);
  return obj;
};

function Greeting(name) {
  this.name = name;
}
Greeting.prototype.sayHello = function () {
  return `Hello ${this.name}`;
};
Greeting.prototype.sayBye = function () {
  return `Bye ${this.name}`;
};

const greeting = construct(Greeting, "max");

console.log(greeting.sayBye());
