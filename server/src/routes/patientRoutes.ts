import express from 'express'
import { createPatient, loadPatients } from '../controllers/patientControllers.ts';

const patientRoute = express.Router();

patientRoute.get("/", loadPatients)
patientRoute.post("/", createPatient)

export default patientRoute;