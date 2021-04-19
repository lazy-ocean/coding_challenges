/* https://www.codewars.com/kata/55f9b48403f6b87a7c0000bd/train/javascript
Your classmates asked you to copy some paperwork for them. You know that there are 'n' classmates and the paperwork has 'm' pages.

Your task is to calculate how many blank pages do you need. If n < 0 or m < 0 return 0.
*/
const paperwork = (n, m) => (n <= 0 || m <= 0 ? 0 : n * m);

console.log(paperwork(4, 6));
module.exports = paperwork;
