/* eslint-disable no-return-assign */
/*
Given a mixed array of number and string representations of integers, add up the string integers and subtract this from the total of the non-string integers.
Return as a number.
*/
const divCon = (x) => {
  let nums = 0;
  let strings = 0;
  // prettier-ignore
  x.forEach((num) =>
    (typeof num === "number" ? (nums += num) : (strings += ~~num)));
  return nums - strings;
};

console.log(divCon(["5", "0", 9, 3, 2, 1, "9", 6, 7]));
module.exports = divCon;
