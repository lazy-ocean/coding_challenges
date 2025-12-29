/* --- Part Two ---
Thanks in part to your analysis, the Elves have figured out a little bit about the issue. They now know that the problematic data path passes through both dac (a digital-to-analog converter) and fft (a device which performs a fast Fourier transform).

They're still not sure which specific path is the problem, and so they now need you to find every path from svr (the server rack) to out. However, the paths you find must all also visit both dac and fft (in any order).

For example:

svr: aaa bbb
aaa: fft
fft: ccc
bbb: tty
tty: ccc
ccc: ddd eee
ddd: hub
hub: fff
eee: dac
dac: fff
fff: ggg hhh
ggg: out
hhh: out
This new list of devices contains many paths from svr to out:

svr,aaa,fft,ccc,ddd,hub,fff,ggg,out
svr,aaa,fft,ccc,ddd,hub,fff,hhh,out
svr,aaa,fft,ccc,eee,dac,fff,ggg,out
svr,aaa,fft,ccc,eee,dac,fff,hhh,out
svr,bbb,tty,ccc,ddd,hub,fff,ggg,out
svr,bbb,tty,ccc,ddd,hub,fff,hhh,out
svr,bbb,tty,ccc,eee,dac,fff,ggg,out
svr,bbb,tty,ccc,eee,dac,fff,hhh,out
However, only 2 paths from svr to out visit both dac and fft.

Find all of the paths that lead from svr to out. How many of those paths visit both dac and fft?
*/

export {};
const fs = require("fs");

const dataset = fs.readFileSync(
  "advent-of-code/2025/day-11/data.txt",
  "utf8",
  () => null
);

const data = dataset
  .split("\n")
  .map((line) => line.split(": "))
  .reduce(
    (acc, item) => {
      const [node, paths] = item;
      acc[node] = { paths: paths.split(" "), visited: 0 };
      return acc;
    },
    { out: { visited: 0 } }
  );

const cache = {};

const traverse = (node: string, seenDac: boolean, seenFft: boolean) => {
  if (node === "out") {
    return seenDac && seenFft ? 1 : 0;
  }

  const key = `${node};dac:${seenDac};fft:${seenFft}`;
  if (cache[key] !== undefined) {
    return cache[key];
  }

  const dac = node === "dac" || seenDac;
  const fft = node === "fft" || seenFft;

  const { paths } = data[node];
  let sum = 0;
  paths.forEach((path) => {
    sum += traverse(path, dac, fft);
  });

  cache[key] = sum;
  return sum;
};

console.log(traverse("svr", false, false));
