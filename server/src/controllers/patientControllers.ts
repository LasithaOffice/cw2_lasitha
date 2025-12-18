import Patient from "../models/Patient.ts";
import User from "../models/User.ts";

export async function loadPatients(req, res) {
  try {
    const { searchQuery } = req.query;
    let patients = undefined;
    if (searchQuery) {
      patients = await Patient.find({
        name: {
          $regex: searchQuery, $options: "i"
        }
      })
    } else {
      patients = await Patient.find()
    }
    if (!patients) {
      res.status(400).json({
        message: "Error getting patients"
      })
      return;
    }
    res.status(200).json({
      message: "Fetched successfully",
      data: patients,
      success: true
    })
  } catch (error) {
    console.log("Error getting patients", error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error
    })
  }
}

export async function createPatient(req, res) {
  try {
    const { name, gender, address, tele, bDay, img } = req.body;
    const count = await Patient.countDocuments();
    const newPatient = new Patient({
      patientId: (count + 1000000),
      name,
      gender,
      address,
      tele,
      bDay,
      img,
    })
    await newPatient.save()
    res.status(201).json({ message: "Patient is created" })
  } catch (error) {
    console.log("Error creating Patient", error);
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