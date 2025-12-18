import express from 'express'
import { toggleUserStatus, loadUsers, createUser } from '../controllers/userControllers.ts';
import { createPatient, loadPatients } from '../controllers/patientControllers.ts';

const channelRoute = express.Router();

channelRoute.get("/", loadPatients)
channelRoute.post("/", createPatient)
channelRoute.patch("/:id/status", toggleUserStatus)

export default channelRoute;