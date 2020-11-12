/* https://www.codewars.com/kata/550554fd08b86f84fe000a58/javascript
Given two arrays of strings a1 and a2 return a sorted array r in lexicographical order of the strings of a1 which are substrings of strings of a2.
#Example 1: a1 = ["arp", "live", "strong"]
a2 = ["lively", "alive", "harp", "sharp", "armstrong"]
returns ["arp", "live", "strong"]

#Example 2: a1 = ["tarp", "mice", "bull"]
a2 = ["lively", "alive", "harp", "sharp", "armstrong"]
returns []
*/

function inArray(array1, array2) {
  return array1
    .filter((substr) => {
      return array2.filter((str) => str.includes(substr)).length ? true : false;
    })
    .sort();
}

let arr1 = ["xyz", "live", "strong"];
let arr2 = ["lively", "alive", "harp", "sharp", "armstrong"];
console.log(inArray(arr1, arr2));
module.exports = inArray;
