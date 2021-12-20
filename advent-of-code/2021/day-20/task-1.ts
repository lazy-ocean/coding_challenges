/* eslint-disable no-restricted-syntax */
export {};
const fs = require("fs");

const dataset: string = fs.readFileSync(
  "advent-of-code/2021/day-20/test.txt",
  "utf8",
  () => null
);

const input: string[] = dataset.split("\n");
const algo = input[0];

const image: string[][] = input
  .splice(2, input.length)
  .map((line) => line.split(""));

const generateMap = (i: number, j: number, baseImg) => {
  const result = [];
  const grid = [
    [i - 1, j - 1],
    [i - 1, j],
    [i - 1, j + 1],
    [i, j - 1],
    [i, j],
    [i, j + 1],
    [i + 1, j - 1],
    [i + 1, j],
    [i + 1, j + 1],
  ];
  grid.forEach(([x, y]) => {
    if (baseImg[x]) {
      const item = baseImg[x][y] ? baseImg[x][y] : "#";
      result.push(item);
    } else result.push("#");
  });
  return algo[parseInt(result.map((it) => (it === "#" ? 0 : 1)).join(""), 2)];
};

const enhance = (orig: string[][]) => {
  let step = 2;
  let workingImg = orig;
  let counter = 0;
  const iter = (img: string[][]) => {
    const res = new Map();
    for (let i = -5; i < img.length + 5; i++) {
      if (!res.has(i)) res.set(i, []);
      for (let j = -5; j < img[0].length + 5; j++) {
        const set = res.get(i);
        set.push(generateMap(i, j, img));
        res.set(i, set);
      }
    }
    const result = [];
    for (const value of res.values()) {
      result.push(value);
    }
    return result;
  };

  while (step) {
    const temp = iter(workingImg);
    workingImg = temp;
    step--;
  }
  workingImg.forEach((l) =>
    l.forEach((el) => {
      if (el === ".") counter++;
    })
  );
  return counter;
};
console.log(enhance(image));
