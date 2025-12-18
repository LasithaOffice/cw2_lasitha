import express from 'express'
import { toggleUserStatus, getAllUsers, createUser } from '../controllers/userControllers.ts';

const userRoute = express.Router();

userRoute.get("/", getAllUsers)
userRoute.post("/", createUser)
userRoute.patch("/:id/status", toggleUserStatus)

export default userRoute;