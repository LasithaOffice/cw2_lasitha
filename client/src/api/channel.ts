import { apiInstance } from "../config/https"
import type { CreateUserRequest } from "../interfaces/api/user/CreateUser"
import type { CommonResponse } from "../interfaces/api/Common"
import type { GetAllUsersRequest } from "../interfaces/api/user/GetAllUsers"
import type { User } from "../interfaces/User"

export const createUser = async (p: CreateUserRequest): Promise<CommonResponse<any>> => {
  const data = (await apiInstance.post<CommonResponse<any>>("user", p)).data
  return data
}

export const getAllUsers = async (p: GetAllUsersRequest): Promise<CommonResponse<User[]>> => {
  const data = (await apiInstance.get<CommonResponse<User[]>>("user?userType=" + p.userType)).data
  return data
}

export const enableOrDisableUser = async (id: string): Promise<CommonResponse<any>> => {
  const data = (await apiInstance.patch<CommonResponse<any>>("user/" + id + "/status")).data
  return data
}


