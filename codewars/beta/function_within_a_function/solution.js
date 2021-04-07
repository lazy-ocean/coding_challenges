/* https://www.codewars.com/kata/a-function-within-a-function
Given an input n, write a function always that returns a function which returns n. 
var three = always(3);
three(); // returns 3
*/
const always = (n) => () => n;
