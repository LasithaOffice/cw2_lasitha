import express from 'express'
import { getallSpecialities, registerSpeciality, toggleSpecialityStatus, updateSpeciality } from '../controllers/systemDataControllers.ts';

const systemDataRoute = express.Router();

systemDataRoute.post("/speciality", registerSpeciality)
systemDataRoute.patch("/speciality", updateSpeciality)
systemDataRoute.patch("/speciality/:id", toggleSpecialityStatus)
systemDataRoute.get("/speciality", getallSpecialities)

export default systemDataRoute;