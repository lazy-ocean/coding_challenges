/*
Given two arrays, write a function to compute their intersection.
Each element in the result should appear as many times as it shows in both arrays.
The result can be in any order.
*/

const reducer = (arr) =>
  arr.reduce((acc, num) => {
    acc[num] ? (acc[num] += 1) : (acc[num] = 1);
    return acc;
  }, {});

const intersection = (nums1, nums2) => {
  const map1 = reducer(nums1);
  const map2 = reducer(nums2);
  const res = [];
  Object.keys(map1).forEach((key) => {
    // i is for determing how many repeated nums are there
    let i;
    if (map1[key] && map2[key]) {
      if (map1[key] === map2[key]) {
        i = map1[key];
        console.log(map1[key]);
      } else {
        i = map1[key] > map2[key] ? map2[key] : map1[key];
      }
    }
    // adding existing in both arrs number to result i times;
    while (i > 0) {
      res.push(~~key);
      i -= 1;
    }
  });
  return res;
};

console.log(intersection([1, 2, 3, 3, 1], [7, 3, 3, 1]));
module.exports = intersection;
