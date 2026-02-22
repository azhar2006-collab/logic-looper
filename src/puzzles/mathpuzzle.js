import { BasePuzzle } from "./basePuzzle";

export class MathPuzzle extends BasePuzzle {
  constructor() {
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);

    super({
      question: `${num1} + ${num2} = ?`,
      answer: num1 + num2,
       hint: `It’s the sum of ${num1} and ${num2}`,
    });
  }
}
