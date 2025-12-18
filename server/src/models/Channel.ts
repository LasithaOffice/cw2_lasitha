import mongoose, { Types } from "mongoose";
import { allGenders } from "../types/Patient.ts";
import { allChannelStatus, allScanStatus } from "../types/Channel.ts";

const channelSchema = new mongoose.Schema({
  channelNo: {
    type: Number,
    unique: true
  },
  patient: {
    type: Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  doctor: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
  dateTime: String,
  status: {
    type: String,
    enum: allChannelStatus,
    required: true,
  },
  scanStatus: {
    type: String,
    enum: allScanStatus,
    required: true,
  },
  scanRequest: {
    type: Types.ObjectId,
    ref: "ScanRequest",
    required: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

const Channel = mongoose.model("Channel", channelSchema);
export default Channel;