import express from 'express'
import { createNote, deleteNote, getAllNotes, getNoteById, updateNote } from '../controllers/notesControllers.ts';
import { createAccount, signin } from '../controllers/authControllers.ts';
import { enableDisableUser, loadUsers } from '../controllers/userControllers.ts';

const userRoute = express.Router();

userRoute.post("/", loadUsers)
userRoute.post("/enableOrDisable/:id", enableDisableUser)

export default userRoute;