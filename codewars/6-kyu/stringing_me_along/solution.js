/* https://www.codewars.com/kata/55f4a44eb72a0fa91600001e/train/javascript
Implement a function that receives a string, and lets you extend it with repeated calls. When no argument is passed you should return a string consisting of space-separated words you've received earlier.

Note: there will always be at least 1 string; all inputs will be non-empty.
*/

const createMessage = (x) => {
  if (x === undefined) {
    const res = createMessage.sentence.join(" ");
    createMessage.sentence = null;
    return res;
  }
  if (createMessage.sentence) {
    createMessage.sentence.push(x);
  } else {
    createMessage.sentence = [x];
  }
  return createMessage;
};

const b = createMessage("Hello")("World!")("how")("are")("you?")();
console.log(b);

module.exports = createMessage;
