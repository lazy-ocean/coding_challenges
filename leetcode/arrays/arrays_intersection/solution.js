/*
Given two arrays, write a function to compute their intersection.
Each element in the result should appear as many times as it shows in both arrays.
The result can be in any order.
*/
function intersection(nums1, nums2) {
  let map1 = reducer(nums1);
  let map2 = reducer(nums2);
  let res = [];
  Object.keys(map1).forEach((key) => {
    let i;
    if (map1[key] && map2[key]) {
      if (map1[key] === map2[key]) {
        i = map1[key];
      } else {
        i = map1[key] > map2[key] ? map2[key] : map1[key];
      }
    }
    while (i > 0) {
      res.push(~~key);
      i -= 1;
    }
  });
  return res;
}

let reducer = (arr) => {
  return arr.reduce((acc, num) => {
    acc[num] ? (acc[num] += 1) : (acc[num] = 1);
    return acc;
  }, {});
};

console.log(intersection([1, 2, 3, 3, 1], [2, 3, 3]));
module.exports = intersection;

// SAME BUT IN STRICT ORDER
function intersection(nums1, nums2) {
  let str1 = nums1.join(" ");
  let str2 = nums2.join(" ");
  let trimmedStr, leadingStr;
  if (str1.length >= str2.length) {
    trimmedStr = str2;
    leadingStr = str1;
  } else {
    trimmedStr = str1;
    leadingStr = str2;
  }
  while (trimmedStr.length >= 1) {
    console.log(trimmedStr);
    if (leadingStr.includes(trimmedStr))
      return trimmedStr
        .split(" ")
        .filter(Boolean)
        .map((i) => parseInt(i));
    trimmedStr = trimmedStr.slice(0, -1);
  }
  return false;
}
