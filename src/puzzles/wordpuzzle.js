import { BasePuzzle } from "./basepuzzle";

export class WordPuzzle extends BasePuzzle {
  constructor() {
    const words = ["react", "puzzle", "logic", "brain", "code"];
    const word = words[Math.floor(Math.random() * words.length)];

    const scrambled = word
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");

    super({
      question: `Unscramble: ${scrambled}`,
      answer: word,
        hint: `Starts with "${word[0]}"`,
    });
  }

  validate(answer) {
    return answer.toLowerCase() === this.data.answer;
  }
}
