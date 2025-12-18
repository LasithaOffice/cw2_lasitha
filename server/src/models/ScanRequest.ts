import mongoose, { Types } from "mongoose";

const scanrequestSchema = new mongoose.Schema({
  type: {
    type: Types.ObjectId,
    ref: "ScanType",
    required: true,
  },
  diseas: {
    type: Types.ObjectId,
    ref: "Disease",
    required: true,
  },
  scanImages: {
    type: [String],
  },
  channel: {
    type: Types.ObjectId,
    ref: "Channel",
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false
  },
  isPaid: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

const ScanRequest = mongoose.model("ScanRequest", scanrequestSchema);
export default ScanRequest;