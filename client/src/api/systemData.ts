import { apiInstance } from "../config/https"
import type { CommonResponse } from "../interfaces/api/Common"
import type { RegisterDiseaseRequest, RegisterScanTypeRequest, RegisterSpecialityRequest } from "../interfaces/api/SystemData"
import type { Disease } from "../interfaces/Disease"
import type { ScanType } from "../interfaces/ScanType"
import type { Speciality } from "../interfaces/Speciality"
import type { User } from "../interfaces/User"


export const registerSpeciality = async (p: RegisterSpecialityRequest): Promise<CommonResponse<any>> => {
  const data = (await apiInstance.post<CommonResponse<any>>("data/speciality", p)).data
  return data
}

export const getallSpecialities = async (): Promise<CommonResponse<Speciality[]>> => {
  const data = (await apiInstance.get<CommonResponse<Speciality[]>>("data/speciality")).data
  return data
}

export const updateSpeciality = async (p: RegisterSpecialityRequest): Promise<CommonResponse<any>> => {
  const data = (await apiInstance.patch<CommonResponse<any>>("data/speciality", p)).data
  return data
}

export const toggleSpecialityStatus = async (id: string): Promise<CommonResponse<any>> => {
  const data = (await apiInstance.patch<CommonResponse<any>>("data/speciality/" + id)).data
  return data
}





export const registerScanType = async (p: RegisterScanTypeRequest): Promise<CommonResponse<any>> => {
  const data = (await apiInstance.post<CommonResponse<any>>("data/scantype", p)).data
  return data
}

export const getallScanType = async (): Promise<CommonResponse<ScanType[]>> => {
  const data = (await apiInstance.get<CommonResponse<ScanType[]>>("data/scantype")).data
  return data
}

export const updateScanType = async (p: RegisterScanTypeRequest): Promise<CommonResponse<any>> => {
  const data = (await apiInstance.patch<CommonResponse<any>>("data/scantype", p)).data
  return data
}

export const toggleScanTypeStatus = async (id: string): Promise<CommonResponse<any>> => {
  const data = (await apiInstance.patch<CommonResponse<any>>("data/scantype/" + id)).data
  return data
}





export const registerDisease = async (p: RegisterDiseaseRequest): Promise<CommonResponse<any>> => {
  const data = (await apiInstance.post<CommonResponse<User[]>>("data/disease", p)).data
  return data
}

export const getallDisease = async (): Promise<CommonResponse<Disease[]>> => {
  const data = (await apiInstance.get<CommonResponse<Disease[]>>("data/disease")).data
  return data
}

export const updateDisease = async (p: RegisterDiseaseRequest): Promise<CommonResponse<any>> => {
  const data = (await apiInstance.patch<CommonResponse<User[]>>("data/disease", p)).data
  return data
}

export const toggleDiseaseStatus = async (id: string): Promise<CommonResponse<any>> => {
  const data = (await apiInstance.patch<CommonResponse<any>>("data/disease/" + id)).data
  return data
}


