import { BasePuzzle } from "./basepuzzle";

export class LogicPuzzle extends BasePuzzle {
  constructor() {
    const statements = [
      { q: "5 is greater than 3", a: true },
      { q: "10 is less than 4", a: false },
      { q: "7 + 2 equals 9", a: true },
      { q: "6 is an even number", a: true },
      { q: "3 multiplied by 3 is 6", a: false },
    ];

    const item = statements[Math.floor(Math.random() * statements.length)];

    super({
      question: `True or False: ${item.q}`,
      answer: item.a,
        hint: "Think about basic math or logic.",
    });
  }

  validate(answer) {
    return String(answer).toLowerCase() === String(this.data.answer);
  }
}
