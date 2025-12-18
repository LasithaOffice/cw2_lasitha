import express from 'express'
import { createChannel, getAllChannel, getLastChannelId, updateChannel } from '../controllers/channelControllers.ts';

const channelRoute = express.Router();

channelRoute.get("/lastId", getLastChannelId)
channelRoute.post("/", createChannel)
channelRoute.get("/", getAllChannel)
channelRoute.patch("/", updateChannel)
// channelRoute.post("/", createPatient)
// channelRoute.patch("/:id/status", toggleUserStatus)

export default channelRoute;