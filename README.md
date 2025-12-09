# coding_challenges

A simple set-up to crack code challenges, executing in VS Code and testing with Jest as you go.

## To do

### You'll need on your computer:

- Node.js
- npm / yarn
- [Jest](https://jestjs.io/) (testing)
- [nodemon](https://nodemon.io/) (watching for changes and executing JavaScript code in the console)

### How does it work

1. Copy `example` folder and rename for your challenge
2. Modify `solution.test.js` according to your tests:

```
const tests = {
  // Format:
  // 'test name': [[arguments], expected result]
  "adds 1 + 2 to equal 3": [[1, 2], 3],
  "adds 1 + 5 to equal 6": [[1, 5], 6],

  // if there's only one argument:
  "some name": [1, 6],

  // if an array is argumented:
  "some name": [[[2, 3]], 6],

  // add any number of tests
};
```

3. Work in `solution.js` as usual
4. To execute your code on every save:

```
$ bun run ./folder-name/solution.js
```

5. To run tests:

```
$ yarn test ./folder-name
```

or with testing on every save

```
$ yarn test ./folder-name --watch
```
