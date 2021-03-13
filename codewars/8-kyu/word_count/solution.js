/* https://www.codewars.com/kata/570cc83df616a85944001315/train/javascript
Can you realize a function that returns word count from a given string?
You have to ensure that spaces in string is a whitespace for real.
What we want and finish of work:
What kind of tests we got for your code:
Function have to count words, but not spaces, so be sure that it does right.
Empty string has no words.
String with spaces around should be trimmed.
Non-whitespace (ex. breakspace, unicode chars) should be assumed as delimiter
Be sure that words with chars like -, ', ` are counted right.
*/

const wordCount = (str) => {
  const words = str.match(/\S+/gi);
  return words ? words.length : 0;
};

console.log(wordCount("  Hello Gomer  "));
module.exports = wordCount;
