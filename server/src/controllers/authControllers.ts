import User from "../models/User.ts";
import bcrypt from "bcrypt";

export async function signin(req, res) {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({
      userName: userName
    });
    if (!user) {
      res.status(401).json({
        message: "User does not exist"
      })
      return;
    }
    const userObj = user.toObject();
    delete userObj.password
    delete userObj._id
    delete userObj.__v
    delete userObj.createdAt
    delete userObj.updatedAt
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      res.status(200).json({
        message: "Fetched successfully",
        user: userObj,
        success: true
      })
    } else {
      res.status(401).json({
        message: "Incorrect password!",
        success: false
      })
    }
  } catch (error) {
    console.log("Error getting notes", error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error
    })
  }
}

export async function createAccount(req, res) {
  try {
    const { userName, password, name, img, userType } = req.body;
    const password_ = await bcrypt.hash(password, 10);
    const newUser = new User({
      userName,
      password: password_,
      name,
      img,
      userType
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