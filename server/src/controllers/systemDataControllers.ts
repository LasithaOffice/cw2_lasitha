import Speciality from "../models/Speciality.ts";
import User from "../models/User.ts";
import bcrypt from "bcrypt";

export async function registerSpeciality(req, res) {
  try {
    const { name, price } = req.body;
    const obj = new Speciality({
      name,
      price
    })
    await obj.save();
    res.status(201).json({ message: "Speciality is created" })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "Internal server error",
      error: error
    })
  }
}

export async function getallSpecialities(req, res) {
  try {
    const specialities = await Speciality.find();
    res.status(201).json({
      message: "Speciality is created",
      data: specialities
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "Internal server error",
      error: error
    })
  }
}

export async function updateSpeciality(req, res) {
  try {
    const { name, price, id } = req.body;
    console.log("iddd", id)
    await Speciality.findByIdAndUpdate(id, {
      name,
      price
    })
    res.status(201).json({ message: "Speciality is updated" })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "Internal server error",
      error: error
    })
  }
}

export async function toggleSpecialityStatus(req, res) {
  try {
    const speciality = await Speciality.findById(req.params.id);
    if (!speciality) {
      return res.status(404).json({ message: "Speciality not found" });
    }
    speciality.isActive = !speciality.isActive
    speciality.save();
    res.status(201).json({ message: `Speciality ${speciality.isActive ? 'activated' : 'deactivated'} successfully` })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "Internal server error",
      error: error
    })
  }
}
