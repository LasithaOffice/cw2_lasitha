import { apiInstance } from "../config/https"
import type { GetAllChannelRequest, UpdateChannelRequest } from "../interfaces/api/Channel"
import type { CommonResponse } from "../interfaces/api/Common"
import type { CreateScanRequest, GetAllScanRequest } from "../interfaces/api/ScanRequest"
import type { Channel } from "../interfaces/Channel"
import type { ScanRequest } from "../interfaces/ScanRequest"
import type { User } from "../interfaces/User"

export const getLastChannelId = async (): Promise<CommonResponse<string>> => {
  const data = (await apiInstance.get<CommonResponse<string>>("channel/lastId")).data
  return data
}

export const createScanRequest = async (p: CreateScanRequest): Promise<CommonResponse<any>> => {
  const data = (await apiInstance.post<CommonResponse<User[]>>("scan", p)).data
  return data
}

export const getAllScans = async (p: GetAllScanRequest): Promise<CommonResponse<ScanRequest[]>> => {
  const params = new URLSearchParams();
  Object.entries(p).forEach(d => {
    if (d[1] != undefined && d[1] != null) {
      params.append(d[0], d[1])
    }
  })
  const data = (await apiInstance.get<CommonResponse<ScanRequest[]>>("scan?" + params)).data
  return data
}

export const updateChannel = async (p: UpdateChannelRequest): Promise<CommonResponse<any>> => {
  const data = (await apiInstance.patch<CommonResponse<User[]>>("channel", p)).data
  return data
}



