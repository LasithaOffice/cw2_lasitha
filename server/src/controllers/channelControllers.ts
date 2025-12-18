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
      data: count + 1000000
    })
  } catch (error) {
    console.log("Error creating Channel", error);
    res.status(500).json({
      message: "Internal server error",
      error: error
    })
  }
}

export async function getAllChannel(req, res) {

  const {
    date,
    doctorId,
    patientId,
    channelStatus,
    scanStatus,
  } = req.query;
  const filter: any = {};

  if (doctorId) filter.doctor = doctorId;
  if (patientId) filter.patient = patientId;
  if (channelStatus && channelStatus != 'All') filter.status = channelStatus;
  if (scanStatus && scanStatus != 'All') filter.scanStatus = scanStatus;

  if (date) {
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);

    const end = new Date(date);
    end.setHours(23, 59, 59, 999);

    filter.dateTime = { $gte: start, $lte: end };
  }

  try {
    const channels = await Channel.find(filter)
      .populate("patient")
      .populate("doctor")
      .sort({ dateTime: 1 });
    res.status(200).json({
      message: "Channel fetched successfully",
      data: channels
    })
  } catch (error) {
    console.log("Error fetching Channels", error);
    res.status(500).json({
      message: "Internal server error",
      error: error
    })
  }
}