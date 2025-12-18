import Channel from "../models/Channel.ts";
import Patient from "../models/Patient.ts";
import User from "../models/User.ts";

export async function createChannel(req, res) {
  try {
    const { patientId, doctor_id, dateTime, channelNo } = req.body;
    // const count = await Channel.countDocuments();
    const newChannel = new Channel({
      channelNo,
      patient: patientId,
      doctor: doctor_id,
      dateTime
    })
    await newChannel.save()
    res.status(201).json({ message: "Channel is created" })
  } catch (error) {
    console.log("Error creating Channel", error);
    res.status(500).json({
      message: "Internal server error",
      error: error
    })
  }
}

export async function getLastChannelId(req, res) {
  try {
    const count = await Channel.countDocuments();
    res.status(200).json({
      message: "Channel is created",
      data: count
    })
  } catch (error) {
    console.log("Error creating Channel", error);
    res.status(500).json({
      message: "Internal server error",
      error: error
    })
  }
}