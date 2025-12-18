import User from "../models/User.ts";
import bcrypt from "bcrypt";

export async function getAllUsers(req, res) {
  try {
    const { userType } = req.query;
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
      data: users,
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

export async function createUser(req, res) {
  try {
    const { userName, password, name, img, userType, speciality } = req.body;
    const password_ = await bcrypt.hash(password, 10);
    const newUser = new User({
      userName,
      password: password_,
      name,
      img,
      userType,
      speciality
    })
    await newUser.save()
    res.status(201).json({ message: "User Account is created" })
  } catch (error) {
    console.log("Error getting notes", error);
    res.status(500).json({
      message: "Internal server error",
      error: error
    })
  }
}

export async function toggleUserStatus(req, res) {
  try {
    console.log('req.params', req.params.id)
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.isActive = !user.isActive
    user.save();
    res.status(201).json({ message: `User ${user.isActive ? 'activated' : 'deactivated'} successfully` })
  } catch (error) {
    console.log("Error updating user", error);
    res.status(500).json({
      message: "Internal server error",
      error: error
    })
  }
}