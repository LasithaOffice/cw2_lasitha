import express from 'express'
import { createScanRequest, getAllScans } from '../controllers/scanControllers.ts';

const scanRoute = express.Router();

scanRoute.post("/", createScanRequest)
scanRoute.get("/", getAllScans)

export default scanRoute;