/* eslint-disable no-return-assign */
/* --- Day 12: Passage Pathing ---
--- Part Two ---
After reviewing the available paths, you realize you might have time to visit a single small cave twice. Specifically, big caves can be visited any number of times, a single small cave can be visited at most twice, and the remaining small caves can be visited at most once. However, the caves named start and end can only be visited exactly once each: once you leave the start cave, you may not return to it, and once you reach the end cave, the path must end immediately.

Now, the 36 possible paths through the first example above are:

start,A,b,A,b,A,c,A,end
start,A,b,A,b,A,end
start,A,b,A,b,end
start,A,b,A,c,A,b,A,end
start,A,b,A,c,A,b,end
start,A,b,A,c,A,c,A,end
start,A,b,A,c,A,end
start,A,b,A,end
start,A,b,d,b,A,c,A,end
start,A,b,d,b,A,end
start,A,b,d,b,end
start,A,b,end
start,A,c,A,b,A,b,A,end
start,A,c,A,b,A,b,end
start,A,c,A,b,A,c,A,end
start,A,c,A,b,A,end
start,A,c,A,b,d,b,A,end
start,A,c,A,b,d,b,end
start,A,c,A,b,end
start,A,c,A,c,A,b,A,end
start,A,c,A,c,A,b,end
start,A,c,A,c,A,end
start,A,c,A,end
start,A,end
start,b,A,b,A,c,A,end
start,b,A,b,A,end
start,b,A,b,end
start,b,A,c,A,b,A,end
start,b,A,c,A,b,end
start,b,A,c,A,c,A,end
start,b,A,c,A,end
start,b,A,end
start,b,d,b,A,c,A,end
start,b,d,b,A,end
start,b,d,b,end
start,b,end
The slightly larger example above now has 103 paths through it, and the even larger example now has 3509 paths through it.

Given these new rules, how many paths through this cave system are there?
*/

export {};
const fs = require("fs");

const dataset: string = fs.readFileSync(
  "advent-of-code/2021/day-12/data.txt",
  "utf8",
  () => null
);

interface Data {
  [key: string]: string[];
}

const input: Data = dataset
  .split("\n")
  .map((line) => line.split("-"))
  .reduce((acc, caves) => {
    const buildTree = (cave1, cave2) => {
      if (cave2 !== "start")
        // eslint-disable-next-line no-unused-expressions
        acc[cave1] ? acc[cave1].push(cave2) : (acc[cave1] = [cave2]);
    };
    buildTree(caves[0], caves[1]);
    buildTree(caves[1], caves[0]);
    return acc;
  }, {});

const countPaths = (data: Data) => {
  let paths = 0;
  const search = (node: string, stack = [], isVisitedTwice = false) => {
    if (node === "end") {
      paths++;
      return;
    }
    if (node.toLowerCase() === node) {
      if (stack.includes(node)) {
        isVisitedTwice = true;
      }
      stack = [...stack, node];
    }
    const children = data[node];
    children
      .filter((i: string) => !isVisitedTwice || !stack.includes(i))
      .forEach((item: string) => search(item, stack, isVisitedTwice));
  };

  search("start");
  return paths;
};

console.log(countPaths(input));
