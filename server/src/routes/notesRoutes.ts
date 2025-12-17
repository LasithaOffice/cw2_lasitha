import express from 'express'
import { createNote, deleteNote, getAllNotes, getNoteById, updateNote } from '../controllers/notesControllers.ts';

const notesRoute = express.Router();

notesRoute.get("/", getAllNotes)

notesRoute.get("/:id", getNoteById)

notesRoute.post("/", createNote)

notesRoute.patch("/:id", updateNote)

notesRoute.delete("/:id", deleteNote)

export default notesRoute;