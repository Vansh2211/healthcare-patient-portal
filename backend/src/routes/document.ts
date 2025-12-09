import { Router } from "express";
import multer from "multer";
import fs from "fs";
import { db } from "../db";

const router = Router();

if (!fs.existsSync("uploads")) fs.mkdirSync("uploads");

const upload = multer({
  dest: "uploads/",
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "application/pdf")
      return cb(new Error("Only PDF allowed"));
    cb(null, true);
  }
});

// UPLOAD DOCUMENT
router.post("/upload", upload.single("file"), (req, res) => {
  const file = req.file!;

  const stmt = db.prepare(
    "INSERT INTO documents (filename, filepath, filesize, created_at) VALUES (?, ?, ?, datetime('now'))"
  );

  stmt.run(file.originalname, file.path, file.size, function (this: any) {
    res.json({
      message: "Uploaded",
      document: {
        id: this.lastID,
        filename: file.originalname,
        filepath: file.path,
        filesize: file.size
      }
    });
  });
});

// LIST DOCUMENTS
router.get("/", (req, res) => {
  db.all("SELECT * FROM documents", (err, rows) => {
    res.json(rows);
  });
});

// DOWNLOAD DOCUMENT
router.get("/:id", (req, res) => {
  db.get(
    "SELECT * FROM documents WHERE id = ?",
    [req.params.id],
    (err, row: { filepath: string; filename: string } | undefined) => {
      if (!row) return res.status(404).send("Not found");
      res.download(row.filepath, row.filename);
    }
  );
});

// DELETE DOCUMENT
router.delete("/:id", (req, res) => {
  db.get(
    "SELECT * FROM documents WHERE id = ?",
    [req.params.id],
    (err, row: { filepath: string } | undefined) => {
      if (!row) return res.status(404).send("Not found");

      fs.unlinkSync(row.filepath);

      db.run("DELETE FROM documents WHERE id = ?", [req.params.id]);
      res.json({ message: "Deleted" });
    }
  );
});

export default router;
