/*
Input: Array of elements
["h","o","l","a"]

Output: String with comma delimited elements of the array in th same order.
"h,o,l,a"
*/

const printArray = (array) => array.join();

console.log(printArray([2, 4, 5, 2]));
module.exports = printArray;
