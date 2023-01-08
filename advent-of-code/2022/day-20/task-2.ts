/* --- Part Two ---
The grove coordinate values seem nonsensical. While you ponder the mysteries of Elf encryption, you suddenly remember the rest of the decryption routine you overheard back at camp.

First, you need to apply the decryption key, 811589153. Multiply each number by the decryption key before you begin; this will produce the actual list of numbers to mix.

Second, you need to mix the list of numbers ten times. The order in which the numbers are mixed does not change during mixing; the numbers are still moved in the order they appeared in the original, pre-mixed list. (So, if -3 appears fourth in the original list of numbers to mix, -3 will be the fourth number to move during each round of mixing.)

Using the same example as above:

Initial arrangement:
811589153, 1623178306, -2434767459, 2434767459, -1623178306, 0, 3246356612

After 1 round of mixing:
0, -2434767459, 3246356612, -1623178306, 2434767459, 1623178306, 811589153

After 2 rounds of mixing:
0, 2434767459, 1623178306, 3246356612, -2434767459, -1623178306, 811589153

After 3 rounds of mixing:
0, 811589153, 2434767459, 3246356612, 1623178306, -1623178306, -2434767459

After 4 rounds of mixing:
0, 1623178306, -2434767459, 811589153, 2434767459, 3246356612, -1623178306

After 5 rounds of mixing:
0, 811589153, -1623178306, 1623178306, -2434767459, 3246356612, 2434767459

After 6 rounds of mixing:
0, 811589153, -1623178306, 3246356612, -2434767459, 1623178306, 2434767459

After 7 rounds of mixing:
0, -2434767459, 2434767459, 1623178306, -1623178306, 811589153, 3246356612

After 8 rounds of mixing:
0, 1623178306, 3246356612, 811589153, -2434767459, 2434767459, -1623178306

After 9 rounds of mixing:
0, 811589153, 1623178306, -2434767459, 3246356612, 2434767459, -1623178306

After 10 rounds of mixing:
0, -2434767459, 1623178306, 3246356612, -1623178306, 2434767459, 811589153
The grove coordinates can still be found in the same way. Here, the 1000th number after 0 is 811589153, the 2000th is 2434767459, and the 3000th is -1623178306; adding these together produces 1623178306.

Apply the decryption key and mix your encrypted file ten times. What is the sum of the three numbers that form the grove coordinates?
*/
export {};
const fs = require("fs");

const dataset: string = fs.readFileSync(
  "advent-of-code/2022/day-20/data.txt",
  "utf8",
  () => null
);

const input = dataset.split("\n").map(Number);
const key = 811589153;
const steps = 10;

const decodeSequence = (sequence: number[]): number => {
  sequence = sequence.map((item) => item * key);
  const newSequence = sequence.map((v: number, i: number) => ({
    num: v,
    id: i,
  }));

  for (let j = 0; j < steps; j++) {
    for (let i = 0; i < sequence.length; i++) {
      const ind = newSequence.findIndex((x) => x.id === i);
      newSequence.splice(ind, 1);
      newSequence.splice((sequence[i] + ind) % newSequence.length, 0, {
        num: sequence[i],
        id: i,
      });
    }
  }

  const zeroInd = newSequence.findIndex((x) => x.num === 0);

  return [1000, 2000, 3000].reduce(
    (prev, curr) =>
      prev + newSequence[(curr + zeroInd) % newSequence.length].num,
    0
  );
};

console.log(decodeSequence(input));
