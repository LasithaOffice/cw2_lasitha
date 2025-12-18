import mongoose from "mongoose";
import { allGenders } from "../types/Patient.ts";

const diseaseSchema = new mongoose.Schema({
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

const Disease = mongoose.model("Disease", diseaseSchema);
export default Disease;