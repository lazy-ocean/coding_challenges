import parseInput from "./task-1";
/* --- Part Two ---
The sandstorm is upon you and you aren't any closer to escaping the wasteland. You had the camel follow the instructions, but you've barely left your starting position. It's going to take significantly more steps to escape!

What if the map isn't for people - what if the map is for ghosts? Are ghosts even bound by the laws of spacetime? Only one way to find out.

After examining the maps a bit longer, your attention is drawn to a curious fact: the number of nodes with names ending in A is equal to the number ending in Z! If you were a ghost, you'd probably just start at every node that ends with A and follow all of the paths at the same time until they all simultaneously end up at nodes that end with Z.

For example:

LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)
Here, there are two starting nodes, 11A and 22A (because they both end with A). As you follow each left/right instruction, use that instruction to simultaneously navigate away from both nodes you're currently on. Repeat this process until all of the nodes you're currently on end with Z. (If only some of the nodes you're on end with Z, they act like any other node and you continue as normal.) In this example, you would proceed as follows:

Step 0: You are at 11A and 22A.
Step 1: You choose all of the left paths, leading you to 11B and 22B.
Step 2: You choose all of the right paths, leading you to 11Z and 22C.
Step 3: You choose all of the left paths, leading you to 11B and 22Z.
Step 4: You choose all of the right paths, leading you to 11Z and 22B.
Step 5: You choose all of the left paths, leading you to 11B and 22C.
Step 6: You choose all of the right paths, leading you to 11Z and 22Z.
So, in this example, you end up entirely on nodes that end in Z after 6 steps.

Simultaneously start on every node that ends with A. How many steps does it take before you're only on nodes that end with Z?


*/
export {};
const { instructions, directions } = parseInput();

const countSteps = (next: string): number => {
  let currDir = 0;
  let steps = 0;
  let n = next;
  while (!n.endsWith("Z")) {
    steps++;
    const d = directions[currDir] === "L" ? 0 : 1;
    const node = instructions[n];
    n = node[d];

    if (n.endsWith("Z")) return steps;
    currDir + 1 === directions.length ? (currDir = 0) : currDir++;
  }
  return steps;
};

// https://stackoverflow.com/questions/31302054/how-to-find-the-least-common-multiple-of-a-range-of-numbers
const greatestCommonDivisor = (a: number, b: number): number => {
  let first = a;
  let second = b;
  while (second !== 0) {
    const temp = second;
    second = first % second;
    first = temp;
  }
  return first;
};

const leastCommonMultiple = (nums: number[]): number => {
  let res = nums[0];
  for (let i = 1; i < nums.length; i++) {
    res = (res * nums[i]) / greatestCommonDivisor(res, nums[i]);
  }
  return res;
};

const countCommonSteps = (): number => {
  const startingNodes = Object.keys(instructions).filter((key) =>
    key.endsWith("A")
  );

  const loops = startingNodes.map((node) => countSteps(node));

  return leastCommonMultiple(loops);
};

console.log(countCommonSteps());
