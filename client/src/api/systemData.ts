import { apiInstance } from "../config/https"
import type { GetAllChannelRequest } from "../interfaces/api/Channel"
import type { CommonResponse } from "../interfaces/api/Common"
import type { RegisterSpecialityRequest } from "../interfaces/api/SystemData"
import type { Channel } from "../interfaces/Channel"
import type { Speciality } from "../interfaces/Speciality"
import type { User } from "../interfaces/User"

export const registerSpeciality = async (p: RegisterSpecialityRequest): Promise<CommonResponse<any>> => {
  const data = (await apiInstance.post<CommonResponse<User[]>>("data/speciality", p)).data
  return data
}

export const getallSpecialities = async (): Promise<CommonResponse<Speciality[]>> => {
  const data = (await apiInstance.get<CommonResponse<Speciality[]>>("data/speciality")).data
  return data
}

export const updateSpeciality = async (p: RegisterSpecialityRequest): Promise<CommonResponse<any>> => {
  const data = (await apiInstance.patch<CommonResponse<User[]>>("data/speciality", p)).data
  return data
}

export const toggleSpecialityStatus = async (id: string): Promise<CommonResponse<any>> => {
  const data = (await apiInstance.patch<CommonResponse<any>>("data/speciality/" + id)).data
  return data
}

export const getAllChannels = async (p: GetAllChannelRequest): Promise<CommonResponse<Channel[]>> => {
  const params = new URLSearchParams();
  Object.entries(p).forEach(d => {
    if (d[1] != undefined && d[1] != null) {
      params.append(d[0], d[1])
    }
  })
  const data = (await apiInstance.get<CommonResponse<Channel[]>>("channel?" + params)).data
  return data
}



