import { openDB } from "idb";

export const dbPromise = openDB("puzzle-db", 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains("progress")) {
      db.createObjectStore("progress");
    }
  },
});

export async function saveProgress(key, value) {
  const db = await dbPromise;
  return db.put("progress", value, key);
}

export async function getProgress(key) {
  const db = await dbPromise;
  return db.get("progress", key);
}
export async function saveStreak(streak) {
  const db = await dbPromise;
  return db.put("progress", streak, "streak");
}

export async function getStreak() {
  const db = await dbPromise;
  return (await db.get("progress", "streak")) || 0;
}

export async function saveLastSolvedDate(date) {
  const db = await dbPromise;
  return db.put("progress", date, "lastSolved");
}

export async function getLastSolvedDate() {
  const db = await dbPromise;
  return db.get("progress", "lastSolved");
}
export async function saveScore(score) {
  const db = await dbPromise;
  return db.put("progress", score, "score");
}

export async function getScore() {
  const db = await dbPromise;
  return (await db.get("progress", "score")) || 0;
}

