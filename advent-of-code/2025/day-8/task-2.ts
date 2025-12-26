/* --- Day 8: Playground ---
Equipped with a new understanding of teleporter maintenance, you confidently step onto the repaired teleporter pad.

You rematerialize on an unfamiliar teleporter pad and find yourself in a vast underground space which contains a giant playground!

Across the playground, a group of Elves are working on setting up an ambitious Christmas decoration project. Through careful rigging, they have suspended a large number of small electrical junction boxes.

Their plan is to connect the junction boxes with long strings of lights. Most of the junction boxes don't provide electricity; however, when two junction boxes are connected by a string of lights, electricity can pass between those two junction boxes.

The Elves are trying to figure out which junction boxes to connect so that electricity can reach every junction box. They even have a list of all of the junction boxes' positions in 3D space (your puzzle input).

For example:

162,817,812
57,618,57
906,360,560
592,479,940
352,342,300
466,668,158
542,29,236
431,825,988
739,650,466
52,470,668
216,146,977
819,987,18
117,168,530
805,96,715
346,949,466
970,615,88
941,993,340
862,61,35
984,92,344
425,690,689
This list describes the position of 20 junction boxes, one per line. Each position is given as X,Y,Z coordinates. So, the first junction box in the list is at X=162, Y=817, Z=812.

To save on string lights, the Elves would like to focus on connecting pairs of junction boxes that are as close together as possible according to straight-line distance. In this example, the two junction boxes which are closest together are 162,817,812 and 425,690,689.

By connecting these two junction boxes together, because electricity can flow between them, they become part of the same circuit. After connecting them, there is a single circuit which contains two junction boxes, and the remaining 18 junction boxes remain in their own individual circuits.

Now, the two junction boxes which are closest together but aren't already directly connected are 162,817,812 and 431,825,988. After connecting them, since 162,817,812 is already connected to another junction box, there is now a single circuit which contains three junction boxes and an additional 17 circuits which contain one junction box each.

The next two junction boxes to connect are 906,360,560 and 805,96,715. After connecting them, there is a circuit containing 3 junction boxes, a circuit containing 2 junction boxes, and 15 circuits which contain one junction box each.

The next two junction boxes are 431,825,988 and 425,690,689. Because these two junction boxes were already in the same circuit, nothing happens!

This process continues for a while, and the Elves are concerned that they don't have enough extension cables for all these circuits. They would like to know how big the circuits will be.

After making the ten shortest connections, there are 11 circuits: one circuit which contains 5 junction boxes, one circuit which contains 4 junction boxes, two circuits which contain 2 junction boxes each, and seven circuits which each contain a single junction box. Multiplying together the sizes of the three largest circuits (5, 4, and one of the circuits of size 2) produces 40.

Your list contains many junction boxes; connect together the 1000 pairs of junction boxes which are closest together. Afterward, what do you get if you multiply together the sizes of the three largest circuits?
*/

export {};
const fs = require("fs");

const dataset = fs.readFileSync(
  "advent-of-code/2025/day-8/data.txt",
  "utf8",
  () => null
);
const boxes = dataset.split("\n").map((line) => line.split(","));

const findDistance = ([x1, y1, z1], [x2, y2, z2]) =>
  Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2 + (z2 - z1) ** 2);

const distancesMap = new Map();
const allDistances = new Map();

boxes.forEach((box, i) => {
  const boxname = box.join(";");
  const distances = distancesMap.has(boxname)
    ? distancesMap.get(boxname)
    : new Map();

  boxes.forEach((subbox, j) => {
    if (i !== j) {
      const subboxName = subbox.join(";");

      if (!distances.has(subboxName)) {
        const distance = findDistance(box, subbox);
        distances.set(subboxName, distance);
        const jointName = [boxname, subboxName].join("+");
        allDistances.set(jointName, distance);

        if (distancesMap.has(subboxName)) {
          const dists = distancesMap.get(subboxName);
          dists.set(boxname, distance);
          distancesMap.set(subboxName, dists);
        } else {
          const newDists = new Map();
          newDists.set(boxname, distance);
          distancesMap.set(subboxName, newDists);
        }
      }
    }
  });

  distancesMap.set(boxname, distances);
});

const values = [...allDistances.entries()].sort((a, b) => a[1] - b[1]);

const circuits = [];

const LIMIT = 1000000;
const createCircuits = () => {
  let step = 0;

  while (step < LIMIT) {
    console.log(step);
    step++;
    const currNodes = values.shift();

    const [a, b] = currNodes[0].split("+");

    let existingCircuitIdx = -1;
    existingCircuitIdx = circuits.findIndex((circuit) => circuit.includes(a));

    let existingCircuitIdxB = -1;
    existingCircuitIdxB = circuits.findIndex((circuit) => circuit.includes(b));

    const existingCircuitA = circuits[existingCircuitIdx];

    const existingCircuitB = circuits[existingCircuitIdxB];
    const isInExistingCircuit =
      (existingCircuitIdx > -1 && existingCircuitA.includes(b)) ||
      (existingCircuitIdxB > -1 && existingCircuitB.includes(a));

    if (!isInExistingCircuit) {
      if (existingCircuitIdx > -1 && existingCircuitIdxB > -1) {
        const addition = [
          ...new Set([...existingCircuitA, ...existingCircuitB]),
        ];
        if (existingCircuitIdx > existingCircuitIdxB) {
          circuits.splice(existingCircuitIdx, 1);
          circuits.splice(existingCircuitIdxB, 1);
        } else {
          circuits.splice(existingCircuitIdxB, 1);
          circuits.splice(existingCircuitIdx, 1);
        }
        circuits.push(addition);
      } else if (existingCircuitA) {
        const addition = [...existingCircuitA, b];
        circuits.splice(existingCircuitIdx, 1, addition);
      } else if (existingCircuitB) {
        const addition = [...existingCircuitB, a];
        circuits.splice(existingCircuitIdxB, 1, addition);
      } else {
        const addition = [a, b];
        circuits.push(addition);
      }
      if (circuits.length === 1 && circuits[0].length === boxes.length) {
        return { a, b };
      }
    }
  }
  return undefined;
};

const findMult = () => {
  const { a, b } = createCircuits();
  const numA = Number(a.split(";")[0]);
  const numB = Number(b.split(";")[0]);
  return numA * numB;
};

console.log(findMult());
