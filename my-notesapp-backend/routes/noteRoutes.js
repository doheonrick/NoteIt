const express = require("express");
const { getNote, getAllNotes, addNote, deleteNote, patchNote } = require("../controllers/noteController")

const app = express();
app.use(express.json());

const router = express.Router();

router.get("/:noteId", getNote);
router.get("/", getAllNotes);
router.post("/add", addNote);
router.delete("/:noteId", deleteNote);
router.patch("/:noteId", patchNote);

module.exports = router;