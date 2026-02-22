import { BasePuzzle } from "./basePuzzle";

export class SequencePuzzle extends BasePuzzle {
  constructor() {
    const start = Math.floor(Math.random() * 10);
    const step = Math.floor(Math.random() * 5) + 1;

    const sequence = [
      start,
      start + step,
      start + step * 2,
      start + step * 3,
    ];

    super({
      question: `Next number: ${sequence.join(", ")}, ?`,
      answer: start + step * 4,
        hint: `The pattern increases by ${step}`,
    });
  }
}
