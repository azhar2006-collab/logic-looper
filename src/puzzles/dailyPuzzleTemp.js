import { MathPuzzle } from "./mathPuzzle";
import { WordPuzzle } from "./wordPuzzle";
import { SequencePuzzle } from "./sequencePuzzle";
import { LogicPuzzle } from "./logicpuzzle";
import { PatternPuzzle } from "./patternPuzzle";

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
