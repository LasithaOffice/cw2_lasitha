import mongoose from "mongoose";
import { allGenders } from "../types/Patient.ts";

const specialitySchema = new mongoose.Schema({
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

const Speciality = mongoose.model("Speciality", specialitySchema);
export default Speciality;