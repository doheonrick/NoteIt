import express from "express";
import { getNote, getAllNotes, addNote, deleteNote, patchNote } from "../controllers/noteController.js";

const router = express.Router();

router.get("/:noteId", getNote);
router.get("/", getAllNotes);
router.post("/add", addNote);
router.delete("/:noteId", deleteNote);
router.patch("/:noteId", patchNote);

export default router;
