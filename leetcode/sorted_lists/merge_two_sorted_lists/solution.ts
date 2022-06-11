/*
https://leetcode.com/problems/merge-two-sorted-lists/
You are given the heads of two sorted linked lists list1 and list2.

Merge the two lists in a one sorted list. The list should be made by splicing together the nodes of the first two lists.

Return the head of the merged linked list.
*/

interface ListNode {
  val: number;
  next: ListNode | null;
}

const mergeTwoLists = (list1: ListNode, list2: ListNode | null): ListNode => {
  // fake node for starters
  const newList: ListNode = { val: 0, next: null };
  // tracking current node
  let current = newList;
  while (list1 && list2) {
    if (list1.val > list2.val) {
      // if smaller, add node as next
      current.next = list2;
      // getting rid of used node
      list2 = list2.next;
    } else {
      // if smaller, add node as next
      current.next = list1;
      // getting rid of used node
      list1 = list1.next;
    }
    // changing current pointer to the node that was just set
    current = current.next;
  }

  // if something is left from list1 or two, just setting it as next cause it has nodelist structure and is sorted
  current.next = list1 || list2;

  return newList.next;
};

console.log(
  mergeTwoLists(
    { val: 1, next: { val: 2, next: { val: 5, next: null } } },
    { val: 1, next: { val: 3, next: { val: 4, next: null } } }
  )
);
module.exports = mergeTwoLists;
