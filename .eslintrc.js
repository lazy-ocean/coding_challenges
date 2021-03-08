module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
    "jest/globals": true,
  },
  extends: ["airbnb-base"],
  parserOptions: {
    ecmaVersion: 12,
  },
  plugins: ["jest"],
  rules: {
    quotes: 0,
    "no-plusplus": "off",
    "no-console": "off",
    "comma-dangle": "off",
    "max-len": ["error", { ignoreComments: true }],
    "no-param-reassign": "warning",
  },
};