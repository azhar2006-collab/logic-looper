import { useState, useEffect, useMemo, useCallback } from "react";
import { auth, provider } from "./firebase";
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut
} from "firebase/auth";
import { getDailyPuzzle } from "./puzzles/dailyPuzzleTemp";
import { motion } from "framer-motion";

import {
  saveProgress,
  getProgress,
  saveStreak,
  getStreak,
  saveLastSolvedDate,
  getLastSolvedDate,
  saveScore,
  getScore,
} from "./db";

function App() {
  const puzzle = useMemo(() => getDailyPuzzle(), []);
  const [user, setUser] = useState(null);
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState("");
  const [solved, setSolved] = useState(false);
  const [streak, setStreak] = useState(0);
  const [hint, setHint] = useState("");
  const [hintUsed, setHintUsed] = useState(false);
  const [score, setScore] = useState(0);

  const todayKey = new Date().toDateString();
  const lastPlayedKey = "lastPlayedDate";

  //  Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  //  Load Progress
  useEffect(() => {
    const loadProgress = async () => {
      const today = new Date().toDateString();
      const lastPlayed = await getProgress(lastPlayedKey);

      const currentScore = await getScore();
      setScore(currentScore);

      if (lastPlayed !== today) {
        setSolved(false);
        setAnswer("");
        setResult("");
        setHint("");
        setHintUsed(false);
        await saveProgress(lastPlayedKey, today);
      }

      const saved = await getProgress(todayKey);
      if (saved) {
        setSolved(true);
        setResult("Correct! Puzzle solved 🎉");
      }

      const currentStreak = await getStreak();
      setStreak(currentStreak);
    };

    loadProgress();
  }, []);

  //  Login
  const login = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error(error);
    }
  };

  //Logout
  const logout = async () => {
    await signOut(auth);
  };

  //Hint
  const showHint = useCallback(() => {
    if (hintUsed) return;
    setHint(puzzle.getHint());
    setHintUsed(true);
  }, [hintUsed, puzzle]);

  // Check Answer
  const checkAnswer = useCallback(async () => {
    if (solved) return;

    const correct = puzzle.validate(answer);

    if (correct) {
      setResult("Correct! Puzzle solved 🎉");
      setSolved(true);
      await saveProgress(todayKey, true);

      const lastDate = await getLastSolvedDate();
      const today = new Date().toDateString();
      const yesterday = new Date(Date.now() - 86400000).toDateString();

      let newStreak = 1;

      if (lastDate === yesterday) {
        const currentStreak = await getStreak();
        newStreak = currentStreak + 1;
      }

      await saveStreak(newStreak);
      await saveLastSolvedDate(today);
      setStreak(newStreak);

      let points = hintUsed ? 5 : 10;
      const currentScore = await getScore();
      const newScore = currentScore + points;

      await saveScore(newScore);
      setScore(newScore);
    } else {
      setResult("Wrong answer. Try again.");
    }
  }, [answer, solved, hintUsed, puzzle]);

  //  Show Login Screen First
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <h1 className="text-3xl font-bold mb-6 text-blue-600">
          Logic Looper
        </h1>
        <button
          onClick={login}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          Sign in with Google
        </button>
      </div>
    );
  }

  //  Main App UI
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">

      {/* Header */}
      <header className="w-full bg-white shadow-md py-4 flex justify-between items-center px-6">
        <h1 className="text-xl sm:text-2xl font-bold text-blue-600">
          Daily Puzzle
        </h1>

        <div className="flex items-center gap-4">
          <p className="text-sm text-gray-600">
            {user.displayName}
          </p>
          <button
            onClick={logout}
            className="text-red-500 text-sm"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Puzzle Card */}
      <div className="flex flex-col items-center justify-center flex-1">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{
            opacity: 1,
            y: 0,
            backgroundColor: solved ? "#ecfdf5" : "#ffffff",
          }}
          transition={{ duration: 0.5 }}
          className="shadow-lg rounded-xl p-6 sm:p-8 w-[90%] max-w-sm text-center space-y-4"
        >
          <p className="text-green-600 font-semibold">
            ⭐ Score: {score}
          </p>

          <motion.p
            key={streak}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="text-orange-500 font-semibold"
          >
            🔥 Streak: {streak} days
          </motion.p>

          <h2 className="text-xl font-semibold text-gray-800">
            {puzzle.getQuestion()}
          </h2>

          <input
            className="w-full border px-4 py-3 rounded text-black text-lg"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Your answer"
            disabled={solved}
          />

          <button
            onClick={showHint}
            className="w-full bg-yellow-500 text-white py-3 rounded text-lg"
            disabled={hintUsed || solved}
          >
            Show Hint
          </button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={checkAnswer}
            className="w-full bg-blue-600 text-white py-3 rounded text-lg"
            disabled={solved}
          >
            Submit
          </motion.button>

          {result && (
            <motion.p
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: [1.2, 0.95, 1], opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="font-medium text-gray-700"
            >
              {result}
            </motion.p>
          )}

          {hint && (
            <p className="text-sm text-gray-500">
              Hint: {hint}
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default App;