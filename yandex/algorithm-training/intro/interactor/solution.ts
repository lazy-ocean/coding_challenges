/* A. Interactor
Write a module that would return a verdict for an interactive task. The verdict comes from a task execution code, an interactor verdict and a checker verdict:
- Checker and interactor verdicts = numbers from 0 to 7 (including).
- Task execution code: number from -128 to 127 (including).

If interactor verdict is 0, result verdict is 3 if a task execution code is not zero, otherwise it equals checker result.
If interactor verdict is 1, result verdict equals checker verdict.
If interactor verdict is 4, result verdict is 3 if a task execution code is not zero, otherwise it is 4
If interactor verdict is 1, result verdict equals 0.
If interactor verdict is 7, result verdict equals 1.
Otherwise result verdict is 0.

Input: a file input.txt
 */

const fs = require("fs");

const input = fs.readFileSync("interactor/input.txt", "utf8", () => null);

const data: [number, number, number] = input
  .toString()
  .split("\n")
  .map((item: string) => Number(item));

const interactor = (
  taskCode: number,
  interactorResult: number,
  checker: number
): number => {
  switch (interactorResult) {
    case 0:
      return taskCode ? 3 : checker;
    case 1:
      return checker;
    case 4:
      return taskCode ? 3 : 4;
    case 6:
      return 0;
    case 7:
      return 1;
    default:
      return interactorResult;
  }
};

const result = interactor(...data);
/* fs.writeFileSync("interactor/output.txt", result.toString()) */
module.exports = interactor;
