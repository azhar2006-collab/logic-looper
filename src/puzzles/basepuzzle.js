export class BasePuzzle {
  constructor(data) {
    this.data = data;
  }

  getQuestion() {
    return this.data.question;
  }
    getHint() {
    return this.data.hint || "No hint available.";
  }


validate(answer) {
  return String(answer).toLowerCase() ===
         String(this.data.answer).toLowerCase();
}
}
