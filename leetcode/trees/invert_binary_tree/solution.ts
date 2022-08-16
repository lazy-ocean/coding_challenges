/** https://leetcode.com/problems/invert-binary-tree/
 * Given the root of a binary tree, invert the tree, and return its root.
 *
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

const test1: TreeNode = {
  val: 1,
  left: { val: 2, left: null, right: null },
  right: { val: 3, left: null, right: null },
};

const invertTree = (root: TreeNode | null): TreeNode | null => {
  if (!root) return root;
  [root.left, root.right] = [invertTree(root.right), invertTree(root.left)];
  return root;
};

const invertTree2 = (root: TreeNode | null): TreeNode | null => {
  const stack = [root];
  while (stack.length) {
    const node = stack.pop();
    if (node) {
      [node.left, node.right] = [node.right, node.left];
      /**
       * ORR
       * const temp = node.left;
       * node.left = node.right;
       * node.right = temp;
       */
      stack.push(node.left, node.right);
    }
  }
  return root;
};
console.log(invertTree(test1));
/* console.log(invertTree2(test1)); */
module.exports = invertTree;
