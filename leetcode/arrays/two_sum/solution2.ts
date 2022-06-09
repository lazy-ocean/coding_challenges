const twoSums = (nums: number[], target: number): number[] => {
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] <= target) {
      const temp = target - nums[i];
      const ind = nums.indexOf(temp);
      if (ind >= 0 && ind !== i) return [i, ind];
    }
  }
  return [];
};

const twoSums2 = (nums: number[], target: number): number[] => {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const temp = target - nums[i];
    if (map.has(temp) && map.get(temp) !== i) return [i, map.get(temp)];
    map.set(nums[i], i);
  }
  return [];
};

console.log(twoSums([3, 3], 6));
module.exports = twoSums;
