import express from 'express'
import { createChannel, getAllChannel, getLastChannelId } from '../controllers/channelControllers.ts';

const channelRoute = express.Router();

channelRoute.get("/lastId", getLastChannelId)
channelRoute.post("/", createChannel)
channelRoute.get("/", getAllChannel)
// channelRoute.post("/", createPatient)
// channelRoute.patch("/:id/status", toggleUserStatus)

export default channelRoute;