/* --- Day 5: Supply Stacks ---
The expedition can depart as soon as the final supplies have been unloaded from the ships. Supplies are stored in stacks of marked crates, but because the needed supplies are buried under many other crates, the crates need to be rearranged.

The ship has a giant cargo crane capable of moving crates between stacks. To ensure none of the crates get crushed or fall over, the crane operator will rearrange them in a series of carefully-planned steps. After the crates are rearranged, the desired crates will be at the top of each stack.

The Elves don't want to interrupt the crane operator during this delicate procedure, but they forgot to ask her which crate will end up where, and they want to be ready to unload them as soon as possible so they can embark.

They do, however, have a drawing of the starting stacks of crates and the rearrangement procedure (your puzzle input). For example:

    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2
In this example, there are three stacks of crates. Stack 1 contains two crates: crate Z is on the bottom, and crate N is on top. Stack 2 contains three crates; from bottom to top, they are crates M, C, and D. Finally, stack 3 contains a single crate, P.

Then, the rearrangement procedure is given. In each step of the procedure, a quantity of crates is moved from one stack to a different stack. In the first step of the above rearrangement procedure, one crate is moved from stack 2 to stack 1, resulting in this configuration:

[D]        
[N] [C]    
[Z] [M] [P]
 1   2   3 
In the second step, three crates are moved from stack 1 to stack 3. Crates are moved one at a time, so the first crate to be moved (D) ends up below the second and third crates:

        [Z]
        [N]
    [C] [D]
    [M] [P]
 1   2   3
Then, both crates are moved from stack 2 to stack 1. Again, because crates are moved one at a time, crate C ends up below crate M:

        [Z]
        [N]
[M]     [D]
[C]     [P]
 1   2   3
Finally, one crate is moved from stack 1 to stack 2:

        [Z]
        [N]
        [D]
[C] [M] [P]
 1   2   3
The Elves just need to know which crate will end up on top of each stack; in this example, the top crates are C in stack 1, M in stack 2, and Z in stack 3, so you should combine these together and give the Elves the message CMZ.

After the rearrangement procedure completes, what crate ends up on top of each stack?
*/
export {};
const fs = require("fs");

const dataset: string = fs.readFileSync(
  "advent-of-code/2022/day-5/data.txt",
  "utf8",
  () => null
);
const input = dataset.split("\n");

export interface Plan {
  [key: number]: string[];
}

export const parseInput = (
  data: string[]
): { plan: Plan; instructions: Array<string[]> } => {
  const divider = data.findIndex((item) => item === "");
  const map = data.slice(0, divider - 1).reverse();
  const planLength = Number(
    data
      .slice(divider - 1, divider)[0]
      .trim()
      .slice(-1)
  );
  const instructions = data.slice(divider + 1);
  const plan = {};
  const totalSteps = planLength;

  map.forEach((floor: string) => {
    let currStep = 1;
    while (currStep <= totalSteps) {
      const dock = floor.slice(0, 3);
      if (dock.replace(/\s/g, "") !== "")
        plan[currStep] ? plan[currStep].push(dock) : (plan[currStep] = [dock]);
      floor = floor.slice(4);
      currStep++;
    }
  });

  const parsedInstr = instructions.map((instr) =>
    instr.split(" ").filter((item) => !item.match(/[a-zA-Z]/))
  );
  return { plan, instructions: parsedInstr };
};

const findNewPlan = (data: string[]): Plan => {
  const { plan, instructions } = parseInput(data);
  const newPlan = { ...plan };
  instructions.forEach((instr) => {
    const [count, from, to] = instr;
    let steps = Number(count);
    while (steps) {
      const item = newPlan[from].pop();
      newPlan[to].push(item);
      steps--;
    }
  });
  return newPlan;
};

export const findTopItem = (plan: Plan): string =>
  Object.values(plan)
    .map((item) => item[item.length - 1])
    .join("")
    .split("")
    .filter((item) => item.match(/[a-zA-Z]/))
    .join("");

console.log(findTopItem(findNewPlan(input)));
