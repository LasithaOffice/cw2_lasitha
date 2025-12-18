import mongoose, { Types } from "mongoose";
import { allConditions, allGenders } from "../types/Patient.ts";
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
  channelStatus: {
    type: String,
    enum: allChannelStatus,
    default: 'Payment Pending',
    required: true,
  },
  scanStatus: {
    type: String,
    enum: allScanStatus,
    default: 'Not Required',
    required: true,
  },
  scanRequest: {
    type: Types.ObjectId,
    ref: "ScanRequest",
    required: false,
  },
  diagnosis: String,
  prescriptions: String,
  condition: {
    type: String,
    enum: allConditions,
    default: 'Undetermined',
    required: true,
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