import express from 'express'
import { toggleUserStatus, loadUsers, createUser } from '../controllers/userControllers.ts';

const userRoute = express.Router();

userRoute.get("/", loadUsers)
userRoute.post("/", createUser)
userRoute.patch("/:id/status", toggleUserStatus)

export default userRoute;