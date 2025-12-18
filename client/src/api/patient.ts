import { apiInstance } from "../config/https"
import type { CommonResponse } from "../interfaces/api/Common"
import type { CreatePatientRequest } from "../interfaces/api/patient/CreatePatient"
import type { GetAllPatientsRequest } from "../interfaces/api/patient/GetAllPatients"
import type { Patient } from "../interfaces/Patient"

export const createPatient = async (p: CreatePatientRequest): Promise<CommonResponse<any>> => {
  const data = (await apiInstance.post<CommonResponse<any>>("patient", p)).data
  return data
}

export const getAllPatients = async (p: GetAllPatientsRequest): Promise<CommonResponse<Patient[]>> => {
  const data = (await apiInstance.get<CommonResponse<Patient[]>>(`patient?searchQuery=${p.searchQuery}`)).data
  return data
}