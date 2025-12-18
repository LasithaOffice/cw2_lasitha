import mongoose from "mongoose";
import { allGenders } from "../types/Patient.ts";

const scantypeSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    require: true
  },
  price: {
    type: Number,
    require: true
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

const ScanType = mongoose.model("ScanType", scantypeSchema);
export default ScanType;