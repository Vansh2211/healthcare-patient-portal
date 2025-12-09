import sqlite3 from "sqlite3";
import path from "path";

export const db = new sqlite3.Database(
  path.join(__dirname, "../../database.db")
);

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS documents (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      filename TEXT,
      filepath TEXT,
      filesize INTEGER,
      created_at TEXT
    )
  `);
});
