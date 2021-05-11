module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
    "jest/globals": true,
  },
  extends: ["airbnb-base", "prettier"],
  parserOptions: {
    ecmaVersion: 12,
  },
  plugins: ["jest"],
  rules: {
    quotes: 0,
    "no-plusplus": "off",
    "no-console": "off",
    "comma-dangle": "off",
    "no-param-reassign": 1,
    "implicit-arrow-linebreak": "off",
    "function-paren-newline": "off",
  },
};
