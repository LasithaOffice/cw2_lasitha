import Channel from "../models/Channel.ts";
import Patient from "../models/Patient.ts";
import ScanRequest from "../models/ScanRequest.ts";
import User from "../models/User.ts";

export async function createScanRequest(req, res) {
  try {
    const { typeId, diseasId, channelId } = req.body;
    // const count = await Channel.countDocuments();
    const newReq = new ScanRequest({
      type: typeId,
      diseas: diseasId,
      channel: channelId
    })
    await newReq.save()
    res.status(201).json({ message: "Scan request is created" })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      error: error
    })
  }
}

export async function getAllScans(req, res) {
  try {
    const { isPaid, channelId } = req.query;

    const filter: any = {}

    if (isPaid) filter.isPaid = isPaid;
    if (channelId) filter.channel = channelId;

    const requests = await ScanRequest.find(filter)
      .populate('type')
      .populate('diseas')
      .populate({
        path: 'channel',
        populate: [
          { path: "patient" },
          { path: "doctor" }
        ]
      })
    console.log("reqqqq", requests)
    res.status(200).json({
      data: requests,
      message: "Scans fetched"
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      error: error
    })
  }
}

export async function getSingleScanRequest(req, res) {
  try {
    console.log("req.param", req.params)
    const { id } = req.params;
    const request = await ScanRequest.findById(id)
      .populate('type')
      .populate('diseas')
      .populate({
        path: 'channel',
        populate: [
          { path: "patient" },
          { path: "doctor" }
        ]
      })
    console.log("reqqqq sin", request)
    res.status(200).json({
      data: request,
      message: "Scan request fetched"
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      error: error
    })
  }
}


export async function updateScanRequest(req, res) {
  try {
    const { id, imgUrl, isCompleted } = req.body;

    const requests = await ScanRequest.findById(id)
    if (!requests) {
      res.status(401).json({ message: "Scan Request does not exist" })
      return;
    }
    console.log("reqqqq", requests)
    if (imgUrl) {
      requests.scanImages.push(imgUrl)
    }
    if (isCompleted != undefined) {
      requests.isCompleted = true;
    }
    requests.save();
    if (imgUrl) {
      res.status(200).json({
        message: "Scan image is uploaded"
      })
    } else {
      res.status(200).json({
        message: "Scan request is complete"
      })
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      error: error
    })
  }
}