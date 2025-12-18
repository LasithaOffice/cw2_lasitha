import Disease from "../models/Disease.ts";
import ScanType from "../models/ScanType.ts";
import Speciality from "../models/Speciality.ts";

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
    res.status(200).json({
      message: "Specialities fetched",
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
    res.status(200).json({ message: "Speciality is updated" })
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
    res.status(200).json({ message: `Speciality ${speciality.isActive ? 'activated' : 'deactivated'} successfully` })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "Internal server error",
      error: error
    })
  }
}













export async function registerScanType(req, res) {
  try {
    const { name, price } = req.body;
    const obj = new ScanType({
      name,
      price
    })
    await obj.save();
    res.status(201).json({ message: "Scan Type is created" })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "Internal server error",
      error: error
    })
  }
}

export async function getallScanTypes(req, res) {
  try {
    const scantype = await ScanType.find();
    res.status(200).json({
      message: "Scan Types fetched",
      data: scantype
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "Internal server error",
      error: error
    })
  }
}

export async function updateScanType(req, res) {
  try {
    const { name, price, id } = req.body;
    console.log("iddd", id)
    await ScanType.findByIdAndUpdate(id, {
      name,
      price
    })
    res.status(200).json({ message: "Scan Type is updated" })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "Internal server error",
      error: error
    })
  }
}

export async function toggleScanTypeStatus(req, res) {
  try {
    const scanType = await ScanType.findById(req.params.id);
    if (!scanType) {
      return res.status(404).json({ message: "Scan Type not found" });
    }
    scanType.isActive = !scanType.isActive
    scanType.save();
    res.status(200).json({ message: `Scan Type ${scanType.isActive ? 'activated' : 'deactivated'} successfully` })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "Internal server error",
      error: error
    })
  }
}









export async function registerDisease(req, res) {
  try {
    const { name, price } = req.body;
    const obj = new Disease({
      name,
      price
    })
    await obj.save();
    res.status(201).json({ message: "Disease data is added" })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "Internal server error",
      error: error
    })
  }
}

export async function getallDiseases(req, res) {
  try {
    const all = await Disease.find();
    res.status(200).json({
      message: "Diseases fetched",
      data: all
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "Internal server error",
      error: error
    })
  }
}

export async function updateDisease(req, res) {
  try {
    const { name, price, id } = req.body;
    console.log("iddd", id)
    await Disease.findByIdAndUpdate(id, {
      name,
      price
    })
    res.status(200).json({ message: "Disease is updated" })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "Internal server error",
      error: error
    })
  }
}

export async function toggleDiseaseStatus(req, res) {
  try {
    const obj = await Disease.findById(req.params.id);
    if (!obj) {
      return res.status(404).json({ message: "Disease not found" });
    }
    obj.isActive = !obj.isActive
    obj.save();
    res.status(200).json({ message: `Disease ${obj.isActive ? 'activated' : 'deactivated'} successfully` })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "Internal server error",
      error: error
    })
  }
}

