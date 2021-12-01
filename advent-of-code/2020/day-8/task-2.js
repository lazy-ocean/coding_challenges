/* --- Day 8: Part Two ---
After some careful analysis, you believe that exactly one instruction is corrupted.

Somewhere in the program, either a jmp is supposed to be a nop, or a nop is supposed to be a jmp. (No acc instructions were harmed in the corruption of this boot code.)

The program is supposed to terminate by attempting to execute an instruction immediately after the last instruction in the file. By changing exactly one jmp or nop, you can repair the boot code and make it terminate correctly.

For example, consider the same program from above.
If you change the first instruction from nop +0 to jmp +0, it would create a single-instruction infinite loop, never leaving that instruction. If you change almost any of the jmp instructions, the program will still eventually find another jmp instruction and loop forever.

However, if you change the second-to-last instruction (from jmp -4 to nop -4), the program terminates! The instructions are visited in this order:

nop +0  | 1
acc +1  | 2
jmp +4  | 3
acc +3  |
jmp -3  |
acc -99 |
acc +1  | 4
nop -4  | 5
acc +6  | 6
After the last instruction (acc +6), the program terminates by attempting to run the instruction below the last instruction in the file. With this change, after the program terminates, the accumulator contains the value 8 (acc +1, acc +1, acc +6).

Fix the program so that it terminates normally by changing exactly one jmp (to nop) or nop (to jmp). What is the value of the accumulator after the program terminates?
*/

const fs = require("fs");
const _ = require("lodash");

let file = fs.readFileSync("day-8/data.txt", "utf8", (err, data) => {});
let data = file.split("\n").map((instr) => {
  let split = instr.split(" ");
  let command = split[0];
  let inst = split[1];
  return { [command]: inst };
});

let changedI = [];
const findLoop = () => {
  let input = _.cloneDeep(data);
  let acc = 0;
  let changeParam = false;
  for (let i = 0; i < input.length; i++) {
    let key = Object.keys(input[i])[0];
    let value = input[i][key];
    if (value === "visited") {
      if (i === input.length - 1) {
        return acc;
      } else {
        return findLoop();
      }
    }

    let op = value.slice(0, 1);
    let num = value.slice(1);

    if (key === "acc") {
      acc = eval(`${acc}${op}${num}`);
      input[i][key] = "visited";
    }
    if (key === "jmp") {
      if (!changeParam) {
        if (changedI.includes(i)) {
          i = eval(`${i}${op}${num}-1`);
          input[i][key] = "visited";
        } else {
          changedI.push(i);
          changeParam = true;
          input[i][key] = "visited";
        }
      } else {
        i = eval(`${i}${op}${num}-1`);
      }
    }
  }
  return acc;
};
console.log(findLoop());
