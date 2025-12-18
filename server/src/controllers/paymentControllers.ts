import Channel from "../models/Channel.ts";
import Patient from "../models/Patient.ts";
import ScanRequest from "../models/ScanRequest.ts";
import User from "../models/User.ts";

export async function makeChannelPayment(req, res) {
  try {
    console.log('req.params', req.params.id)
    const channel = await Channel.findById(req.params.id);
    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }
    channel.channelStatus = 'Paid'
    channel.save();
    res.status(201).json({ message: "Channel is paid successfully!" })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      error: error
    })
  }
}

export async function makeScanPayment(req, res) {
  try {
    console.log('req.params', req.params.id)
    const sReq = await ScanRequest.findById(req.params.id);
    if (!sReq) {
      return res.status(404).json({ message: "Scan request not found" });
    }
    sReq.isPaid = true;
    sReq.save();
    res.status(200).json({ message: "Scan request is paid successfully!" })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      error: error
    })
  }
}