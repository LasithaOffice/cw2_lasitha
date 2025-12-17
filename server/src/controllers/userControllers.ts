import User from "../models/User.ts";
import bcrypt from "bcrypt";

export async function loadUsers(req, res) {
  try {
    const { userType } = req.body;
    let users = undefined;
    if (userType == 'All') {
      users = await User.find()
    } else {
      users = await User.find({ userType })
    }
    if (!users) {
      res.status(400).json({
        message: "Error getting users"
      })
      return;
    }
    res.status(200).json({
      message: "Fetched successfully",
      list: users,
      success: true
    })
  } catch (error) {
    console.log("Error getting notes", error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error
    })
  }
}

export async function enableDisableUser(req, res) {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.isActive = !user.isActive
    res.status(201).json({ message: `User ${user.isActive ? 'activated' : 'deactivated'} successfully` })
  } catch (error) {
    console.log("Error updating user", error);
    res.status(500).json({
      message: "Internal server error",
      error: error
    })
  }
}