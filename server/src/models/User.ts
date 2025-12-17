import mongoose from "mongoose";
import { type UserType } from "../types/User.ts";
const userTypes_: UserType[] = [
  "admin",
  "doctor",
  "frontDesk",
  "radiologist",
  "accountant",
];
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
    enum: userTypes_,
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