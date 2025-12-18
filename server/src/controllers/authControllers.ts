import User from "../models/User.ts";
import bcrypt from "bcrypt";

export async function signin(req, res) {
  try {
    const { userName, password } = req.body;
    console.log(userName, password)
    const user = await User.findOne({
      userName: userName
    });
    console.log("user", user)
    if (!user) {
      res.status(401).json({
        message: "User does not exist"
      })
      return;
    }
    if (!user.isActive) {
      res.status(403).json({
        message: "User account is disabled"
      })
      return;
    }
    const userObj = user.toObject();
    delete userObj.password
    delete userObj.__v
    delete userObj.createdAt
    delete userObj.updatedAt
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      res.status(200).json({
        message: "Fetched successfully",
        data: userObj,
        success: true
      })
    } else {
      res.status(401).json({
        message: "Incorrect password!",
        success: false
      })
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error
    })
  }
}