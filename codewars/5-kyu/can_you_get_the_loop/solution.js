/* https://www.codewars.com/kata/52a89c2ea8ddc5547a000863/train/javascript
You are given a node that is the beginning of a linked list. This list always contains a tail and a loop.

Your objective is to determine the length of the loop.

For example in the following picture the tail's size is 3 and the loop size is 11.
*/
function loopSize(node) {
  const visited = [];
  let n = node;

  // push all nodes to visited till we found the one we've visited already
  while (!visited.includes(n)) {
    visited.push(n);
    n = n.getNext();
  }
  // index of visited node would equal the length of the tail
  return visited.length - visited.indexOf(n);
}

/* THIS SOLUTION DOESNT WORK GOOD WITH LONG TAIL, NEEDS REFACTORING
MOVING COUNTER TO A SEPARATE WHILE LOOP (TO ONCE AGAIN GO FROM START TO FINISH) IS NON-EFFECTIVE

function loopSize(node){
  let startP = node;
  let finishP = node;
  let counter = 0
  
  while (finishP && finishP.getNext()) {
    ++counter
    startP = startP.getNext();
    finishP = finishP.getNext().getNext();
    if (startP === finishP) {
      return counter;
    };
  }
  return false;
} */
