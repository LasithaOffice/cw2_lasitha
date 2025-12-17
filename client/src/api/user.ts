import { apiInstance } from "../config/https"
import type { GetAllUsersRequest, GetAllUsersResponse } from "../interfaces/api/user/GetAllUsers"

export const getAllUsers = async (p: GetAllUsersRequest): Promise<GetAllUsersResponse> => {
  const data = (await apiInstance.post<GetAllUsersResponse>("user", p)).data
  return data
}
