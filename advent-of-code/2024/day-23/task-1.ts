/* --- Day 23: LAN Party ---
As The Historians wander around a secure area at Easter Bunny HQ, you come across posters for a LAN party scheduled for today! Maybe you can find it; you connect to a nearby datalink port and download a map of the local network (your puzzle input).

The network map provides a list of every connection between two computers. For example:

kh-tc
qp-kh
de-cg
ka-co
yn-aq
qp-ub
cg-tb
vc-aq
tb-ka
wh-tc
yn-cg
kh-ub
ta-co
de-co
tc-td
tb-wq
wh-td
ta-ka
td-qp
aq-cg
wq-ub
ub-vc
de-ta
wq-aq
wq-vc
wh-yn
ka-de
kh-ta
co-tc
wh-qp
tb-vc
td-yn
Each line of text in the network map represents a single connection; the line kh-tc represents a connection between the computer named kh and the computer named tc. Connections aren't directional; tc-kh would mean exactly the same thing.

LAN parties typically involve multiplayer games, so maybe you can locate it by finding groups of connected computers. Start by looking for sets of three computers where each computer in the set is connected to the other two computers.

In this example, there are 12 such sets of three inter-connected computers:

aq,cg,yn
aq,vc,wq
co,de,ka
co,de,ta
co,ka,ta
de,ka,ta
kh,qp,ub
qp,td,wh
tb,vc,wq
tc,td,wh
td,wh,yn
ub,vc,wq
If the Chief Historian is here, and he's at the LAN party, it would be best to know that right away. You're pretty sure his computer's name starts with t, so consider only sets of three computers where at least one computer's name starts with t. That narrows the list down to 7 sets of three inter-connected computers:

co,de,ta
co,ka,ta
de,ka,ta
qp,td,wh
tb,vc,wq
tc,td,wh
td,wh,yn
Find all the sets of three inter-connected computers. How many contain at least one computer with a name that starts with t?
*/
export {};
const fs = require("fs");

const dataset: string = fs.readFileSync(
  "advent-of-code/2024/day-23/data.txt",
  "utf8",
  () => null
);

const input = dataset.split("\n").map((line) => line.split("-"));

const graph = new Map();

const createMap = () => {
  input.forEach((item) => {
    const [a, b] = item;
    const mapA = graph.get(a);
    const mapB = graph.get(b);

    if (mapA) {
      graph.set(a, [...mapA, b]);
    } else graph.set(a, [b]);

    if (mapB) {
      graph.set(b, [...mapB, a]);
    } else graph.set(b, [a]);
  });
  return graph;
};

const checkCycle = (
  currNode: string,
  searchedNode: string,
  inclT: boolean
): Array<string> => {
  const res = [];
  const relations = graph.get(currNode);
  relations.forEach((relation) => {
    if (relation === searchedNode) return;
    const rel = graph.get(relation);
    if (!inclT && !relation.startsWith("t")) return;
    if (rel.includes(searchedNode)) {
      const result = [currNode, searchedNode, relation].sort().join("-");
      res.push(result);
    }
  });
  return res;
};

const checkNodes = (node: string): Set<string> => {
  const inclT = node.startsWith("t");
  const cycles = new Set<string>();
  const relations = graph.get(node);
  relations.forEach((relation) => {
    const inclTlocal = inclT || relation.startsWith("t");
    const res = checkCycle(relation, node, inclTlocal);
    if (res.length) {
      res.forEach((item) => cycles.add(item));
    }
  });
  return cycles;
};

createMap();

const findAllCycles = (): number => {
  let allCycles = new Set();
  const keys = [...graph.keys()];

  keys.forEach((key) => {
    const res = checkNodes(key);
    if (res.size) {
      allCycles = allCycles.union(res);
    }
  });
  return allCycles.size;
};

console.log(findAllCycles());
