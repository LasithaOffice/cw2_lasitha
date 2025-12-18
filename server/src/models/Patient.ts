import mongoose from "mongoose";
import { allGenders } from "../types/Patient.ts";

const patientSchema = new mongoose.Schema({
  patientId: {
    type: Number,
    unique: true
  },
  name: String,
  gender: {
    type: String,
    enum: allGenders,
  },
  address: String,
  tele: String,
  bDay: String,
  img: String,
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

const Patient = mongoose.model("Patient", patientSchema);
export default Patient;