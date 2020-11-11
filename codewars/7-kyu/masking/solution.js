/*
Usually when you buy something, you're asked whether your credit card number, phone number or answer to your most secret question is still correct. However, since someone could look over your shoulder, you don't want that shown on your screen. Instead, we mask it.

Your task is to write a function maskify, which changes all but the last four characters into '#'.
*/

const maskify = (cc) => {
  const length = cc.length;
  const last4 = cc.substring(length - 4);
  return last4.padStart(length, "#");
};
module.exports = maskify;
