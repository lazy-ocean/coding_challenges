/*
Write a function that reverses a string. The input string is given as an array of characters s.
Follow up: Do not allocate extra space for another array. You must do this by modifying the input array in-place with O(1) extra memory.
*/

/*
two-poiter approach: 
Time complexity: O(N) to swap N/2N/2 element.
Space complexity: O(1), it's a constant space solution.
*/

const reverseString = (str) => {
  let first = 0;
  let last = str.length - 1;
  while (first < last) {
    const a = str[first];
    str[first] = str[last];
    str[last] = a;
    first++;
    last--;
  }
  return str;
};

module.exports = reverseString;
