import express from 'express'
import { createScanRequest, getAllScans, getSingleScanRequest, updateScanRequest } from '../controllers/scanControllers.ts';

const scanRoute = express.Router();

scanRoute.post("/", createScanRequest)
scanRoute.get("/", getAllScans)
scanRoute.get("/:id", getSingleScanRequest)
scanRoute.patch("/", updateScanRequest)

export default scanRoute;