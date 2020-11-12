/* https://www.codewars.com/kata/513e08acc600c94f01000001/train/javascript
The rgb function is incomplete. Complete it so that passing in RGB decimal values will result in a hexadecimal representation being returned. Valid decimal values for RGB are 0 - 255. Any values that fall out of that range must be rounded to the closest valid value.

Note: Your answer should always be 6 characters long, the shorthand with 3 will not work here.
*/

function rgb(r, g, b) {
  let args = [r, g, b];
  return args
    .map((item) => {
      return item < 0 ? 0 : item > 255 ? 255 : item;
    })
    .map((item) => item.toString(16).padStart(2, 0))
    .join("")
    .toUpperCase();
}

module.exports = rgb;
