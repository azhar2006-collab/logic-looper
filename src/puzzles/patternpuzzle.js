import { BasePuzzle } from "./basepuzzle";

export class PatternPuzzle extends BasePuzzle {
  constructor() {
    const patterns = [
      { q: "A, B, C, ?", a: "D" },
      { q: "2, 4, 6, ?", a: "8" },
      { q: "X, Y, Z, ?", a: "A" },
      { q: "10, 20, 30, ?", a: "40" },
    ];

    const item = patterns[Math.floor(Math.random() * patterns.length)];

    super({
      question: `Complete the pattern: ${item.q}`,
      answer: item.a,
        hint: "Look at how the sequence progresses.",
    });
  }

  validate(answer) {
    return answer.toString().toUpperCase() === this.data.answer;
  }
}
