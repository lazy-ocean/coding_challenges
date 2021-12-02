module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
    "jest/globals": true,
  },
  extends: [
    "airbnb-base",
    "prettier",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 12,
  },
  plugins: ["jest", "@typescript-eslint"],
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  rules: {
    quotes: 0,
    "no-plusplus": "off",
    "no-console": "off",
    "comma-dangle": "off",
    "no-param-reassign": 1,
    "implicit-arrow-linebreak": "off",
    "function-paren-newline": "off",
    "@typescript-eslint/no-var-requires": 0,
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": ["error"],
    "import/extensions": [
      "warn",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],
  },
};
