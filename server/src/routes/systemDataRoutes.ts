import express from 'express'
import { getallDiseases, getallScanTypes, getallSpecialities, registerDisease, registerScanType, registerSpeciality, toggleDiseaseStatus, toggleScanTypeStatus, toggleSpecialityStatus, updateDisease, updateScanType, updateSpeciality } from '../controllers/systemDataControllers.ts';

const systemDataRoute = express.Router();

systemDataRoute.post("/speciality", registerSpeciality)
systemDataRoute.patch("/speciality", updateSpeciality)
systemDataRoute.patch("/speciality/:id", toggleSpecialityStatus)
systemDataRoute.get("/speciality", getallSpecialities)

systemDataRoute.post("/scantype", registerScanType)
systemDataRoute.patch("/scantype", updateScanType)
systemDataRoute.patch("/scantype/:id", toggleScanTypeStatus)
systemDataRoute.get("/scantype", getallScanTypes)

systemDataRoute.post("/disease", registerDisease)
systemDataRoute.patch("/disease", updateDisease)
systemDataRoute.patch("/disease/:id", toggleDiseaseStatus)
systemDataRoute.get("/disease", getallDiseases)

export default systemDataRoute;