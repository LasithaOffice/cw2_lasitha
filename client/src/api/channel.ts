import { apiInstance } from "../config/https"
import type { CreateChannelRequest, GetAllChannelRequest } from "../interfaces/api/Channel"
import type { CommonResponse } from "../interfaces/api/Common"
import type { Channel } from "../interfaces/Channel"
import type { User } from "../interfaces/User"

export const getLastChannelId = async (): Promise<CommonResponse<string>> => {
  const data = (await apiInstance.get<CommonResponse<string>>("channel/lastId")).data
  return data
}

export const createChannel = async (p: CreateChannelRequest): Promise<CommonResponse<any>> => {
  const data = (await apiInstance.post<CommonResponse<User[]>>("channel", p)).data
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



