import express from 'express'
import { createNote, deleteNote, getAllNotes, getNoteById, updateNote } from '../controllers/notesControllers.ts';
import { createAccount, signin } from '../controllers/authControllers.ts';

const authRoute = express.Router();

authRoute.post("/signin", signin)
authRoute.post("/create", createAccount)

export default authRoute;