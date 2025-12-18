import express from 'express'
import { toggleUserStatus, loadUsers, createUser } from '../controllers/userControllers.ts';
import { createPatient, loadPatients } from '../controllers/patientControllers.ts';

const patientRoute = express.Router();

patientRoute.get("/", loadPatients)
patientRoute.post("/", createPatient)
patientRoute.patch("/:id/status", toggleUserStatus)

export default patientRoute;