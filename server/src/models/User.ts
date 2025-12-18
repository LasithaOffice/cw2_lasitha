import mongoose from "mongoose";
import { allSpecialities, userTypes } from "../types/User.ts";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  img: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  userType: {
    type: String,
    enum: userTypes,
    required: true
  },
  speciality: {
    type: String,
    enum: allSpecialities,
    default: 'Staff',
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
}, {
  timestamps: true,
});

const User = mongoose.model("User", userSchema);
export default User;