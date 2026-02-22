import { MathPuzzle } from "./mathpuzzle";
import { WordPuzzle } from "./wordpuzzle";
import { SequencePuzzle } from "./sequencepuzzle";
import { LogicPuzzle } from "./logicpuzzle";
import { PatternPuzzle } from "./patternpuzzle";

export function getDailyPuzzle() {
  const puzzles = [
    MathPuzzle,
    WordPuzzle,
    SequencePuzzle,
    LogicPuzzle,
    PatternPuzzle,
  ];

  // Get today's date as seed
  const today = new Date();
  const seed =
    today.getFullYear() +
    today.getMonth() +
    today.getDate();

  // Pick puzzle based on seed
  const index = seed % puzzles.length;

  const PuzzleClass = puzzles[index];
  return new PuzzleClass();
}
